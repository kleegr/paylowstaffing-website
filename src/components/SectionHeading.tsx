import { ReactNode } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`} data-reveal>
      {eyebrow && (
        <p className="mb-5">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> {eyebrow}
          </span>
        </p>
      )}
      <h2 className="display-2">{title}</h2>
      {lead && <p className={`lead mt-5 ${center ? 'mx-auto' : ''}`}>{lead}</p>}
    </div>
  );
}
