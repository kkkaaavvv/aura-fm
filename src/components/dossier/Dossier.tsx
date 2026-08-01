"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DossierCover from "./DossierCover";

export default function Dossier() {
  const [page] = useState(0);

  const pages = [
    <DossierCover
      key="cover"
      username="SUBJECT"
      onOpen={() => {}}
    />,
  ];

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden bg-[#050505] text-zinc-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -40,
          }}
          transition={{
            duration: 0.35,
          }}
          className="absolute inset-0"
        >
          {pages[page]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}