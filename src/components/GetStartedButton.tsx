'use client';

import { ReactNode } from 'react';
import { useGetStartedModal } from './ModalProvider';

type Variant = 'primary' | 'outline' | 'ghost' | 'dark';
type Size = 'default' | 'lg' | 'sm';

const variants: Record<Variant, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  dark: 'btn-dark',
};
const sizes: Record<Size, string> = {
  default: '',
  lg: 'btn-lg',
  sm: 'text-xs px-4 py-2',
};

export default function GetStartedButton({
  children = 'Get Started',
  variant = 'primary',
  size = 'default',
  className = '',
}: {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const { open } = useGetStartedModal();
  return (
    <button
      type="button"
      onClick={open}
      className={`${variants[variant]} ${sizes[size]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
