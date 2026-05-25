import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/lib/content';

type LogoProps = { size?: number; className?: string; href?: string };

export default function Logo({ size = 50, className = '', href = '/' }: LogoProps) {
  const inner = (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={assets.logoGlow}
        alt="PayLow Staffing"
        width={size * 3}
        height={size}
        priority
        className="h-auto w-auto"
        style={{ maxHeight: size, width: 'auto' }}
        unoptimized
      />
    </span>
  );
  if (!href) return inner;
  return (
    <Link href={href} aria-label="PayLow — Home" className="inline-flex items-center">
      {inner}
    </Link>
  );
}
