import React from 'react';

interface SvgLogoProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const SvgLogo = ({ width = "120", height = "120", className = "" }: SvgLogoProps) => {
    return (
        <div className={`flex items-center justify-center bg-transparent ${className}`} style={{ width: width, height: height }}>
            <img 
                src="/logo.png" 
                alt="The Green Turtles Logo" 
                className="max-w-full max-h-full object-contain bg-transparent"
            />
        </div>
    );
};

export default SvgLogo;
