
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className,
  fullHeight = false 
}) => {
  return (
    <div 
      className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20", 
        fullHeight ? "min-h-[calc(100vh-56px)]" : "",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
