import { AuraDataset } from "@/lib/spotify/types";

let dataset: AuraDataset | null = null;

export function setDataset(data: AuraDataset) {
  dataset = data;
}

export function getDataset() {
  return dataset;
}

export function clearDataset() {
  dataset = null;
}