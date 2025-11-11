export interface Admission {
  umCode: string;
  universityCode: string;
  universityName: string;
  majorCode: string;
  majorName: string;
  quota_2023: number;
  quota_2024: number;
  quota_2025: number;
  year: number;
}

export interface TrendAnalysis {
  majorCode: string;
  majorName: string;
  trend2024: number; // Sự thay đổi từ 2023 -> 2024
  trend2025: number; // Sự thay đổi từ 2024 -> 2025
  totalChange: number; // Tổng thay đổi từ 2023 -> 2025
  trendType: 'increase' | 'decrease' | 'stable';
  totalQuota2025: number; // Tổng chỉ tiêu 2025 của ngành
}