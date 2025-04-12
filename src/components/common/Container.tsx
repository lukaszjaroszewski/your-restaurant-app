
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
        "px-4 py-4 pb-20", 
        fullHeight ? "min-h-[calc(100vh-56px)]" : "",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
