import fetchData from "../api/fetchData";
import type { University } from "../model/UniversityModel";

export async function getAllUniversities() {
  return await fetchData<University[]>("/api/universities");
}

export async function getUniversity(code: string) {
  return await fetchData<University>(`/api/universities/${encodeURIComponent(code)}`);
}
