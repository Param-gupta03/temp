import React from 'react';

// Helper component for navigation links (used by Header for both desktop and mobile)
const NavLink = ({ to, setCurrentPage, icon, text, setIsMobileMenuOpen }) => {
    const handleClick = () => {
        setCurrentPage(to);
        if (setIsMobileMenuOpen) { // Close mobile menu if function is provided
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <button onClick={handleClick} className="text-gray-700 hover:text-green-600 font-medium transition duration-300 rounded-md px-3 py-2 hover:bg-gray-100 flex items-center gap-1">
            {icon} {text}
        </button>
    );
};

export default NavLink;
