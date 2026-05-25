import { Check } from 'lucide-react';
import { ReactNode } from 'react';

export default function CheckBullet({ children, tone = 'orange' }: { children: ReactNode; tone?: 'orange' | 'dark' }) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={`inline-flex w-5 h-5 items-center justify-center rounded-full ${
          tone === 'orange' ? 'bg-brand-500 text-white' : 'bg-ink-900 text-white'
        }`}
        aria-hidden="true"
      >
        <Check className="w-3 h-3" strokeWidth={3} />
      </span>
      <span className="text-ink-700">{children}</span>
    </li>
  );
}
