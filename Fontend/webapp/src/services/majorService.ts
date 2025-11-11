import fetchData from "../api/fetchData";
import type { Major } from "../model/MajorModel";

export async function getAllMajors() {
  return await fetchData<Major[]>("/api/majors");
}

export async function getMajor(code: string) {
  return await fetchData<Major>(`/api/majors/${encodeURIComponent(code)}`);
}
