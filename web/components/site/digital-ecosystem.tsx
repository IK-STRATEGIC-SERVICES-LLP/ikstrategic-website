'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * Holographic sequence: lattice sphere → single node → atomic structure.
 *
 * One continuous idea — the network resolving down to its fundamental unit:
 *
 *   1. LATTICE  a dense geodesic sphere of glowing nodes and links, rotating
 *   2. ZOOM     the camera pushes slowly into one vertex; the lattice sweeps
 *               past and fades, that vertex recentring as it grows
 *   3. ATOM     the node opens into a nucleus of protons and neutrons with
 *               electrons orbiting on inclined shells
 *   4. PULL     back out to the lattice, and loop
 *
 * Purely abstract: no figures, products or real-world objects, and nothing
 * drifts through the scene except the structures themselves.
 *
 * Transparent canvas with additive blending, so it floats in the hero rather
 * than sitting in a framed card.
 *
 * Why canvas and not Three.js: three costs ~600KB gzipped for a decorative
 * panel. A hand-rolled projector gives real perspective, depth cueing and
 * bloom for a few KB and protects the hero's performance budget.
 */

/* ------------------------------------------------------------------ */
/* Palette                                                             */
/* ------------------------------------------------------------------ */

type RGB = readonly [number, number, number];

const CYAN: RGB = [56, 211, 245];
const AZURE: RGB = [64, 156, 255];
const INDIGO: RGB = [129, 140, 248];
const WHITE: RGB = [232, 246, 255];
const GOLD: RGB = [247, 196, 104];

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

type Vec3 = { x: number; y: number; z: number };

function rotY(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x * c - p.z * s, y: p.y, z: p.x * s + p.z * c };
}

function rotX(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}

/** Evenly distributed points on a sphere — the lattice vertices. */
function fibonacciSphere(count: number, radius: number): Vec3[] {
  const pts: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    pts.push({ x: Math.cos(theta) * r * radius, y: y * radius, z: Math.sin(theta) * r * radius });
  }
  return pts;
}

const smooth = (k: number) => {
  const x = Math.max(0, Math.min(1, k));
  return x * x * (3 - 2 * x);
};

/* ---- Sequence timing (seconds) ---- */
const T_LATTICE = 6.0;
const T_ZOOM = 5.0; // slow push-in
const T_ATOM = 8.0;
const T_PULL = 3.5;
const CYCLE = T_LATTICE + T_ZOOM + T_ATOM + T_PULL;

const LATTICE_R = 1.0;

