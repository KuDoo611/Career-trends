import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TrendingUp, BarChart, Users, Target } from "lucide-react";
import type { Trend } from "../../model/TrendModel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TrendAnalysisChartProps {
  trends: Trend[];
  selectedMajor?: string;
  onMajorSelect: (majorCode: string) => void;
}

export default function TrendAnalysisChart({ 
  trends, 
  selectedMajor, 
  onMajorSelect 
}: TrendAnalysisChartProps) {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [viewMode, setViewMode] = useState<'quota' | 'growth'>('quota');

  const chartData = {
    labels: trends.map(t => t.majorName || t.majorCode),
    datasets: [
      {
        label: viewMode === 'quota' ? 'Chỉ tiêu tuyển sinh' : 'Tỷ lệ tăng trưởng (%)',
        data: viewMode === 'quota' 
          ? trends.map(t => t.totalQuota || 0)
          : trends.map(t => t.growthRate || 0),
        backgroundColor: trends.map((_, index) => 
          `rgba(${102 + index * 20}, ${126 + index * 15}, ${234 - index * 10}, 0.6)`
        ),
        borderColor: trends.map((_, index) => 
          `rgba(${102 + index * 20}, ${126 + index * 15}, ${234 - index * 10}, 1)`
        ),
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold' as const
          }
        }
      },
      title: {
        display: true,
        text: viewMode === 'quota' 
          ? 'Xu hướng chỉ tiêu tuyển sinh theo ngành' 
          : 'Tỷ lệ tăng trưởng theo ngành',
        color: 'white',
        font: {
          size: 18,
          weight: 'bold' as const
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 1,
        callbacks: {
          afterBody: (context: unknown[]) => {
            const index = (context[0] as { dataIndex: number }).dataIndex;
            const trend = trends[index];
            return [
              `Mã ngành: ${trend.majorCode}`,
              `Thứ hạng: #${trend.rankOrder}`,
              `Năm: ${trend.year}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          maxRotation: 45,
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(255,255,255,0.1)'
        }
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(255,255,255,0.1)'
        }
      }
    },
    onClick: (_event: unknown, elements: unknown[]) => {
      if (elements.length > 0) {
        const index = (elements[0] as { index: number }).index;
        const trend = trends[index];
        onMajorSelect(trend.majorCode);
      }
    }
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: 20,
      padding: 30,
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 25px 45px rgba(0,0,0,0.1)"
    }}>
      {/* Chart Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        flexWrap: 'wrap',
        gap: 15
      }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setChartType('line')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: chartType === 'line' 
                ? 'rgba(255,255,255,0.3)' 
                : 'rgba(255,255,255,0.1)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: chartType === 'line' ? '600' : '400',
              transition: 'all 0.3s ease'
            }}
          >
            <TrendingUp size={16} style={{ marginRight: 6 }} /> Biểu đồ đường
          </button>
          <button
            onClick={() => setChartType('bar')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: chartType === 'bar' 
                ? 'rgba(255,255,255,0.3)' 
                : 'rgba(255,255,255,0.1)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: chartType === 'bar' ? '600' : '400',
              transition: 'all 0.3s ease'
            }}
          >
            <BarChart size={16} style={{ marginRight: 6 }} /> Biểu đồ cột
          </button>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setViewMode('quota')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: viewMode === 'quota' 
                ? 'rgba(255,255,255,0.3)' 
                : 'rgba(255,255,255,0.1)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: viewMode === 'quota' ? '600' : '400',
              transition: 'all 0.3s ease'
            }}
          >
            <Users size={16} style={{ marginRight: 6 }} /> Chỉ tiêu
          </button>
          <button
            onClick={() => setViewMode('growth')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: viewMode === 'growth' 
                ? 'rgba(255,255,255,0.3)' 
                : 'rgba(255,255,255,0.1)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: viewMode === 'growth' ? '600' : '400',
              transition: 'all 0.3s ease'
            }}
          >
            <TrendingUp size={16} style={{ marginRight: 6 }} /> Tăng trưởng
          </button>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 400, position: 'relative' }}>
        {chartType === 'line' ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>

      {/* Selected Major Info */}
      {selectedMajor && (
        <div style={{
          marginTop: 20,
          padding: 15,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h4 style={{ color: 'white', margin: 0, marginBottom: 10 }}>
            <Target size={18} style={{ marginRight: 8 }} /> Ngành được chọn: {trends.find(t => t.majorCode === selectedMajor)?.majorName}
          </h4>
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '14px' }}>
            Click vào biểu đồ để xem chi tiết dự báo và phân tích
          </p>
        </div>
      )}
    </div>
  );
}