/**
 * App Router `template.tsx` remounts on every navigation, which is exactly what
 * a page transition needs. Keep it cheap: a short CSS fade-and-lift on
 * opacity/transform only. No `filter: blur()` — filtering the whole page
 * forces it onto one giant layer that is re-rasterised each frame, which is
 * what made switching pages stutter. Server component, so no JS is shipped
 * for it and the animation starts at first paint rather than after hydration.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in motion-reduce:animate-none">{children}</div>;
}
