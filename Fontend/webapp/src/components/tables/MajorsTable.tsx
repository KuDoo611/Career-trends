
import {type  Major } from "../../model/MajorModel";

export default function MajorsTable({ items }: { items: Major[] | null }) {
  if (!items) return null;
  return (
    <table className="table">
      <thead><tr><th>Code</th><th>Major</th><th>Field</th></tr></thead>
      <tbody>
        {items.map(m => (
          <tr key={m.majorCode}>
            <td>{m.majorCode}</td>
            <td>{m.majorName}</td>
            <td>{m.field}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
