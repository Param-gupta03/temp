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
    className="group bg-white border border-[#e7e0d5] p-7 rounded-2xl hover:border-[#cfc4b2] hover:shadow-[0_10px_25px_-3px_rgba(47,71,57,0.08)] transition-all duration-300 flex flex-col items-center gap-3.5 shadow-[0_2px_10px_rgba(47,71,57,0.03)] active:scale-95"
  >
    <div className="text-3xl p-3.5 bg-[#f7f4ee] rounded-full border border-[#ede4d5] group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <span className="font-serif text-base font-semibold text-[#1c1917] group-hover:text-[#2f4739] transition-colors">
      {name}
    </span>
  </button>
);

export default CategoryCard;
