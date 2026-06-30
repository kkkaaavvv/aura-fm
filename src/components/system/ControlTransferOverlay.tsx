"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ControlTransferOverlayProps {
  visible: boolean;
}

export default function ControlTransferOverlay({
  visible,
}: ControlTransferOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{
              duration: 0.4,
            }}
            className="w-[520px] border border-zinc-700 bg-[#090909] shadow-[0_0_60px_rgba(255,255,255,.04)]"
          >
            {/* Header */}

            <div className="border-b border-zinc-700 px-5 py-3">
              <p className="font-pixel text-[10px] uppercase tracking-[0.35em] text-zinc-300">
                ARCHIVE://
              </p>
            </div>

            {/* Body */}

            <div className="space-y-6 p-6 font-mono text-[14px] leading-7 text-zinc-300">

              <p>
                User interaction has been suspended.
              </p>

              <p>
                Temporary workstation control has been
                transferred to the Archive.
              </p>

              <p>
                Manual interruption is not advised.
              </p>

              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="text-zinc-500"
              >
                █
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}