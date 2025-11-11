import { useContext } from "react";
import { AuthContext } from "../context/authContextBase";
export default function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải được sử dụng trong AuthProvider");
  return ctx;
}
