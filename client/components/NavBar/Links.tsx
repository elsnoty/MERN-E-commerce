"use client"
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, MenuItem } from "./NavLinks";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  const categories = ["Men", "Women", "Kids", "Electronics"];

  return (
    <div className={cn("relative inset-x-0 mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Clothing">
          <div className="flex flex-col space-y-4 text-sm">
            {categories.map((category, index) => (
              <p
                key={index}
              >
                {category}
              </p>
            ))}
          </div>
        </MenuItem>
      </Menu>
      <Link href="/categories">New</Link>
    </div>
  );
}
