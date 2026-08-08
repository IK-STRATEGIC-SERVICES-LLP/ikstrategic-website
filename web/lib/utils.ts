type ClassValue = string | number | null | false | undefined;

/** Minimal class joiner — no dependency needed for a project this size. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
