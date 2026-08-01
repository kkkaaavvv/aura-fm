"use client";

import { useEffect, useState } from "react";
import CRTTransition from "./CRTTransition";
import AuraReveal from "./AuraReveal";

export type TransitionStage =
  | "idle"
  | "crt"
  | "reveal"
  | "finished";

interface TransitionManagerProps {
  active: boolean;
  onComplete: () => void;

  // Temporary defaults until connected to the analysis engine
  auraName?: string;
  auraColor?: string;
}

export default function TransitionManager({
  active,
  onComplete,
  auraName = "VOID BLUE",
  auraColor = "#5A7DFF",
}: TransitionManagerProps) {
  const [stage, setStage] = useState<TransitionStage>("idle");

  useEffect(() => {
    if (!active) return;

    setStage("crt");
  }, [active]);

  useEffect(() => {
    if (stage === "finished") {
      onComplete();
    }
  }, [stage, onComplete]);

  if (!active) return null;

  switch (stage) {
    case "crt":
      return (
        <CRTTransition
          onComplete={() => setStage("reveal")}
        />
      );

    case "reveal":
      return (
        <AuraReveal
          auraName={auraName}
          auraColor={auraColor}
          onComplete={() => setStage("finished")}
        />
      );

    case "finished":
      return null;

    default:
      return null;
  }
}