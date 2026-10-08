import { ORG } from '@/lib/site';

const SUBJECT = 'Website enquiry';
const BODY = [
  'A bit about your organisation:',
  '',
  '',
  'What you are trying to do:',
  '',
  '',
  'Timeline and any hard constraints:',
  '',
  '',
  'What success looks like:',
  '',
].join('\n');

const subject = encodeURIComponent(SUBJECT);
const body = encodeURIComponent(BODY);
const to = encodeURIComponent(ORG.email);

/** Pre-filled draft in the visitor's default mail app. */
export const CONTACT_MAILTO = `mailto:${ORG.email}?subject=${subject}&body=${body}`;

/**
 * Webmail compose links with the same draft. A page cannot detect which mail
 * apps or accounts a visitor has, so these are explicit alternatives rather
 * than a guessed fallback.
 */
export const OUTLOOK_COMPOSE = `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}&body=${body}`;
export const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
