'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useState } from 'react';

import { EASE_OUT_EXPO, springSoft } from '@/lib/motion';
import { cn } from '@/lib/utils';

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;
type Status = 'idle' | 'submitting' | 'sent' | 'error';

const FIELD =
  'w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-navy-900 placeholder:text-navy-400 ' +
  'transition-colors duration-300 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-400/30';

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setFieldErrors({});
    setFormError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        setStatus('sent');
        return;
      }

      setStatus('error');
      setFieldErrors(result.fieldErrors ?? {});
      setFormError(
        result.message ??
          (result.fieldErrors
            ? 'Please check the highlighted fields.'
            : `Something went wrong. Please email ${fallbackEmail}.`),
      );
    } catch {
      setStatus('error');
      setFormError(`We could not reach the server. Please email ${fallbackEmail}.`);
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="rounded-3xl border border-canvas-line bg-white p-10 text-center shadow-card"
        role="status"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-electric-50">
          <CheckCircle2 className="h-7 w-7 text-electric-600" strokeWidth={1.75} />
        </span>
        <h2 className="mt-6 font-display text-display-sm text-navy-950">Message received</h2>
        <p className="mt-3 text-body-lg text-navy-600 text-pretty">
          Thank you — an engineer will read this and reply within one business day. If it is urgent,
          email us directly at{' '}
          <a className="font-medium text-electric-700 underline" href={`mailto:${fallbackEmail}`}>
            {fallbackEmail}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-canvas-line bg-white p-7 shadow-card sm:p-9"
    >
      {/* Honeypot — hidden from users, irresistible to bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          autoComplete="name"
          placeholder="Priya Sharma"
          error={fieldErrors.name}
          required
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          error={fieldErrors.email}
          required
        />
      </div>

      <div className="mt-5">
        <Field
          label="Company"
          name="company"
          autoComplete="organization"
          placeholder="Optional"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="block text-sm font-medium text-navy-900">
          What do you need? <span className="text-electric-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          placeholder="Tell us about the system, the timeline, and what success looks like."
          className={cn(
            FIELD,
            'mt-2 resize-y',
            fieldErrors.message ? 'border-red-400' : 'border-canvas-line',
          )}
        />
        {fieldErrors.message && (
          <p id="message-error" className="mt-2 text-xs text-red-600">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <AnimatePresence>
        {formError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={springSoft}
            className="overflow-hidden"
          >
            <p
              role="alert"
              className="mt-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
              {formError}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={springSoft}
        className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full
                   bg-navy-950 px-8 text-[0.9375rem] font-medium text-white shadow-card
                   transition-colors duration-300 hover:bg-navy-900 disabled:cursor-not-allowed
                   disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="h-4 w-4" strokeWidth={2} />
          </>
        )}
      </motion.button>

      <p className="mt-4 text-center text-xs text-navy-500">
        We reply within one business day. No sales sequence, no newsletter.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  required,
  ...props
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-navy-900">
        {label} {required && <span className="text-electric-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(FIELD, 'mt-2', error ? 'border-red-400' : 'border-canvas-line')}
        {...props}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
