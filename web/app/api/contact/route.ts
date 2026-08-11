import { NextResponse } from 'next/server';

import { ORG } from '@/lib/site';

/**
 * Contact form handler.
 *
 * Deliberately fails loudly when unconfigured. A form that accepts a message,
 * shows a success tick and drops it on the floor is worse than no form at all —
 * the sender believes they have reached you. Until RESEND_API_KEY and
 * CONTACT_TO_EMAIL are set, this returns 503 and the UI tells the user to email
 * directly.
 *
 * To enable: add both env vars in Vercel → Settings → Environment Variables.
 * Swap the fetch below if you use a different provider or a CRM webhook.
 */

const MAX = { name: 120, email: 200, company: 160, message: 5000 } as const;

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  /** Honeypot — real users never fill this; bots do. */
  website?: unknown;
};

function asString(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  // Silently accept honeypot hits so bots do not learn they were caught.
  if (asString(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name, MAX.name);
  const email = asString(body.email, MAX.email);
  const company = asString(body.company, MAX.company);
  const message = asString(body.message, MAX.message);

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = 'Please tell us your name.';
  if (!email) fieldErrors.email = 'Please give us an email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fieldErrors.email = 'That email address does not look right.';
  if (!message) fieldErrors.message = 'Please tell us what you need.';
  else if (message.length < 20)
    fieldErrors.message = 'A little more detail will help us route this properly.';

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: 'Please check the form.', fieldErrors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error(
      '[contact] Not configured — set RESEND_API_KEY and CONTACT_TO_EMAIL. Message NOT delivered.',
    );
    return NextResponse.json(
      {
        error: 'unconfigured',
        message: `Our contact form is not connected yet. Please email us directly at ${ORG.email}.`,
      },
      { status: 503 },
    );
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? `${ORG.shortName} <onboarding@resend.dev>`,
      to: [to],
      reply_to: email,
      subject: `Website enquiry — ${name}${company ? ` (${company})` : ''}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Company: ${company || '—'}`,
        '',
        message,
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    console.error('[contact] Provider rejected the send:', response.status, await response.text());
    return NextResponse.json(
      { error: 'send_failed', message: `We could not send that. Please email ${ORG.email}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
