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
/** Warm nucleus inside each node-sphere — the counterpoint to all the cyan. */
const CORAL: RGB = [255, 124, 98];

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
const T_LATTICE = 5.0;
// Long enough that the mid-zoom — nodes resolving into connected
// atom-spheres — is a stage you can read, not a flash.
const T_ZOOM = 7.0;
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

    /* ---------------- performance profile ----------------
       Every cost in this scene is per-node and per-frame, so a phone paying
       desktop prices spends the whole hero-load budget compositing glow
       sprites. `lowPower` is a coarse but reliable proxy: touch devices and
       narrow viewports get a smaller lattice, fewer resolved node-spheres,
       a lower backing-store resolution and half the frame rate. The sequence
       is identical — it is the same animation, rendered cheaper.

       Sampled once at mount and never re-evaluated: a profile that flipped on
       resize would rebuild the scene mid-sequence. The core-count threshold is
       deliberately low — plenty of capable laptops report 4, so only genuinely
       constrained hardware is caught by it. */
    const lowPower =
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth < 768 ||
      (navigator.hardwareConcurrency ?? 8) <= 2;

    const PERF = lowPower
      ? {
          maxDpr: 1.5,
          nodes: { min: 70, max: 110, areaPer: 3400 },
          /** k-nearest neighbours per vertex — drives the link count. */
          K: 4,
          /** Projected radius (px) below which a node stays a cheap glow. */
          resolveAt: 13,
          /** Hard cap on node-spheres per frame — the dominant cost. */
          sphereBudget: 6,
          /** Orbit rings inside a resolved node-sphere, and dots per ring. */
          rings: 2,
          ringDots: (ring: number) => 5 + ring * 3,
          orbitSteps: 40,
          frameInterval: 1000 / 30,
        }
      : {
          maxDpr: 2,
          nodes: { min: 110, max: 230, areaPer: 2100 },
          K: 6,
          resolveAt: 9,
          sphereBudget: 18,
          rings: 3,
          ringDots: (ring: number) => 8 + ring * 6,
          orbitSteps: 72,
          frameInterval: 0,
        };

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    /** False until the deferred start fires, so the IntersectionObserver's
     *  initial callback cannot pull the loop forward past it. */
    let started = false;
    let startHandle = 0;
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

    /**
     * A node rendered close enough to resolve: a cyan shell of orbiting dots
     * around a warm nucleus. This is the mid-zoom stage — the lattice stops
     * being dots and becomes a grid of connected atoms.
     */
    const drawNodeSphere = (
      x: number, y: number, R: number, alpha: number, seed: number, t: number,
    ) => {
      glow(x, y, R * 2.0, CYAN, 0.3 * alpha, 0.85);

      const spin = t * 0.5 + seed;
      for (let ring = 1; ring <= PERF.rings; ring++) {
        const rr = R * (0.42 + ring * 0.19);
        const dots = PERF.ringDots(ring);
        const squash = 0.28 + 0.26 * Math.abs(Math.sin(t * 0.4 + seed + ring));
        for (let i = 0; i < dots; i++) {
          const ang = (i / dots) * Math.PI * 2 + spin * (ring % 2 ? 1 : -1);
          glow(
            x + Math.cos(ang) * rr,
            y + Math.sin(ang) * rr * squash,
            R * 0.06, CYAN, 0.85 * alpha, 0.1,
          );
        }
      }

      ctx.strokeStyle = rgba(CYAN, 0.5 * alpha);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(x, y, R * 0.98, R * 0.34, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Warm nucleus, painted source-over rather than additively: coral on top
      // of the node's own cyan halo sums to white and loses its hue entirely.
      ctx.globalCompositeOperation = 'source-over';
      glow(x, y, R * 0.36, CORAL, 0.55 * alpha, 0.55);
      glow(x, y, R * 0.17, CORAL, 0.95 * alpha, 0.1);
      ctx.globalCompositeOperation = 'lighter';
      glow(x, y, R * 0.06, WHITE, alpha, 0.05);
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

      // Fewer, larger triangles read far better than a fine mesh — the bonds
      // are the point, and at high density they collapse into a haze.
      const { min, max, areaPer } = PERF.nodes;
      const count = Math.round(Math.min(max, Math.max(min, area / areaPer)));
      lattice = fibonacciSphere(count, LATTICE_R);

      // Connect each vertex to its k nearest neighbours — this is what makes
      // the sphere read as a woven lattice rather than a cloud of dots.
      //
      // A distance threshold does NOT work here: a Fibonacci sphere puts a few
      // abnormally close pairs near the poles, and any threshold derived from
      // the global minimum spacing collapses to near-zero and yields no mesh.
      // k-nearest is scale-free and guarantees uniform connectivity.
      //
      // Selected by insertion into a fixed k-slot buffer rather than
      // map/filter/sort: this runs on every resize, and the sorting version
      // allocated n² objects to keep 4–6 of them.
      const K = PERF.K;
      const bestJ = new Int32Array(K);
      const bestD = new Float64Array(K);
      const seen = new Set<number>();
      links = [];
      for (let i = 0; i < lattice.length; i++) {
        const a = lattice[i];
        bestD.fill(Infinity);
        bestJ.fill(-1);
        for (let j = 0; j < lattice.length; j++) {
          if (j === i) continue;
          const b = lattice[j];
          const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
          const d = dx * dx + dy * dy + dz * dz; // squared — ordering is the same
          if (d >= bestD[K - 1]) continue;
          let s = K - 1;
          while (s > 0 && bestD[s - 1] > d) {
            bestD[s] = bestD[s - 1];
            bestJ[s] = bestJ[s - 1];
            s--;
          }
          bestD[s] = d;
          bestJ[s] = j;
        }
        for (let s = 0; s < K; s++) {
          const j = bestJ[s];
          if (j < 0) continue;
          const lo = i < j ? i : j;
          const hi = i < j ? j : i;
          const key = lo * lattice.length + hi;
          if (seen.has(key)) continue;
          seen.add(key);
          links.push([lo, hi]);
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
        { r: 1.25, incl: 0.15, node: 0.0, speed: 1.15, phase: 0.0 },
        { r: 1.6, incl: 1.15, node: 1.1, speed: -0.85, phase: 2.1 },
        { r: 1.95, incl: -0.95, node: 2.4, speed: 0.62, phase: 4.0 },
      ];
    }

    function resize() {
      const rect = host.getBoundingClientRect();
      // Every extra device pixel is paid for by thousands of additively
      // blended sprites per frame, so phones render below their native DPR.
      const dpr = Math.min(window.devicePixelRatio || 1, PERF.maxDpr);
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

    /** Bond alphas are quantised to this many levels so the whole mesh is
     *  drawn in a handful of stroke calls. Buffers live outside `draw` so a
     *  60fps loop is not allocating them every frame. */
    const DEPTH_BUCKETS = 8;
    const bucketPaths: (Path2D | null)[] = new Array(DEPTH_BUCKETS).fill(null);

    /** Candidate node-spheres for the current frame: index + projected size,
     *  kept flat and reused so the budget pass allocates nothing. */
    const candIdx: number[] = [];
    const candSize: number[] = [];

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
        // Push and magnify gently. Spread the lattice too fast and the nodes
        // leave the frame before they are big enough to resolve, leaving only
        // long bonds crossing empty space.
        const push = 1 + focus * 1.7;
        const scale = unit * 1.25 * (1 + focus * 0.9);

        // Recentre on the target vertex as the camera closes on it.
        const place = (v: Vec3): Vec3 => ({
          x: (v.x - tgt.x * focus) * push,
          y: (v.y - tgt.y * focus) * push,
          z: (v.z - tgt.z * focus) * push,
        });

        const pts = rotated.map((v) => perspective(place(v), scale));

        // Bonds carry the structure, so they are drawn as strongly as the
        // vertices — a faint mesh reads as scattered dots, not a lattice.
        //
        // Depth alpha is quantised into a few buckets and each bucket is
        // stroked as one path. Per-link strokeStyle changes meant several
        // hundred draw calls a frame for a gradient the eye cannot resolve
        // that finely anyway.
        ctx.lineWidth = 1.15;
        for (let b = 0; b < DEPTH_BUCKETS; b++) bucketPaths[b] = null;
        for (const [i, j] of links) {
          const a = pts[i], b = pts[j];
          const depth = (a.d + b.d) / 2;
          const alpha = 0.72 * depth * depth * depth * fade;
          if (alpha <= 0.01) continue;
          const bucket = Math.min(DEPTH_BUCKETS - 1, Math.floor(alpha * DEPTH_BUCKETS));
          const path = (bucketPaths[bucket] ??= new Path2D());
          path.moveTo(a.x, a.y);
          path.lineTo(b.x, b.y);
        }
        for (let b = 0; b < DEPTH_BUCKETS; b++) {
          const path = bucketPaths[b];
          if (!path) continue;
          ctx.strokeStyle = rgba(AZURE, (b + 0.5) / DEPTH_BUCKETS);
          ctx.stroke(path);
        }

        // Node sizes track `unit`, not fixed pixels, so the sphere keeps its
        // density and weight at any canvas size. Three layers per vertex so
        // each reads as a small glowing sphere rather than a flat dot.
        const halo = unit * 0.1;
        const shell = unit * 0.045;
        const core = unit * 0.022;

        // Nodes swell as the camera closes, so mid-zoom they are large enough
        // to resolve into structured spheres — the stage between "lattice of
        // dots" and "one atom".
        const grow = 1 + focus * 3.6;
        // Nodes hold their brightness far longer than the bonds: they are the
        // subject of the mid-zoom, so fading them on the bond curve would gut
        // the very stage this transition exists to show.
        const nodeFade = (1 - focus) ** 0.55;

        // A resolved node-sphere costs ~60 sprite composites; a plain node
        // costs three. Mid-zoom every vertex crosses the resolve threshold at
        // once, so an unbudgeted pass asks the GPU for thousands of composites
        // in a single frame — the stall this whole profile exists to avoid.
        // Resolve only the largest few (the ones the eye is actually on) and
        // draw the rest as glows.
        candIdx.length = 0;
        candSize.length = 0;

        for (let i = 0; i < pts.length; i++) {
          const q = pts[i];
          const d3 = q.d * q.d * q.d;
          const isTarget = i === targetIdx;
          // The target outgrows its neighbours so the move lands on one node.
          const k = (isTarget ? 2.2 : 1) * grow;
          const sphereR = shell * k * q.d;

          if (sphereR > PERF.resolveAt && Math.min(1, d3) * nodeFade > 0.02) {
            candIdx.push(i);
            candSize.push(sphereR);
            continue;
          }

          const flick = 0.82 + 0.18 * Math.sin(t * 2.1 + i * 0.6);
          // The target vertex runs hot to telegraph the push-in.
          glow(q.x, q.y, halo * k * q.d, CYAN, (isTarget ? 0.6 : 0.38) * d3 * nodeFade, 0.7);
          glow(q.x, q.y, sphereR, CYAN, (isTarget ? 0.9 : 0.62) * d3 * nodeFade, 0.25);
          glow(q.x, q.y, core * k * q.d, WHITE, d3 * flick * nodeFade, 0.05);
        }

        if (candIdx.length > 0) {
          // Biggest first, so the budget is spent on the nodes nearest camera.
          const order = candIdx
            .map((_, n) => n)
            .sort((m, n) => candSize[n] - candSize[m])
            .slice(0, PERF.sphereBudget);

          for (const n of order) {
            const i = candIdx[n];
            const q = pts[i];
            const d3 = q.d * q.d * q.d;
            drawNodeSphere(q.x, q.y, candSize[n] * 2, Math.min(1, d3) * nodeFade, i * 1.7, t);
          }

          // Everything over budget still has to be somewhere — a plain glow at
          // the resolved size keeps the lattice intact instead of punching
          // holes in it as nodes cross the threshold.
          const overflow = new Set(order);
          for (let n = 0; n < candIdx.length; n++) {
            if (overflow.has(n)) continue;
            const q = pts[candIdx[n]];
            const d3 = Math.min(1, q.d * q.d * q.d);
            glow(q.x, q.y, candSize[n] * 1.6, CYAN, 0.34 * d3 * nodeFade, 0.8);
            glow(q.x, q.y, candSize[n] * 0.62, CYAN, 0.7 * d3 * nodeFade, 0.25);
            glow(q.x, q.y, candSize[n] * 0.2, WHITE, d3 * nodeFade, 0.05);
          }
        }
      }

      /* ================= ATOM ================= */
      if (focus > 0.005) {
        const a = focus * focus;
        // Outermost shell (r 1.95) lands at ~0.72 × 1.95 × unit, inside half
        // the shorter edge (unit is 0.3 × the shorter edge).
        const atomScale = unit * (0.26 + focus * 0.46);
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

          ctx.strokeStyle = rgba(isAccent ? GOLD : AZURE, (isAccent ? 0.34 : 0.26) * a);
          ctx.lineWidth = 1;
          ctx.beginPath();
          const STEPS = PERF.orbitSteps;
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
              glow(q.x, q.y, atomScale * 0.2 * q.d, headColour, 0.42 * a, 0.7);
              glow(q.x, q.y, atomScale * 0.085 * q.d, headColour, 0.95 * a, 0.12);
              glow(q.x, q.y, atomScale * 0.035 * q.d, WHITE, a, 0.05);
            } else {
              glow(q.x, q.y, atomScale * 0.05 * q.d, trailColour, 0.42 * fadeK * a, 0.18);
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
          glow(q.x, q.y, atomScale * 0.24 * q.d, colour, 0.34 * d2 * a, 0.7);
          glow(q.x, q.y, atomScale * 0.11 * q.d, colour, 0.66 * d2 * a, 0.2);
          glow(q.x, q.y, atomScale * 0.045 * q.d, WHITE, 0.95 * d2 * a, 0.05);
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    }

    const now = () => (performance.now() - startedAt) / 1000;

    let lastFrame = 0;

    function loop(ts: number) {
      if (reduce || !visible) {
        raf = 0;
        return;
      }
      // Re-arm first so a slow frame does not break the chain.
      raf = requestAnimationFrame(loop);
      // Phones run at half rate. The sequence is timed off the clock, not the
      // frame count, so it plays at exactly the same speed — there is just
      // half as much of it, which is invisible on a decorative panel and
      // halves the work competing with scrolling and hydration.
      if (ts - lastFrame < PERF.frameInterval) return;
      lastFrame = ts;
      draw(now());
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
        if (visible && started && !reduce && !raf) raf = requestAnimationFrame(loop);
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

    // Hold the loop back until the main thread has finished the work the user
    // is actually waiting on — hydration, fonts, the header. A decorative
    // panel competing with hydration is what made the hero feel slow to load
    // on a phone; one static frame covers the gap.
    const useIdle = typeof window.requestIdleCallback === 'function';
    const start = () => {
      startHandle = 0;
      started = true;
      if (!reduce && visible && !raf) raf = requestAnimationFrame(loop);
    };
    startHandle = useIdle
      ? window.requestIdleCallback(start, { timeout: 1200 })
      : window.setTimeout(start, lowPower ? 600 : 200);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (startHandle) {
        if (useIdle) window.cancelIdleCallback(startHandle);
        else clearTimeout(startHandle);
      }
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
            'radial-gradient(ellipse 95% 95% at 50% 50%, #000 72%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 95% 95% at 50% 50%, #000 72%, transparent 100%)',
        }}
      />
      <span className="sr-only">
        Abstract holographic sequence: a woven sphere of luminous nodes that resolves into a
        single node, which opens to reveal an atomic structure of orbiting particles.
      </span>
    </div>
  );
}
