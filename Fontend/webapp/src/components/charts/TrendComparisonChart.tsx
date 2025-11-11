/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { TrendingUp, TrendingDown, BarChart3, Eye, EyeOff, Info } from "lucide-react";
import type { TrendAnalysis } from "../../model/AdmissionModel";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TrendComparisonChartProps {
  increasing: TrendAnalysis[];
  decreasing: TrendAnalysis[];
}

export default function TrendComparisonChart({ increasing, decreasing }: TrendComparisonChartProps) {
  const [showIncreasing, setShowIncreasing] = useState(true);
  const [showDecreasing, setShowDecreasing] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  if (!increasing.length && !decreasing.length) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <BarChart3 size={48} color="rgba(255, 255, 255, 0.5)" />
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem', margin: '16px 0 0 0' }}>
          Không có dữ liệu xu hướng
        </p>
      </div>
    );
  }

  // Chuẩn bị dữ liệu cho biểu đồ
  const labels = ['2023', '2024', '2025'];

  const datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    borderWidth: number;
    pointRadius: number;
    pointHoverRadius: number;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointBorderWidth: number;
  }> = [];

  // Dataset cho ngành tăng
  if (showIncreasing && increasing.length > 0) {
    // Màu sắc đa dạng cho các ngành tăng
    const increasingColors = [
      '#22c55e', // Xanh lá sáng
      '#3b82f6', // Xanh dương
      '#f59e0b', // Vàng cam
      '#8b5cf6', // Tím
      '#ec4899', // Hồng
      '#06b6d4', // Xanh ngọc
      '#84cc16', // Xanh lá vàng
      '#f97316', // Cam
      '#6366f1', // Indigo
      '#14b8a6', // Teal
      '#eab308', // Vàng
      '#a855f7', // Violet
      '#f43f5e', // Rose
      '#0ea5e9', // Sky blue
      '#65a30d', // Lime
      '#ea580c', // Orange
      '#7c3aed', // Purple
      '#0891b2', // Cyan
      '#16a34a', // Green
      '#dc2626'  // Red
    ];

    increasing.forEach((trend, index) => {
      const color = increasingColors[index % increasingColors.length];

      const quota2023 = Math.round(trend.totalQuota2025 / (1 + trend.totalChange / 100));
      const quota2024 = Math.round(quota2023 * (1 + trend.trend2024 / 100));
      const quota2025 = trend.totalQuota2025;

      datasets.push({
        label: `↗️ ${trend.majorName}`,
        data: [quota2023, quota2024, quota2025],
        borderColor: color,
        backgroundColor: color + '20',
        tension: 0.4,
        borderWidth: 4,
        pointRadius: 7,
        pointHoverRadius: 10,
        pointBackgroundColor: color,
        pointBorderColor: 'white',
        pointBorderWidth: 3,
      });
    });
  }

  // Dataset cho ngành giảm
  if (showDecreasing && decreasing.length > 0) {
    // Màu sắc đa dạng cho các ngành giảm
    const decreasingColors = [
      '#ef4444', // Đỏ
      '#7c2d12', // Đỏ nâu
      '#dc2626', // Đỏ tươi
      '#b91c1c', // Đỏ đậm
      '#991b1b', // Đỏ tối
      '#7f1d1d', // Burgundy
      '#9a3412', // Brown
      '#c2410c', // Orange red
      '#ea580c', // Orange
      '#d97706', // Amber
      '#92400e', // Yellow brown
      '#78350f', // Dark brown
      '#9f1239', // Maroon
      '#be123c', // Crimson
      '#dc2626', // Red repeat for more variety
      '#b91c1c', // Dark red
      '#991b1b', // Very dark red
      '#7f1d1d', // Deep red
      '#450a0a', // Very deep red
      '#2d1b69'  // Dark purple for contrast
    ];

    decreasing.forEach((trend, index) => {
      const color = decreasingColors[index % decreasingColors.length];

      const quota2023 = Math.round(trend.totalQuota2025 / (1 + trend.totalChange / 100));
      const quota2024 = Math.round(quota2023 * (1 + trend.trend2024 / 100));
      const quota2025 = trend.totalQuota2025;

      datasets.push({
        label: `↘️ ${trend.majorName}`,
        data: [quota2023, quota2024, quota2025],
        borderColor: color,
        backgroundColor: color + '20',
        tension: 0.4,
        borderWidth: 4,
        pointRadius: 7,
        pointHoverRadius: 10,
        pointBackgroundColor: color,
        pointBorderColor: 'white',
        pointBorderWidth: 3,
      });
    });
  }

  const data = {
    labels,
    datasets
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Xu Hướng Chỉ Tiêu Tuyển Sinh Theo Ngành (2023-2025)',
        font: {
          size: 16,
          weight: 'bold' as const,
          family: 'Inter, system-ui, sans-serif'
        },
        color: 'white',
        padding: 20
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif'
          },
          color: 'rgba(255, 255, 255, 0.8)',
          filter: (legendItem: { text: string }) => {
            // Only show legend items for visible datasets
            return (legendItem.text.includes('↗️') && showIncreasing) ||
                   (legendItem.text.includes('↘️') && showDecreasing);
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 12
        },
        callbacks: {
          title: function(tooltipItems: any[]) {
            return `Năm ${tooltipItems[0].label}`;
          },
          label: function(tooltipItem: any) {
            const label = tooltipItem.dataset.label || '';
            const value = tooltipItem.parsed.y;
            return `${label.replace(/↗️|↘️/g, '').trim()}: ${value.toLocaleString()} chỉ tiêu`;
          },
          afterLabel: function(tooltipItem: any) {
            const dataIndex = tooltipItem.dataIndex;
            const currentValue = tooltipItem.parsed.y;
            const prevValue = dataIndex > 0 ? tooltipItem.dataset.data[dataIndex - 1] : currentValue;
            const change = ((currentValue - prevValue) / prevValue * 100).toFixed(1);
            if (dataIndex > 0) {
              return `Thay đổi: ${change}% so với năm trước`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Năm',
          font: {
            weight: 'bold' as const,
            size: 12
          },
          color: 'rgba(255, 255, 255, 0.8)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Chỉ tiêu tuyển sinh',
          font: {
            weight: 'bold' as const,
            size: 12
          },
          color: 'rgba(255, 255, 255, 0.8)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          callback: function(value: string | number) {
            return Number(value).toLocaleString();
          }
        }
      }
    },
    elements: {
      point: {
        hoverBorderWidth: 3
      }
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      backdropFilter: 'blur(20px)',
      borderRadius: 20,
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
        pointerEvents: 'none'
      }} />

      {/* Header with expand/collapse */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BarChart3 size={24} color="white" />
          <h3 style={{
            color: 'white',
            fontSize: '1.3rem',
            fontWeight: '600',
            margin: 0
          }}>
            Biểu đồ xu hướng
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isExpanded ? <EyeOff size={14} /> : <Eye size={14} />}
            {isExpanded ? 'Thu gọn' : 'Mở rộng'}
          </button>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1
      }}>
        <button
          onClick={() => setShowIncreasing(!showIncreasing)}
          onMouseEnter={() => setHoveredButton('increasing')}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            padding: '10px 16px',
            borderRadius: 12,
            border: showIncreasing ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.2)',
            background: showIncreasing
              ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.2) 100%)'
              : 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: showIncreasing ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none',
            transform: hoveredButton === 'increasing' ? 'translateY(-2px)' : 'translateY(0)'
          }}
        >
          <TrendingUp size={16} />
          Ngành tăng ({increasing.length})
        </button>
        <button
          onClick={() => setShowDecreasing(!showDecreasing)}
          onMouseEnter={() => setHoveredButton('decreasing')}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            padding: '10px 16px',
            borderRadius: 12,
            border: showDecreasing ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
            background: showDecreasing
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(239, 68, 68, 0.2) 100%)'
              : 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: showDecreasing ? '0 4px 12px rgba(239, 68, 68, 0.3)' : 'none',
            transform: hoveredButton === 'decreasing' ? 'translateY(-2px)' : 'translateY(0)'
          }}
        >
          <TrendingDown size={16} />
          Ngành giảm ({decreasing.length})
        </button>
      </div>

      {/* Chart Container */}
      <div style={{
        height: isExpanded ? '500px' : '400px',
        transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        zIndex: 1
      }}>
        <Line data={data} options={options} />
      </div>

      {/* Info tooltip */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: '11px',
        color: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backdropFilter: 'blur(10px)'
      }}>
        <Info size={12} />
        Di chuột để xem chi tiết
      </div>

      {/* Bottom accent */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #3b82f6 0%, #9333ea 50%, #10b981 100%)',
        borderRadius: '0 0 20px 20px'
      }} />
    </div>
  );
}