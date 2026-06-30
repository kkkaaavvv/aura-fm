"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  speed?: number;
  onComplete?: () => void;
};

export default function Typewriter({
  text,
  speed = 250,
  onComplete,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;

    setDisplayedText("");

    const typing = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typing);

        setTimeout(() => {
          onComplete?.();
        }, 2500);
      }
    }, speed);

    return () => clearInterval(typing);
  }, [text, speed, onComplete]);

  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(blink);
  }, []);

  return (
    <span>
      {displayedText}
      <span className="inline-block w-[12px]">
        {cursorVisible ? "|" : ""}
      </span>
    </span>
  );
}