"use client"
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, MenuItem } from "./NavLinks";

const gender = ["Men", "Women", "Kids"];
const clothes = ["Clothes", "Shoes", "Electronics" ];

export default function Navbar({ className, toggleMenu }: { className?: string, toggleMenu?: () => void }) {
  const [active, setActive] = useState<string | null>(null);
 
  return (
    <div className={cn("relative inset-x-0 mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Gender">
          <div className="flex flex-col space-y-4 text-sm z-[70]">
            {gender.map((category, index) => (
              <Link
              className="font-semibold"
              href={`/categories?category=${category.toLocaleLowerCase()}`}
                key={index}
                onClick={toggleMenu}
              >
                {category}
              </Link>
            ))}
          </div>
        </MenuItem>
      </Menu>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Fashion">
          <div className="flex flex-col space-y-4 text-sm ">
            {clothes.map((category, index) => (
              <Link
              className="font-semibold"
              href={`/categories?category=${category.toLocaleLowerCase()}`}
                key={index}
                onClick={toggleMenu}
              >
                {category}
              </Link>
            ))}
          </div>
        </MenuItem>
      </Menu>
        <Link href="/categories" onClick={toggleMenu}>Categories</Link>
    </div>
  );
}
