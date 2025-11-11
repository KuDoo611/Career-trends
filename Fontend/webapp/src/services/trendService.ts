import fetchData from "../api/fetchData";
import type { Trend } from "../model/TrendModel";

export async function getTopMajors(year = 2025, topN = 4) {
  return await fetchData<Trend[]>(`/api/trend/top?year=${year}&topN=${topN}`);
}

export async function getTotalQuota(majorCode: string) {
  return await fetchData<{ period: string; value: number }[]>(`/api/trend/totalQuota/${encodeURIComponent(majorCode)}`);
}

// Get top trending majors
export async function getTopTrends(year: number, topN: number = 4): Promise<Trend[]> {
  return await fetchData<Trend[]>(`/api/Trend/top?year=${year}&topN=${topN}`, {
    method: "GET"
  });
}

// Get trend history for a specific major
export async function getMajorTrendHistory(majorCode: string): Promise<Trend[]> {
  return await fetchData<Trend[]>(`/api/Trend/major/${majorCode}`, {
    method: "GET"
  });
}

// Predict future trends (mock data for now)
export async function predictFutureTrends(_majorCode: string, years: number = 5): Promise<{
  year: number;
  predictedQuota: number;
  predictedGrowthRate: number;
  confidence: number;
}[]> {
  // This would typically call a prediction API
  // For now, we'll generate mock prediction data
  const currentYear = new Date().getFullYear();
  const predictions = [];
  
  for (let i = 1; i <= years; i++) {
    predictions.push({
      year: currentYear + i,
      predictedQuota: Math.floor(Math.random() * 5000) + 2000,
      predictedGrowthRate: (Math.random() * 20) - 5, // -5% to 15%
      confidence: Math.random() * 0.3 + 0.7 // 70% to 100%
    });
  }
  
  return predictions;
}

// Get trend analysis insights
export async function getTrendAnalysis(_majorCode: string): Promise<{
  strengths: string[];
  challenges: string[];
  opportunities: string[];
  marketFactors: string[];
}> {
  // This would typically call an analysis API
  // For now, we'll return mock analysis data based on major code
  console.log(`Getting analysis for major: ${_majorCode}`);
  return {
    strengths: [
      "Nhu cầu thị trường cao",
      "Mức lương cạnh tranh",
      "Cơ hội nghề nghiệp đa dạng"
    ],
    challenges: [
      "Cạnh tranh nhân lực gay gắt",
      "Yêu cầu kỹ năng cao",
      "Cần cập nhật kiến thức liên tục"
    ],
    opportunities: [
      "Chuyển đổi số toàn cầu",
      "Phát triển công nghệ mới",
      "Hỗ trợ chính phủ"
    ],
    marketFactors: [
      "Đầu tư FDI tăng cao",
      "Phát triển công nghiệp 4.0",
      "Nhu cầu từ doanh nghiệp startup"
    ]
  };
}
