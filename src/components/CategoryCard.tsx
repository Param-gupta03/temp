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
    className="group bg-slate-800/40 border border-slate-700 p-8 rounded-[2.5rem] hover:border-green-500/50 transition-all duration-300 flex flex-col items-center gap-4 hover:shadow-2xl hover:shadow-green-500/10 active:scale-95"
  >
    <div className="text-5xl group-hover:scale-125 transition-transform duration-500">
      {icon}
    </div>
    <span className="text-slate-200 font-bold text-lg group-hover:text-white transition-colors">
      {name}
    </span>
  </button>
);

export default CategoryCard;
