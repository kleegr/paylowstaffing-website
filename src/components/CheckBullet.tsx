import { Check } from 'lucide-react';

export default function CheckBullet({
  light = false,
  children,
}: {
  light?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-0.5 shrink-0 inline-flex w-5 h-5 items-center justify-center text-brand-600"
      >
        <Check className="w-4 h-4" strokeWidth={3} />
      </span>
      <span className={light ? 'text-white/90' : 'text-slate-700'}>{children}</span>
    </li>
  );
}
