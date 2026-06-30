"use client";

import { useEffect } from "react";
import { useWindow } from "@/components/system/WindowContext";

import ArchiveWindow from "@/components/windows/ArchiveWindow";
import RecordWindow from "@/components/windows/RecordWindow";
import MemoryIndexWindow from "@/components/windows/MemoryIndexWindow";
import ProfileWindow from "@/components/windows/ProfileWindow";
import AnalysisWindow from "@/components/windows/AnalysisWindow";

interface WindowManagerProps {
  username: string;
}

export default function WindowManager({
  username,
}: WindowManagerProps) {
  const {
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
  } = useWindow();

  // Automatically open the first window when the desktop loads
  useEffect(() => {
    if (
      !archiveOpen &&
      !recordOpen &&
      !memoryOpen &&
      !profileOpen &&
      !analysisOpen
    ) {
      setArchiveOpen(true);
    }
  }, [
    archiveOpen,
    recordOpen,
    memoryOpen,
    profileOpen,
    analysisOpen,
    setArchiveOpen,
  ]);

  return (
    <>
      {archiveOpen && (
        <ArchiveWindow
          username={username}
          zIndex={archiveZ}
          onFocus={() => {
            setArchiveZ(60);
            setRecordZ(50);
          }}
          onClose={() => setArchiveOpen(false)}
          onContinue={() => {
            setArchiveZ(50);
            setRecordZ(60);
            setRecordOpen(true);
          }}
        />
      )}

      {recordOpen && (
        <RecordWindow
          zIndex={recordZ}
          onFocus={() => {
            setRecordZ(60);
            setArchiveZ(50);
          }}
          onClose={() => setRecordOpen(false)}
          onContinue={() => {
            setMemoryOpen(true);

            setMemoryZ(70);
            setRecordZ(60);
            setArchiveZ(50);
          }}
        />
      )}

      {memoryOpen && (
        <MemoryIndexWindow
          zIndex={memoryZ}
          onFocus={() => {
            setMemoryZ(70);
            setRecordZ(60);
            setArchiveZ(50);
          }}
          onClose={() => setMemoryOpen(false)}
          onContinue={() => {
            setMemoryOpen(false);
            setProfileOpen(true);
          }}
        />
      )}

      {profileOpen && (
        <ProfileWindow
          zIndex={profileZ}
          onFocus={() => {
            setProfileZ(80);
            setMemoryZ(70);
            setRecordZ(60);
            setArchiveZ(50);
          }}
          onClose={() => setProfileOpen(false)}
          onAnalyze={(birthDate) => {
            setBirthDate(birthDate);

            setProfileOpen(false);
            setAnalysisOpen(true);
          }}
        />
      )}

      {analysisOpen && (
        <AnalysisWindow
          birthDate={birthDate}
          zIndex={analysisZ}
          onFocus={() => {
            setAnalysisZ(90);
          }}
          onClose={() => setAnalysisOpen(false)}
          onComplete={() => {
            setAnalysisOpen(false);

            console.log("Analysis Complete");
          }}
        />
      )}
    </>
  );
}