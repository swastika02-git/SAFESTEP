import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'beige' | 'midnight';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'dark',
  onClick 
}) => {
  let variantClasses = 'bg-safestep-darker/80 border-safestep-moss/20 text-safestep-beige';
  
  if (variant === 'beige') {
    variantClasses = 'bg-safestep-beige text-safestep-darker border-safestep-moss/30 shadow-card';
  } else if (variant === 'midnight') {
    variantClasses = 'bg-safestep-midnight/40 border-safestep-moss/30 text-safestep-beige';
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border p-5 transition-all ${variantClasses} ${
        onClick ? 'cursor-pointer hover:border-safestep-moss/60 hover:shadow-glow-moss' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
