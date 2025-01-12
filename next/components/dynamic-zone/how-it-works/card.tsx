"use client";

import React, { MouseEvent as ReactMouseEvent, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { CanvasRevealEffect } from "../../ui/canvas-reveal-effect";
import Beam from "../../beam";

export const Card = ({
  title,
  description,
  image,
  link,
  index,
}: {
  title: string;
  description: string | { [key: string]: any }; // Handle both string and object for rich text
  image?: string;
  link?: { url: string; target: string };
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
      onClick={() => link?.url && window.open(link.url, link.target || "_self")}
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
      <div
        className="group p-6 rounded-md border border-neutral-800 bg-neutral-950 relative z-40 flex flex-col gap-6"
        onMouseMove={handleMouseMove}
      >
        {/* Hover Effect */}
        <motion.div
          className="pointer-events-none absolute z-10 -inset-px rounded-md opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            maskImage: useMotionTemplate`
            radial-gradient(
              circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,1),
              transparent
            )
          `,
            backgroundColor: "#F7931A",
          }}
        >
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={2}
          />
        </motion.div>

        {/* Text Content */}
        <div>
          <p className="text-xl font-bold text-white">{title}</p>
          {typeof description === "string" ? (
            <p className="text-neutral-400 mt-2">{description}</p>
          ) : (
            <div
              className="text-neutral-400 mt-2"
              dangerouslySetInnerHTML={{
                __html:
                  description?.type === "rich-text" ? description.children : "",
              }}
            />
          )}
        </div>

        {/* Image with Fade Effect */}
        {image && (
          <div className="relative w-full h-[150px]">
            <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/80 to-transparent"></div>
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover rounded-md shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};
