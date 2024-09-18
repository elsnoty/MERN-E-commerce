import { ProductsProp } from "@/models/Products";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export const AnimatedProduct = (props: {item:ProductsProp}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0 1", "1.33 1"],
    });
  
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
    return (
      <motion.div
      className={`z-20`}
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}>
        <div >
          <div>
            <Image src={props.item.image[0]}
              alt={props.item.name}               
              className="max-h-[250px]"
              width={280}
              height={250}
              priority
              />
            <p className="text-wrap">{props.item.name}</p>
          </div>
          <p className="font-bold text-fuchsia-600">{props.item.price}</p>
        </div>
      </motion.div>
    );
  };