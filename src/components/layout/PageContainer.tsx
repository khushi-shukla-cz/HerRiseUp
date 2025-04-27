import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

/**
 * PageContainer - A responsive container component for page layouts
 * Ensures consistent spacing and width across all pages
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  fullWidth = false,
  noPadding = false,
}) => {
  return (
    <div 
      className={cn(
        "w-full mx-auto px-4",
        fullWidth ? "max-w-full" : "max-w-6xl",
        !noPadding && "py-4",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * PageHeader - A consistent header component for all pages
 */
export const PageHeader: React.FC<{
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}> = ({ title, description, className, children }) => {
  return (
    <header className={cn(
      "bg-white border-b border-career-soft py-4 px-4 shadow-sm sticky top-0 left-0 right-0 z-10",
      className
    )}>
      <PageContainer>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-career-primary">{title}</h1>
            {description && (
              <p className="text-sm text-career-neutralGray mt-1">{description}</p>
            )}
          </div>
          {children}
        </div>
      </PageContainer>
    </header>
  );
};

/**
 * PageContent - A consistent content container for all pages
 */
export const PageContent: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <main className={cn("flex-1 px-4 py-6", className)}>
      <PageContainer>
        {children}
      </PageContainer>
    </main>
  );
};

export default PageContainer; 