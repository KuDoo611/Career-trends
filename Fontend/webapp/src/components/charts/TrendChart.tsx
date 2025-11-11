import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getTotalQuota } from "../../services/trendService";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TrendChart({ majorCode }: { majorCode: string }) {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!majorCode) return;
    setLoading(true);
    getTotalQuota(majorCode)
      .then((arr: { period: string; value: number }[]) => {
        setLabels(arr.map(x => x.period));
        setValues(arr.map(x => x.value));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [majorCode]);

  if (loading) return <div>Loading chart...</div>;

  const data = {
    labels,
    datasets: [{ label: "Quota", data: values, tension: 0.3 }]
  };

  return <div style={{ maxWidth: 800 }}><Line data={data} /></div>;
}
