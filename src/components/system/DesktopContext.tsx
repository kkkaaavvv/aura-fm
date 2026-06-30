"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface DesktopContextType {
  offsetY: number;
  locked: boolean;
  auraColor: string;

  moveDesktop: (y: number) => void;
  resetDesktop: () => void;

  lockDesktop: () => void;
  unlockDesktop: () => void;

  setAuraColor: (color: string) => void;
}

const DesktopContext = createContext<DesktopContextType | null>(null);

export function DesktopProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [offsetY, setOffsetY] = useState(0);

  const [locked, setLocked] = useState(false);

  const [auraColor, setAuraColor] = useState("#ffffff");

  const value = useMemo(
    () => ({
      offsetY,

      locked,

      auraColor,

      moveDesktop: (y: number) => {
        setOffsetY(y);
      },

      resetDesktop: () => {
        setOffsetY(0);
      },

      lockDesktop: () => {
        setLocked(true);
      },

      unlockDesktop: () => {
        setLocked(false);
      },

      setAuraColor,
    }),
    [offsetY, locked, auraColor]
  );

  return (
    <DesktopContext.Provider value={value}>
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const context = useContext(DesktopContext);

  if (!context) {
    throw new Error(
      "useDesktop must be used inside DesktopProvider."
    );
  }

  return context;
}