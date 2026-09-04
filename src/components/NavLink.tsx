"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm transition-colors ${
        isActive ? 'text-[#2f4739] font-semibold' : 'text-[#1c1917]/75 hover:text-[#2f4739] font-medium'
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
