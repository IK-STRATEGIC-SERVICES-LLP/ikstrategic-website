'use client';

import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ik-analytics-consent';
/** Dispatched by the footer's "Cookie settings" link to reopen the banner. */
export const OPEN_CONSENT_EVENT = 'ik:open-consent';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type Choice = 'granted' | 'denied';
/** `opt-in`: nothing loads until accepted. `notice`: loads by default, can opt out. */
type Mode = 'opt-in' | 'notice';

/** Decide the consent model for this visitor. Strict unless the server says otherwise. */
async function fetchMode(): Promise<Mode> {
  try {
    const res = await fetch('/api/region', { cache: 'no-store' });
    if (!res.ok) return 'opt-in';
    const data = (await res.json()) as { mode?: string };
    return data.mode === 'notice' ? 'notice' : 'opt-in';
  } catch {
    return 'opt-in';
  }
}

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

function writeChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* storage blocked: the choice simply won't persist */
  }
}

/** Clear Google's first-party cookies so withdrawing consent actually removes them. */
function clearGaCookies() {
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_') || name === '_gid')
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
      });
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
}

/**
 * Google Analytics with region-aware consent.
 *
 * - Europe, UK and US visitors (and anyone we cannot locate): strict opt-in.
 *   Nothing from Google is requested, and the gtag script is not in the DOM,
 *   until they press Accept.
 * - Elsewhere (e.g. India): analytics runs by default behind a small notice
 *   with a one-click opt-out.
 *
 * A saved choice always wins over the regional default. Renders nothing when no
 * measurement ID is configured, so the site stays tracker-free.
 */
export function AnalyticsConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [mode, setMode] = useState<Mode>('opt-in');
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    let cancelled = false;

    const saved = readChoice();
    if (saved) {
      setChoice(saved);
    } else {
      fetchMode().then((m) => {
        if (cancelled) return;
        setMode(m);
        // Lighter regions: on by default until the visitor says otherwise.
        if (m === 'notice') setChoice('granted');
        setShowBanner(true);
      });
    }

    const reopen = () => setShowBanner(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => {
      cancelled = true;
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
    };
  }, []);

  const decide = useCallback((next: Choice) => {
    writeChoice(next);
    setChoice(next);
    setShowBanner(false);
    if (next === 'denied') {
      clearGaCookies();
      // Stops any already-loaded gtag from sending further hits this session.
      if (GA_ID) (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
    }
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      {choice === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
window['ga-disable-${GA_ID}']=false;
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {showBanner && mode === 'opt-in' && (
        <div
          role="dialog"
          aria-label="Analytics cookies"
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-3xl rounded-2xl border
                     border-white/10 bg-navy-950 p-5 text-white shadow-2xl sm:bottom-6 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <p className="text-sm leading-relaxed text-navy-200">
              We&apos;d like to use Google Analytics cookies to understand how the site is used. They
              stay off unless you accept, and you can change your mind any time from{' '}
              <span className="text-white">Cookie settings</span> in the footer.{' '}
              <a href="/cookies" className="underline underline-offset-2 hover:text-electric-300">
                Learn more
              </a>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => decide('denied')}
                className="h-11 rounded-full border border-white/25 px-5 text-sm font-medium
                           text-white transition-colors hover:bg-white/10"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => decide('granted')}
                className="h-11 rounded-full bg-white px-5 text-sm font-medium text-navy-950
                           transition-colors hover:bg-electric-100"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {showBanner && mode === 'notice' && (
        <div
          role="region"
          aria-label="Analytics notice"
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl rounded-2xl border
                     border-white/10 bg-navy-950 p-4 text-white shadow-2xl sm:bottom-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-xs leading-relaxed text-navy-200">
              We use Google Analytics to understand how this site is used.{' '}
              <a href="/cookies" className="underline underline-offset-2 hover:text-electric-300">
                Details
              </a>
              . You can opt out at any time.
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => decide('denied')}
                className="h-9 rounded-full border border-white/25 px-4 text-xs font-medium
                           text-white transition-colors hover:bg-white/10"
              >
                Opt out
              </button>
              <button
                type="button"
                onClick={() => decide('granted')}
                className="h-9 rounded-full bg-white px-4 text-xs font-medium text-navy-950
                           transition-colors hover:bg-electric-100"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Footer link that reopens the banner. Hidden when analytics is not configured. */
export function CookieSettingsButton({ className }: { className?: string }) {
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      Cookie settings
    </button>
  );
}
