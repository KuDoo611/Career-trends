import { useEffect, useState } from "react";
import fetchData from "../api/fetchData";

export function useFetchData<T = unknown>(path: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!path);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    if (!path) return;
    let active = true;
    setLoading(true);
    setError(null);
    fetchData<T>(path)
      .then(d => { if (active) setData(d); })
      .catch(e => { if (active) setError(e); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [path]);

  return { data, loading, error };
}
