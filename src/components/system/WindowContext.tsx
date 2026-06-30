"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

interface WindowContextType {
  archiveOpen: boolean;
  setArchiveOpen: React.Dispatch<React.SetStateAction<boolean>>;

  recordOpen: boolean;
  setRecordOpen: React.Dispatch<React.SetStateAction<boolean>>;

  memoryOpen: boolean;
  setMemoryOpen: React.Dispatch<React.SetStateAction<boolean>>;

  profileOpen: boolean;
  setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;

  analysisOpen: boolean;
  setAnalysisOpen: React.Dispatch<React.SetStateAction<boolean>>;

  birthDate: string;
  setBirthDate: React.Dispatch<React.SetStateAction<string>>;

  archiveZ: number;
  setArchiveZ: React.Dispatch<React.SetStateAction<number>>;

  recordZ: number;
  setRecordZ: React.Dispatch<React.SetStateAction<number>>;

  memoryZ: number;
  setMemoryZ: React.Dispatch<React.SetStateAction<number>>;

  profileZ: number;
  setProfileZ: React.Dispatch<React.SetStateAction<number>>;

  analysisZ: number;
  setAnalysisZ: React.Dispatch<React.SetStateAction<number>>;
}

const WindowContext = createContext<WindowContextType | null>(
  null
);

export function WindowProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [recordOpen, setRecordOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);

  const [birthDate, setBirthDate] = useState("");

  const [archiveZ, setArchiveZ] = useState(60);
  const [recordZ, setRecordZ] = useState(50);
  const [memoryZ, setMemoryZ] = useState(70);
  const [profileZ, setProfileZ] = useState(80);
  const [analysisZ, setAnalysisZ] = useState(90);

  const value = useMemo(
    () => ({
      archiveOpen,
      setArchiveOpen,

      recordOpen,
      setRecordOpen,

      memoryOpen,
      setMemoryOpen,

      profileOpen,
      setProfileOpen,

      analysisOpen,
      setAnalysisOpen,

      birthDate,
      setBirthDate,

      archiveZ,
      setArchiveZ,

      recordZ,
      setRecordZ,

      memoryZ,
      setMemoryZ,

      profileZ,
      setProfileZ,

      analysisZ,
      setAnalysisZ,
    }),
    [
      archiveOpen,
      recordOpen,
      memoryOpen,
      profileOpen,
      analysisOpen,

      birthDate,

      archiveZ,
      recordZ,
      memoryZ,
      profileZ,
      analysisZ,
    ]
  );

  return (
    <WindowContext.Provider value={value}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindow() {
  const context = useContext(WindowContext);

  if (!context) {
    throw new Error(
      "useWindow must be used inside WindowProvider."
    );
  }

  return context;
}