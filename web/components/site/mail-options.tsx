import { GMAIL_COMPOSE, OUTLOOK_COMPOSE } from '@/lib/mail';
import { cn } from '@/lib/utils';

const OPTIONS = [
  { label: 'Outlook', href: OUTLOOK_COMPOSE },
  { label: 'Gmail', href: GMAIL_COMPOSE },
];

/** "Compose in your browser" alternatives to the default mailto button. */
export function MailOptions({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className={cn('text-xs', dark ? 'text-navy-300' : 'text-navy-500')}>
        Or compose in your browser:
      </span>
      {OPTIONS.map((option) => (
        <a
          key={option.label}
          href={option.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex h-10 items-center rounded-full border px-5 text-sm font-medium transition-colors duration-300',
            dark
              ? 'border-white/20 text-white hover:border-electric-400 hover:text-electric-300'
              : 'border-canvas-line text-navy-900 hover:border-electric-400 hover:text-electric-700',
          )}
        >
          {option.label}
        </a>
      ))}
    </div>
  );
}
