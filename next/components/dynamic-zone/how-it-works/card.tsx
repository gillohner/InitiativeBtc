"use client";

import React, { MouseEvent as ReactMouseEvent, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Beam from "../../beam";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { MainContent } from "./main-content";

export const Card = ({
  title,
  description,
  image,
  link,
  index,
}: {
  title: string;
  description: BlocksContent;
  image?: any;
  link?: { URL: string; target: string; text: string; };
  index: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const width = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 100]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <div
      ref={ref}
      className="grid grid-cols-[80px_auto] max-w-5xl mx-auto py-10 cursor-pointer gap-8"
      onClick={() => link?.URL && window.open(link.URL, link.target || "_blank")}
    >
      {/* Left Number */}
      <div className="flex flex-col items-start">
        <p className="text-4xl font-extrabold text-white opacity-80 mt-2">
          {index < 10 ? `0${index}` : index}
        </p>
        <motion.div
          className="h-px w-full bg-gradient-to-r from-neutral-800 to-neutral-600 rounded-full mt-4 relative overflow-hidden"
          style={{ width }}
        >
          <Beam className="top-0" />
        </motion.div>
      </div>

      {/* Main Content */}
      {link?.URL ? (
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <MainContent
            title={title}
            description={description}
            image={image}
            link={link}
            handleMouseMove={handleMouseMove}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </motion.div>
      ) : (
        <MainContent
          title={title}
          description={description}
          image={image}
          link={link}
          handleMouseMove={handleMouseMove}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      )}
    </div>
  );
};
