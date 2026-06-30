"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useDesktop } from "./DesktopContext";

interface DesktopViewportProps {
  children: ReactNode;
}

export default function DesktopViewport({
  children,
}: DesktopViewportProps) {
  const {
    offsetY,
    locked,
    auraColor,
  } = useDesktop();

  return (
    <motion.div
      animate={{
        y: offsetY,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      style={{
        borderColor: auraColor,
      }}
      className={`
        relative
        min-h-screen
        overflow-visible
        ${locked ? "pointer-events-none cursor-none" : ""}
      `}
    >
      {children}
    </motion.div>
  );
}