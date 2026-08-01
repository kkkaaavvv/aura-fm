"use client";

import { useEffect, useRef, useState } from "react";
import AnalysisCompleteWindow from "@/components/windows/AnalysisCompleteWindow";
import WarningWindow from "@/components/windows/WarningWindow";
import { useWindow } from "@/components/system/WindowContext";
import TransitionManager from "@/components/Transitions/TransitionManager";
import ArchiveWindow from "@/components/windows/ArchiveWindow";
import RecordWindow from "@/components/windows/RecordWindow";
import MemoryIndexWindow from "@/components/windows/MemoryIndexWindow";
import ProfileWindow from "@/components/windows/ProfileWindow";
import AnalysisWindow from "@/components/windows/AnalysisWindow";
import Dossier from "@/components/dossier/Dossier";
import { ArchiveStage } from "@/lib/aura/stages";

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

  const [stage, setStage] = useState(
    ArchiveStage.INTRO
  );
  const [showTransition, setShowTransition] = useState(false);

  // Tracks whether we've already performed the initial
  // "nothing is open yet, so open the Archive" bootstrap.
  //
  // Why this exists:
  // Previously this effect re-ran any time ALL window flags
  // were simultaneously false. That's true not only on the very
  // first mount, but also for a brief moment during the
  // Archive -> Record handoff (archiveOpen is set false
  // immediately, while recordOpen is set true 300ms later inside
  // a setTimeout). That intermediate "all false" render was
  // indistinguishable from "app just booted," so the effect
  // fired again and remounted ArchiveWindow mid-transition.
  //
  // A ref (not state) is used deliberately: we want this to be a
  // one-time imperative bootstrap action, not something that
  // re-triggers on every render or every dependency change.
  const hasAutoOpened = useRef(false);

  useEffect(() => {

    if (hasAutoOpened.current) {
      return;
    }

    if (
      !archiveOpen &&
      !recordOpen &&
      !memoryOpen &&
      !profileOpen &&
      !analysisOpen
    ) {

      hasAutoOpened.current = true;

      setArchiveOpen(true);

      setStage(ArchiveStage.INTRO);

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

      {/* ================= INTRO ================= */}

      {archiveOpen &&
        stage === ArchiveStage.INTRO && (

        <ArchiveWindow
          username={username}
          zIndex={archiveZ}
          onFocus={() => {

            setArchiveZ(60);
            setRecordZ(50);

          }}
          onClose={() => setArchiveOpen(false)}
          onContinue={() => {

            setArchiveOpen(false);

            setStage(
              ArchiveStage.ANALYSIS
            );

            setTimeout(() => {

              setRecordOpen(true);

              setRecordZ(60);

            }, 300);

          }}
        />

      )}

      {/* ================= RECORD ================= */}

      {recordOpen &&
        stage === ArchiveStage.ANALYSIS && (

        <RecordWindow
          zIndex={recordZ}
          onFocus={() => {

            setRecordZ(60);

          }}
          onClose={() => setRecordOpen(false)}
          onContinue={() => {

            setRecordOpen(false);

            setMemoryOpen(true);

            setMemoryZ(70);

          }}
        />

      )}

      {/* ================= MEMORY ================= */}

      {memoryOpen &&
        stage === ArchiveStage.ANALYSIS && (

        <MemoryIndexWindow
          zIndex={memoryZ}
          onFocus={() => {

            setMemoryZ(70);

          }}
          onClose={() => setMemoryOpen(false)}
          onContinue={() => {

            setMemoryOpen(false);

            setProfileOpen(true);

          }}
        />

      )}

      {/* ================= PROFILE ================= */}

      {profileOpen &&
        stage === ArchiveStage.ANALYSIS && (

        <ProfileWindow
          zIndex={profileZ}
          onFocus={() => {

            setProfileZ(80);

          }}
          onClose={() => setProfileOpen(false)}
          onAnalyze={(birthDate) => {

            setBirthDate(birthDate);

            setProfileOpen(false);

            setAnalysisOpen(true);

          }}
        />

      )}

      {/* ================= ANALYSIS ================= */}

      {analysisOpen &&
        stage === ArchiveStage.ANALYSIS && (

        <AnalysisWindow
          birthDate={birthDate}
          zIndex={analysisZ}
          onFocus={() => {

            setAnalysisZ(90);

          }}
          onClose={() => setAnalysisOpen(false)}
          onComplete={() => {

            setAnalysisOpen(false);

            setStage(
              ArchiveStage.COMPLETE
            );

          }}
        />

      )}

      {/* ================= COMPLETE ================= */}

{stage === ArchiveStage.COMPLETE && !showTransition && (
  <AnalysisCompleteWindow
    onContinue={() => {
      setStage(ArchiveStage.WARNING);
    }}
  />
)}

{/* ================= WARNING ================= */}

{stage === ArchiveStage.WARNING && !showTransition && (
  <WarningWindow
    onContinue={() => {
      setShowTransition(true);
    }}
    onCancel={() => {
      setStage(ArchiveStage.COMPLETE);
    }}
  />
)}
{showTransition && (
  <TransitionManager
    active
    onComplete={() => {
      setStage(ArchiveStage.DOSSIER);
      setShowTransition(false);
    }}
  />
)}
{stage === ArchiveStage.DOSSIER && (
    <Dossier />
)}

    </>
  );

}