export function DigitalEcosystem({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const hostEl = hostRef.current;
    if (!canvasEl || !hostEl) return;

    const context = canvasEl.getContext('2d', { alpha: true });
    if (!context) return;

    // Re-bind non-null: `draw`/`resize` are hoisted, so TS cannot carry the
    // narrowing from the guards above into their bodies.
    const canvas: HTMLCanvasElement = canvasEl;
    const host: HTMLDivElement = hostEl;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    const startedAt = performance.now();

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    /* ---------------- tinted glow sprites ----------------
       drawImage ignores fillStyle, so the tint must be baked in — one white
       sprite would flatten the palette under additive blending. */
    const SPRITE = 96;
    const spriteCache = new Map<string, HTMLCanvasElement>();

    const spriteFor = (c: RGB, softness: number) => {
      const key = `${c.join(',')}|${softness}`;
      const hit = spriteCache.get(key);
      if (hit) return hit;
      const s = document.createElement('canvas');
      s.width = s.height = SPRITE;
      const sc = s.getContext('2d');
      if (sc) {
        const g = sc.createRadialGradient(
          SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2,
        );
        g.addColorStop(0, rgba(c, 1));
        g.addColorStop(0.08 + softness * 0.34, rgba(c, 0.55 - softness * 0.3));
        g.addColorStop(0.42 + softness * 0.3, rgba(c, 0.13));
        g.addColorStop(1, rgba(c, 0));
        sc.fillStyle = g;
        sc.fillRect(0, 0, SPRITE, SPRITE);
      }
      spriteCache.set(key, s);
      return s;
    };

    const glow = (x: number, y: number, r: number, c: RGB, a: number, soft = 0) => {
      if (a <= 0.004 || r <= 0.15) return;
      ctx.globalAlpha = Math.min(1, a);
      ctx.drawImage(spriteFor(c, Math.round(soft * 4) / 4), x - r, y - r, r * 2, r * 2);
      ctx.globalAlpha = 1;
    };

    /* ---------------- scene ---------------- */

    let lattice: Vec3[] = [];
    let links: [number, number][] = [];

    type Nucleon = { base: Vec3; phase: number; proton: boolean };
    let nucleons: Nucleon[] = [];

    type Shell = { r: number; incl: number; node: number; speed: number; phase: number };
    let shells: Shell[] = [];

    function buildScene() {
      const area = width * height;

      // Dense enough to read as a woven shell, sparse enough to stay crisp.
      const count = Math.round(Math.min(320, Math.max(150, area / 1400)));
      lattice = fibonacciSphere(count, LATTICE_R);

      // Connect each vertex to its immediate neighbours — the woven mesh.
      // Derive the threshold from the *actual* minimum spacing rather than a
      // closed-form guess: an estimate below true spacing yields no mesh at all.
      links = [];
      let minSpacing = Infinity;
      for (let i = 0; i < lattice.length; i++) {
        for (let j = i + 1; j < lattice.length; j++) {
          const a = lattice[i], b = lattice[j];
          const dd = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
          if (dd < minSpacing) minSpacing = dd;
        }
      }
      const threshold = minSpacing * 1.45;
      for (let i = 0; i < lattice.length; i++) {
        for (let j = i + 1; j < lattice.length; j++) {
          const a = lattice[i], b = lattice[j];
          if (Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < threshold) links.push([i, j]);
        }
      }

      nucleons = Array.from({ length: 15 }, (_, i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 0.42 * Math.cbrt(Math.random());
        return {
          base: {
            x: r * Math.sin(phi) * Math.cos(theta),
            y: r * Math.sin(phi) * Math.sin(theta),
            z: r * Math.cos(phi),
          },
          phase: rand(0, Math.PI * 2),
          proton: i % 2 === 0,
        };
      });

      shells = [
        { r: 1.35, incl: 0.15, node: 0.0, speed: 1.15, phase: 0.0 },
        { r: 1.75, incl: 1.15, node: 1.1, speed: -0.85, phase: 2.1 },
        { r: 2.15, incl: -0.95, node: 2.4, speed: 0.62, phase: 4.0 },
      ];
    }

    function resize() {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildScene();
    }

    /* ---------------- render ---------------- */

    /** Orientation of the lattice at a given time — also used to pick the
     *  zoom target ahead of time, so the choice is stable across the move. */
    const latticeSpin = (t: number) => ({ y: t * 0.17, x: Math.sin(t * 0.09) * 0.26 });

    function draw(t: number) {
      const cx = width / 2;
      const cy = height / 2;
      const unit = Math.min(width, height) * 0.3;
      const fov = 7.5;

      const perspective = (p: Vec3, scale: number) => {
        const d = fov / (fov + p.z);
        return { x: cx + p.x * d * scale, y: cy + p.y * d * scale, d };
      };

      /* ---- phase ---- */
      const p = t % CYCLE;
      let focus: number; // 0 = lattice, 1 = atom
      if (p < T_LATTICE) focus = 0;
      else if (p < T_LATTICE + T_ZOOM) focus = smooth((p - T_LATTICE) / T_ZOOM);
      else if (p < T_LATTICE + T_ZOOM + T_ATOM) focus = 1;
      else focus = 1 - smooth((p - T_LATTICE - T_ZOOM - T_ATOM) / T_PULL);

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      /* ================= LATTICE ================= */
      if (focus < 0.995) {
        const fade = (1 - focus) ** 1.4;
        const spin = latticeSpin(t);
        const rotated = lattice.map((v) => rotX(rotY(v, spin.y), spin.x));

        // Lock the zoom target to whichever vertex faces the camera when the
        // push-in begins, so the move always starts on a visible node.
        const cycleStart = Math.floor(t / CYCLE) * CYCLE + T_LATTICE;
        const lockSpin = latticeSpin(cycleStart);
        let targetIdx = 0;
        let nearest = -Infinity;
        for (let i = 0; i < lattice.length; i++) {
          const r = rotX(rotY(lattice[i], lockSpin.y), lockSpin.x);
          if (-r.z > nearest) { nearest = -r.z; targetIdx = i; }
        }

        const tgt = rotated[targetIdx];
        const push = 1 + focus * 3.4;                    // dolly in
        const scale = unit * 1.25 * (1 + focus * 0.9);   // and magnify

        // Recentre on the target vertex as the camera closes on it.
        const place = (v: Vec3): Vec3 => ({
          x: (v.x - tgt.x * focus) * push,
          y: (v.y - tgt.y * focus) * push,
          z: (v.z - tgt.z * focus) * push,
        });

        const pts = rotated.map((v) => perspective(place(v), scale));

        ctx.lineWidth = 1;
        for (const [i, j] of links) {
          const a = pts[i], b = pts[j];
          const depth = (a.d + b.d) / 2;
          ctx.strokeStyle = rgba(AZURE, 0.34 * depth * depth * depth * fade);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // Node sizes track `unit`, not fixed pixels, so the sphere keeps its
        // density and weight at any canvas size.
        const halo = unit * 0.05;
        const core = unit * 0.021;

        for (let i = 0; i < pts.length; i++) {
          const q = pts[i];
          const d3 = q.d * q.d * q.d;
          const isTarget = i === targetIdx;
          const flick = 0.78 + 0.22 * Math.sin(t * 2.1 + i * 0.6);
          // The target vertex runs hot to telegraph the push-in.
          glow(q.x, q.y, halo * (isTarget ? 1.9 : 1) * q.d, CYAN,
            (isTarget ? 0.5 : 0.26) * d3 * fade, 0.5);
          glow(q.x, q.y, core * (isTarget ? 1.6 : 1) * q.d, WHITE,
            (isTarget ? 1 : 0.8) * d3 * flick * fade, 0.08);
        }
      }

      /* ================= ATOM ================= */
      if (focus > 0.005) {
        const a = focus * focus;
        // Outermost shell (r 2.15) stays inside half the shorter edge.
        const atomScale = unit * (0.22 + focus * 0.4);
        const spinY = t * 0.34;
        const spinX = Math.sin(t * 0.22) * 0.4;

        shells.forEach((s, si) => {
          // The outermost electron is the gold accent. Additive blending over
          // the cyan nucleus washes warm tones out, so gold only survives out
          // here in the dark — a gold stroke across the core would read cyan.
          const isAccent = si === shells.length - 1;
          const headColour = isAccent ? GOLD : WHITE;
          const trailColour = isAccent ? GOLD : CYAN;

          const ringPt = (ang: number): Vec3 => {
            const base = { x: Math.cos(ang) * s.r, y: 0, z: Math.sin(ang) * s.r };
            return rotX(rotY(rotX(base, s.incl), s.node), spinX * 0.5);
          };

          ctx.strokeStyle = rgba(isAccent ? GOLD : AZURE, (isAccent ? 0.2 : 0.16) * a);
          ctx.lineWidth = 1;
          ctx.beginPath();
          const STEPS = 72;
          for (let i = 0; i <= STEPS; i++) {
            const q = perspective(rotY(ringPt((i / STEPS) * Math.PI * 2), spinY), atomScale);
            i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y);
          }
          ctx.stroke();

          const ang = t * s.speed + s.phase;
          for (let k = 8; k >= 0; k--) {
            const q = perspective(rotY(ringPt(ang - k * 0.05), spinY), atomScale);
            const fadeK = (1 - k / 9) ** 2;
            // Sizes track atomScale, not fixed pixels, so proportions hold
            // at any canvas size.
            if (k === 0) {
              glow(q.x, q.y, atomScale * 0.14 * q.d, headColour, 0.35 * a, 0.6);
              glow(q.x, q.y, atomScale * 0.058 * q.d, headColour, 0.9 * a, 0.1);
              glow(q.x, q.y, atomScale * 0.023 * q.d, WHITE, 0.95 * a, 0.05);
            } else {
              glow(q.x, q.y, atomScale * 0.036 * q.d, trailColour, 0.34 * fadeK * a, 0.15);
            }
          }
        });

        // Binding glow so the cluster reads as one body.
        glow(cx, cy, atomScale * 0.72, CYAN, 0.16 * a, 0.85);

        for (const n of nucleons) {
          const w = 0.055;
          const local = {
            x: n.base.x + Math.sin(t * 1.7 + n.phase) * w,
            y: n.base.y + Math.cos(t * 1.5 + n.phase * 1.3) * w,
            z: n.base.z + Math.sin(t * 1.9 + n.phase * 0.7) * w,
          };
          const q = perspective(rotX(rotY(local, spinY * 1.35), spinX), atomScale);
          const d2 = q.d * q.d;
          const colour = n.proton ? CYAN : INDIGO;
          glow(q.x, q.y, atomScale * 0.16 * q.d, colour, 0.3 * d2 * a, 0.55);
          glow(q.x, q.y, atomScale * 0.07 * q.d, colour, 0.55 * d2 * a, 0.15);
          glow(q.x, q.y, atomScale * 0.028 * q.d, WHITE, 0.85 * d2 * a, 0.05);
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    }

    const now = () => (performance.now() - startedAt) / 1000;

    function loop() {
      draw(now());
      raf = !reduce && visible ? requestAnimationFrame(loop) : 0;
    }

    /* ---------------- lifecycle ---------------- */

    const ro = new ResizeObserver(() => {
      resize();
      // Resizing clears the backing store, so always repaint.
      draw(reduce ? 0 : now());
    });
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduce && !raf) raf = requestAnimationFrame(loop);
        else if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    io.observe(host);

    resize();
    // Paint immediately — rAF is throttled in background tabs, so the first
    // tick can be a frame away and the canvas must never be blank. Reduced
    // motion rests on the lattice, the opening shot.
    draw(0);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={hostRef} className={cn('relative', className)}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="block h-full w-full"
        // Feathered edges so the visual dissolves into the hero instead of
        // ending on a hard rectangle.
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, #000 55%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, #000 55%, transparent 100%)',
        }}
      />
      <span className="sr-only">
        Abstract holographic sequence: a woven sphere of luminous nodes that resolves into a
        single node, which opens to reveal an atomic structure of orbiting particles.
      </span>
    </div>
  );
}
