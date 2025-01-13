"use client";

import React, { MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { CanvasRevealEffect } from "../../ui/canvas-reveal-effect";
import { FaDownload } from 'react-icons/fa';
import { BlocksRenderer, BlocksContent } from "@strapi/blocks-react-renderer";
import Image from "next/image";

interface MainContentProps {
  title: string;
  description: BlocksContent;
  image?: any;
  link?: { URL: string; target: string; text: string; };
  handleMouseMove: (event: ReactMouseEvent<HTMLDivElement>) => void;
  mouseX: any;
  mouseY: any;
}

export const MainContent: React.FC<MainContentProps> = ({
  title,
  description,
  image,
  link,
  handleMouseMove,
  mouseX,
  mouseY
}) => {
  return (
    <div
      className="group p-6 rounded-md border border-neutral-800 bg-neutral-950 relative z-40 flex flex-col md:flex-row gap-6"
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
      <div className="md:w-3/5 flex flex-col justify-between">
        <div>
          <p className="text-xl font-bold text-white">{title}</p>
          <BlocksRenderer content={Array.isArray(description) ? description : []} />
        </div>

        {/* Link with Icon */}
        {link?.URL && (
          <div className="flex items-center gap-6 mt-4 md:mt-0" style={{justifyContent: "flex-end"}}>
            <span style={{fontSize: "18px", fontWeight: "bold"}}>{link?.text ? link.text : link?.URL}</span>
            <FaDownload size="30" />
          </div>
        )}
      </div>

      {/* Image with Fade Effect */}
      {image?.formats?.large?.url && (
        <div className="relative w-full md:w-2/5 mt-4 md:mt-0">
          <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/80 to-transparent"></div>
          <Image
            src={"http://localhost:1337" + image.formats.large.url}
            alt={""}
            width={300}
            height={300}
            className="h-full w-full object-cover rounded-md shadow-md"
          />
        </div>
      )}
    </div>
  );
};
