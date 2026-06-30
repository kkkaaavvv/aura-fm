"use client";

import { useEffect, useState } from "react";

const CHARS = ["█", "▓", "▒", "░"];

function randomBar(length: number) {
  return Array.from({ length }, () => {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }).join("");
}

interface SignalStabilityProps {
  anomaly?: boolean;
}

export default function SignalStability({
  anomaly = false,
}: SignalStabilityProps) {
  const [bar, setBar] = useState(randomBar(34));

  useEffect(() => {
    const interval = setInterval(() => {
      setBar(randomBar(34));
    }, anomaly ? 40 : 100);

    return () => clearInterval(interval);
  }, [anomaly]);

  return (
    <div className="mt-8 border border-zinc-800 bg-[#080808] p-4">
      <p className="font-pixel text-[10px] uppercase tracking-[0.35em] text-zinc-500">
        Signal Stability
      </p>

      <div className="mt-3 font-mono text-lg tracking-[2px] text-green-300">
        {bar}
      </div>

      <div className="mt-4 space-y-1 text-xs font-mono text-zinc-500">
        <div className="flex justify-between">
          <span>Noise Level</span>
          <span>{anomaly ? "87%" : "18%"}</span>
        </div>

        <div className="flex justify-between">
          <span>Signal Integrity</span>
          <span>{anomaly ? "13%" : "82%"}</span>
        </div>

        <div className="flex justify-between">
          <span>Archive Sync</span>

          <span
            className={
              anomaly
                ? "text-yellow-300"
                : "text-green-400"
            }
          >
            {anomaly ? "UNSTABLE" : "ACTIVE"}
          </span>
        </div>
      </div>
    </div>
  );
}