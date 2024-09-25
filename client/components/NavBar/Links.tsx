"use client"
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, MenuItem } from "./NavLinks";

const gender = ["Men", "Women", "Kids"];
const clothes = ["Clothes", "Shoes", "Electronics" ];

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
 
  return (
    <div className={cn("relative inset-x-0 mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Gender">
          <div className="flex flex-col space-y-4 text-sm">
            {gender.map((category, index) => (
              <Link
              href={`/categories?category=${category.toLocaleLowerCase()}`}
                key={index}
              >
                {category}
              </Link>
            ))}
          </div>
        </MenuItem>
      </Menu>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Fashion">
          <div className="flex flex-col space-y-4 text-sm">
            {clothes.map((category, index) => (
              <Link
              href={`/categories?category=${category.toLocaleLowerCase()}`}
                key={index}
              >
                {category}
              </Link>
            ))}
          </div>
        </MenuItem>
      </Menu>
      <Link href="/categories">Categories</Link>
    </div>
  );
}
