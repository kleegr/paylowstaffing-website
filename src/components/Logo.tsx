import Link from 'next/link';

export default function Logo({
  variant = 'light',
  size = 'md',
  className = '',
}: {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const heights = { sm: 28, md: 36, lg: 44 };
  const src = variant === 'dark' ? '/logo-dark.svg' : '/logo.svg';
  return (
    <Link href="/" aria-label="PayLow Staffing — Home" className={`inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="PayLow Staffing"
        height={heights[size]}
        style={{ height: heights[size], width: 'auto', display: 'block' }}
        decoding="async"
      />
    </Link>
  );
}
