"use client";

export default function DesktopStatus() {
  return (
    <div
      className="
        absolute
        left-8
        top-8
        border
        border-green-900/40
        bg-black/60
        p-3
        text-[10px]
        uppercase
        tracking-[0.2em]
      "
    >
      <p className="text-green-400">
        ● Connected
      </p>

      <p className="text-green-300/80">
        Archive Active
      </p>

      <p className="text-green-300/80">
        Memory Index Ready
      </p>
    </div>
  );
}