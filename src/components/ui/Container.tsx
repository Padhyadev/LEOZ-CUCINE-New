import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  style?: React.CSSProperties;
}

const maxWidthMap = {
  sm: '800px',
  md: '1200px',
  lg: '1400px',
  xl: '1800px',
  full: '100%',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`leoz-container ${className}`}
      style={{
        maxWidth: maxWidthMap[maxWidth] || '1400px',
        width: '100%',
        margin: '0 auto',
        paddingLeft: 'clamp(20px, 5vw, 80px)',
        paddingRight: 'clamp(20px, 5vw, 80px)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
