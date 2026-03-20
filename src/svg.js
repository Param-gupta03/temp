import React from 'react';

const SvgLogo = ({ width = "120", height = "120", className = "" }) => {
    return (
        // When using an image, the SVG wrapper is less critical,
        // but we'll keep it to apply width/height/className consistently.
        // The image itself will be inside.
        <div className={`flex items-center justify-center ${className}`} style={{ width: width, height: height }}>
            {/* Using an <img> tag to display the logo from the public folder */}
            {/* Assuming your logo image is named 'logo.png' and is in the 'public' folder. */}
            {/* If your image has a different name or path, please update the src accordingly. */}
            <img 
                src={`${process.env.PUBLIC_URL}/logo.png`} 
                alt="Green Turtle Logo" 
                className="max-w-full max-h-full object-contain"
                // Fallback for image loading errors, though for local files it's less common
                onError={(e) => {
                    e.target.onerror = null; // Prevents infinite loop
                    e.target.src = "https://placehold.co/120x120/e0f2fe/1e40af?text=Logo+Error"; // Placeholder on error
                }}
            />
        </div>
    );
};

export default SvgLogo;
