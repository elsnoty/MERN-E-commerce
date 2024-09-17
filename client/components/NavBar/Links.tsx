  "use client";
  import { cn } from "@/lib/utills";
  import React, { useState } from "react";
  import { HoveredLink, Menu, MenuItem } from "./NavLinks";
  import Link from "next/link";

  export default function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);

    return (

      <div
        className={cn("relative inset-x-0 mx-auto z-50 ", className)}
      >
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Clothing">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Men</HoveredLink>
              <HoveredLink href="/interface-design">Women</HoveredLink>
              <HoveredLink href="/seo">Kids</HoveredLink>
              <HoveredLink href="/branding" >Electronics</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
        <Link href= {'/categories'}>New</Link>
      </div>
    );
  }
