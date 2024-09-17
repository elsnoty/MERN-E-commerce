"use client";
import { motion } from "framer-motion";
import { ImagesSlider } from "./ImageSlider";
import banner1 from '../../public/wise-minds-clothing-NrF4Dw4BG5Q-unsplash.jpg'
import banner2 from '../../public/arthur-ogleznev-za4MkOt2Akg-unsplash.jpg'
import banner3 from '../../public/xavier-teo-SxAXphIPWeg-unsplash.jpg'
import Link from "next/link";

export function Slider() {
  const images = [
    banner1,
    banner2,
    banner3,
  ];

  return (
    <ImagesSlider className="h-[40rem]" images={images} >
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Just For You<br /> DISC for online order 25%
        </motion.p>
      <Link
        href="/categories"
        className="relative inline-block px-4 py-2 font-medium group"
      >
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        <span className="relative text-black group-hover:text-white">Join Now →</span>
      </Link>
      </motion.div>
    </ImagesSlider>
  );
}
