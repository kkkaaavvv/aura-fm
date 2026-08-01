import { Dossier } from "./types";

let dossier: Dossier | null = null;

export function setDossier(value: Dossier) {
  dossier = value;
}

export function getDossier(): Dossier | null {
  return dossier;
}

export function hasDossier(): boolean {
  return dossier !== null;
}

export function clearDossier() {
  dossier = null;
}