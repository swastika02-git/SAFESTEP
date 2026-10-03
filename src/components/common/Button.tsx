import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'beige';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[36px]',
    md: 'px-4 py-2.5 text-sm gap-2 min-h-[44px]', // Accessible 44px min touch target
    lg: 'px-6 py-3.5 text-base gap-2.5 min-h-[50px]',
  }[size];

  const variantClasses = {
    primary: 'bg-safestep-moss text-safestep-darker hover:bg-safestep-moss-light shadow-glow-moss active:scale-[0.98]',
    secondary: 'bg-safestep-midnight/70 text-safestep-beige border border-safestep-moss/40 hover:bg-safestep-midnight hover:border-safestep-moss active:scale-[0.98]',
    danger: 'bg-safestep-rose/20 text-safestep-rose border border-safestep-rose/50 hover:bg-safestep-rose/30 active:scale-[0.98]',
    ghost: 'text-safestep-beige/80 hover:text-safestep-beige hover:bg-safestep-midnight/30',
    beige: 'bg-safestep-beige text-safestep-darker hover:bg-safestep-beige-dark shadow-sm active:scale-[0.98]',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
