import type { Trend } from "../../model/TrendModel";

export default function TopMajorsTable({ items }: { items: Trend[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Major</th>
          <th>TotalQuota</th>
          <th>GrowthRate (%)</th>
        </tr>
      </thead>
      <tbody>
        {items.map((it, idx) => (
          <tr key={it.trendCode ?? idx}>
            <td>{it.rankOrder ?? idx+1}</td>
            <td>{it.majorName ?? it.majorCode}</td>
            <td>{it.totalQuota}</td>
            <td>{it.growthRate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
