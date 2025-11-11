import fetchData from "../api/fetchData";
import type { UniversityMajor } from "../model/UniversityMajorModel";
import type { Admission, TrendAnalysis } from "../model/AdmissionModel";

export async function getAdmissionByYear(year: number) {
  return await fetchData<UniversityMajor[]>(`/api/admission/${year}`);
}

export async function getAdmissionByUniversity(universityCode: string) {
  return await fetchData<UniversityMajor[]>(`/api/admission/university/${encodeURIComponent(universityCode)}`);
}

export async function upsertAdmission(payload: UniversityMajor) {
  return await fetchData("/api/admission", { method: "POST", body: payload });
}

// New functions for trend analysis
export async function getAdmissionData(year: number): Promise<Admission[]> {
  return await fetchData<Admission[]>(`/api/Admission/${year}`);
}

export async function analyzeTrends(year: number): Promise<TrendAnalysis[]> {
  const admissions = await getAdmissionData(year);
  
  // Nhóm dữ liệu theo ngành
  const majorGroups = new Map<string, Admission[]>();
  
  admissions.forEach(admission => {
    const key = admission.majorCode;
    if (!majorGroups.has(key)) {
      majorGroups.set(key, []);
    }
    majorGroups.get(key)!.push(admission);
  });
  
  // Phân tích xu hướng cho từng ngành
  const trends: TrendAnalysis[] = [];
  
  majorGroups.forEach((admissionList, majorCode) => {
    const majorName = admissionList[0].majorName;
    
    // Tính tổng chỉ tiêu theo năm
    const total2023 = admissionList.reduce((sum, item) => sum + item.quota_2023, 0);
    const total2024 = admissionList.reduce((sum, item) => sum + item.quota_2024, 0);
    const total2025 = admissionList.reduce((sum, item) => sum + item.quota_2025, 0);
    
    // Tính phần trăm thay đổi
    const trend2024 = total2023 > 0 ? ((total2024 - total2023) / total2023) * 100 : 0;
    const trend2025 = total2024 > 0 ? ((total2025 - total2024) / total2024) * 100 : 0;
    const totalChange = total2023 > 0 ? ((total2025 - total2023) / total2023) * 100 : 0;
    
    // Xác định loại xu hướng
    let trendType: 'increase' | 'decrease' | 'stable' = 'stable';
    if (totalChange > 2) trendType = 'increase';
    else if (totalChange < -2) trendType = 'decrease';
    
    trends.push({
      majorCode,
      majorName,
      trend2024,
      trend2025,
      totalChange,
      trendType,
      totalQuota2025: total2025
    });
  });
  
  return trends.sort((a, b) => Math.abs(b.totalChange) - Math.abs(a.totalChange));
}

export async function getTopTrendingMajors(year: number, limit: number = 5): Promise<{
  increasing: TrendAnalysis[];
  decreasing: TrendAnalysis[];
}> {
  const trends = await analyzeTrends(year);
  
  const increasing = trends
    .filter(t => t.trendType === 'increase')
    .slice(0, limit);
    
  const decreasing = trends
    .filter(t => t.trendType === 'decrease')
    .slice(0, limit);
  
  return { increasing, decreasing };
}
