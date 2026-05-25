import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/lib/content';

export default function Logo({
  variant = 'light',
  size = 'md',
  className = '',
}: {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const heights = { sm: 36, md: 44, lg: 56 };
  const widths = { sm: 110, md: 140, lg: 180 };
  return (
    <Link href="/" aria-label="PayLow — Home" className={`inline-flex items-center ${className}`}>
      <Image
        src={assets.logoGlow}
        alt="PayLow Staffing"
        width={widths[size]}
        height={heights[size]}
        priority
        unoptimized
        className={`h-auto w-auto ${variant === 'dark' ? 'brightness-0' : ''}`}
        style={{ maxHeight: heights[size], width: 'auto' }}
      />
    </Link>
  );
}
