export enum ArchiveStage {
  /**
   * Initial Archive.LOG window
   */
  INTRO = "INTRO",

  /**
   * Analysis.exe terminal
   */
  ANALYSIS = "ANALYSIS",

  /**
   * "Analysis Complete" popup
   */
  COMPLETE = "COMPLETE",

  /**
   * "Open at your own risk" warning
   */
  WARNING = "WARNING",

  /**
   * CRT glitch / interface corruption
   */
  GLITCH = "GLITCH",

  /**
   * Final Aura dossier
   */
  DOSSIER = "DOSSIER",
}