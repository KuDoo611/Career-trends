import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import HomePage from "./pages/Users/HomePageUser";
import Dashboard from "./pages/Users/Dashboard";
import Universities from "./pages/Users/Universities";
import Majors from "./pages/Admin/Majors";
import CreateMajor from "./pages/Admin/CreateMajor";
import MajorSearch from "./pages/Users/MajorSearch";
import Profile from "./pages/Users/Profile";
import Admission from "./pages/Users/Admission";
import Trend from "./pages/Users/Trend";
import MarketAnalysisAdmin from "./pages/Admin/MarketAnalysisAdmin";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import RequireAdmin from "./utils/RequireAdmin";

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isDashboardPage = location.pathname === "/dashboard";
  const hideTopNav = isHomePage || isLoginPage || isRegisterPage || isDashboardPage;

  return (
    <div style={{ minHeight: "100vh" }}>
      <main style={{ padding: hideTopNav ? 0 : 20 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Users/HomePageUser" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/major-search" element={<MajorSearch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/majors" element={
            <RequireAdmin><Majors /></RequireAdmin>
          } />
          <Route path="/admission/:year" element={<Admission />} />
          <Route path="/trend" element={<Trend />} />
          <Route path="/admin/majors" element={
            <RequireAdmin><Majors /></RequireAdmin>
          } />
          <Route path="/admin/majors/create" element={
            <RequireAdmin><CreateMajor /></RequireAdmin>
          } />
          <Route path="/admin/HomeAdmin" element={
            <RequireAdmin><HomeAdmin /></RequireAdmin>
          } />
          <Route path="/admin/market-analysis" element={
            <RequireAdmin><MarketAnalysisAdmin /></RequireAdmin>
          } />
          <Route path="/admin/market-analysis/new" element={
            <RequireAdmin><MarketAnalysisAdmin /></RequireAdmin>
          } />
          <Route path="/admin/market-analysis/:code/edit" element={
            <RequireAdmin><MarketAnalysisAdmin /></RequireAdmin>
          } />
        </Routes>
      </main>
    </div>
  );
}
