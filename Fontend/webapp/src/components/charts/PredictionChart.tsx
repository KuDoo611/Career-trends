import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PredictionData {
  year: number;
  predictedQuota: number;
  predictedGrowthRate: number;
  confidence: number;
}

interface PredictionChartProps {
  predictions: PredictionData[];
  majorName: string;
}

export default function PredictionChart({ predictions, majorName }: PredictionChartProps) {
  const chartData = {
    labels: predictions.map(p => p.year.toString()),
    datasets: [
      {
        label: 'Dự báo chỉ tiêu',
        data: predictions.map(p => p.predictedQuota),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        yAxisID: 'y'
      },
      {
        label: 'Tỷ lệ tăng trưởng (%)',
        data: predictions.map(p => p.predictedGrowthRate),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        yAxisID: 'y1'
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
        text: `Dự báo xu hướng 3-5 năm tới - ${majorName}`,
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
            const prediction = predictions[index];
            return `Độ tin cậy: ${(prediction.confidence * 100).toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(255,255,255,0.1)'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        ticks: {
          color: 'white',
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(255,255,255,0.1)'
        },
        title: {
          display: true,
          text: 'Chỉ tiêu tuyển sinh',
          color: 'white'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        ticks: {
          color: 'white',
          font: {
            size: 12
          }
        },
        grid: {
          drawOnChartArea: false
        },
        title: {
          display: true,
          text: 'Tỷ lệ tăng trưởng (%)',
          color: 'white'
        }
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
      boxShadow: "0 25px 45px rgba(0,0,0,0.1)",
      height: 450
    }}>
      <Line data={chartData} options={chartOptions} />
      
      {/* Confidence indicators */}
      <div style={{
        marginTop: 15,
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap'
      }}>
        {predictions.map((pred) => (
          <div key={pred.year} style={{
            padding: '5px 10px',
            borderRadius: 6,
            background: `rgba(255,255,255,${pred.confidence * 0.2})`,
            border: '1px solid rgba(255,255,255,0.3)',
            fontSize: '12px',
            color: 'white'
          }}>
            {pred.year}: {(pred.confidence * 100).toFixed(0)}% tin cậy
          </div>
        ))}
      </div>
    </div>
  );
}