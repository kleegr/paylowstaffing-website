import clsx from 'clsx';

type Props = {
  eyebrowLeft?: string;
  eyebrowPill?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrowLeft, eyebrowPill, eyebrow, title, lead,
  align = 'center', light = false, className,
}: Props) {
  return (
    <div
      className={clsx(
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl',
        className
      )}
    >
      {(eyebrow || eyebrowLeft || eyebrowPill) && (
        <div className={clsx('eyebrow-row', align === 'center' && 'justify-center')}>
          {eyebrowLeft && (
            <span className={clsx('font-display font-semibold text-sm', light ? 'text-white' : 'text-ink-900')}>
              {eyebrowLeft}
            </span>
          )}
          {(eyebrow || eyebrowPill) && <span className="pill">{eyebrow ?? eyebrowPill}</span>}
        </div>
      )}
      <h2 className={light ? 'h-display-light text-balance' : 'h-display text-balance'}>{title}</h2>
      {lead && (
        <p className={clsx('mt-5 text-base md:text-lg leading-relaxed', light ? 'text-white/80' : 'text-slate-600')}>
          {lead}
        </p>
      )}
    </div>
  );
}
