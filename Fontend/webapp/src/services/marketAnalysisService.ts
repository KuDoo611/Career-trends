import fetchData from "../api/fetchData";
import type { Analysis } from "../model/AnalysisModel";

export async function getAllAnalysis() {
  return await fetchData<Analysis[]>("/api/marketanalysis");
}

export async function createAnalysis(payload: Analysis) {
  return await fetchData("/api/marketanalysis", { method: "POST", body: payload });
}

export async function updateAnalysis(code: string, payload: Analysis) {
  return await fetchData(`/api/marketanalysis/${encodeURIComponent(code)}`, { method: "PUT", body: payload });
}
