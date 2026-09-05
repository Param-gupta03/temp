"use client";
import React from 'react';

interface CategoryCardProps {
  name: string;
  icon: string;
  onClick?: () => void;
}

const CategoryCard = ({ name, icon, onClick }: CategoryCardProps) => (
  <button
    onClick={onClick}
    className="group bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-8 rounded-3xl hover:border-[#2f4739] dark:hover:border-[#489a69] hover:shadow-[0_12px_30px_rgba(47,71,57,0.12)] transition-all duration-300 flex flex-col items-center gap-4 shadow-card active:scale-95 text-center"
  >
    <div className="text-4xl p-4 bg-[#f7f4ee] dark:bg-[#223028] rounded-2xl border border-[#ede4d5] dark:border-[#2f4739] group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <span className="font-serif text-lg font-bold text-[#111827] dark:text-[#f4f0ea] group-hover:text-[#2f4739] dark:group-hover:text-[#489a69] transition-colors">
      {name}
    </span>
  </button>
);

export default CategoryCard;
