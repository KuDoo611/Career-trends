
import {type University } from "../../model/UniversityModel";

export default function UniversitiesTable({ items }: { items: University[] | null }) {
  if (!items) return null;
  return (
    <table className="table">
      <thead><tr><th>Code</th><th>Name</th><th>Region</th></tr></thead>
      <tbody>
        {items.map(u => (
          <tr key={u.universityCode}>
            <td>{u.universityCode}</td>
            <td>{u.universityName}</td>
            <td>{u.region}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
