export interface Analysis {
  analysisCode: string;
  majorCode: string;
  majorName: string;
  year: number;
  demandIndex?: number;
  employmentRate?: number;
  salaryLevel?: string;
  adminNote?: string;
  createdBy?: string;
  createdByName: string;
  createdAt?: string;
}