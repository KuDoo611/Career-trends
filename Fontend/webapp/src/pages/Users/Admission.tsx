import { useParams } from "react-router-dom";

export default function Admission() {
  const { year } = useParams();
  return (
    <div>
      <h2>Admission {year}</h2>
      <p>Admission details for the year {year} will be shown here.</p>
    </div>
  );
}
