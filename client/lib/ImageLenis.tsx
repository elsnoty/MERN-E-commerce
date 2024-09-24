"use client";
import { useState } from "react";
import Image from "next/image";
import { Lens } from "./Lenis";
import rest from '../public/wise-minds-clothing-NrF4Dw4BG5Q-unsplash.jpg'

export function LensDemo() {


  return (

      <div className="w-full relative rounded-3xl overflow-hidden max-w-md mx-auto bg-gradient-to-r from-[#1D2235] to-[#121318] p-8 my-10">
        <div className="relative z-10">
          <Lens hovering={hovering} setHovering={setHovering}>
            <Image
              src={rest}
              alt="image"
              width={500}
              height={500}
              className="rounded-2xl overflow-hidden"
            />

      </div>
  );
}

