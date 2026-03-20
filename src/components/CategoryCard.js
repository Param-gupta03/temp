import React from 'react';

// CategoryCard now accepts an onClick prop for the pop-up message
const CategoryCard = ({ name, icon, onClick }) => (
    <button onClick={onClick} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center border border-green-100">
        <span className="text-5xl mb-3">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    </button>
);

export default CategoryCard;
