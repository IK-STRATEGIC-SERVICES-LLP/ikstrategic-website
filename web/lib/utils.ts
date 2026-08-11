type ClassValue = string | number | null | false | undefined;

/** Minimal class joiner — no dependency needed for a project this size. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * True for anything the Next router should not handle: `mailto:`, `tel:`, and
 * links to another origin.
 *
 * This is not an optimisation, it is a correctness fix. `next/link` calls
 * `preventDefault()` on the click before deciding it cannot route the URL, so
 * a `mailto:` wrapped in <Link> silently does nothing — the mail client never
 * opens and no navigation happens either. Such hrefs must be plain <a>.
 *
 * Internal links are the ones starting with `/` or `#`; everything else with
 * a URL scheme is external.
 */
export function isExternalHref(href: string): boolean {
  if (href.startsWith('/') || href.startsWith('#')) return false;
  // Any `scheme:` prefix — mailto, tel, http, https.
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href);
}
