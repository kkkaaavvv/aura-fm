let dataset: any = null;

export function setDataset(data: any) {
  dataset = data;
}

export function getDataset() {
  return dataset;
}

export function clearDataset() {
  dataset = null;
}