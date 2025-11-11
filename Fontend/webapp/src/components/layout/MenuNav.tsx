
import { Link, useNavigate } from "react-router-dom";
import { Home, BarChart, TrendingUp, School, LogOut, User } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function TopNav() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav style={{
      position: "fixed",
      left: 0,
      top: 0,
      height: "100vh",
      width: "280px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      backdropFilter: "blur(10px)",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      zIndex: 1000,
      boxShadow: "2px 0 20px rgba(0,0,0,0.1)"
    }}>
      {/* Brand Logo */}
      <div style={{
        marginBottom: "40px",
        paddingBottom: "20px",
        borderBottom: "1px solid rgba(255,255,255,0.2)"
      }}>
        <Link 
          to="/dashboard" 
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "1.8rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <BarChart size={28} />
          CareerTrend
        </Link>
      </div>

      {/* Navigation Menu */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <NavLink to="/dashboard" icon={<Home size={20} />} text="Dashboard" />
        <NavLink to="/universities" icon={<School size={20} />} text="Universities" />
        <NavLink to="/trend" icon={<TrendingUp size={20} />} text="Trends" />
      </div>

      {/* User Section */}
      <div style={{
        marginTop: "auto",
        paddingTop: "20px",
        borderTop: "1px solid rgba(255,255,255,0.2)"
      }}>
        {user ? (
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              marginBottom: "12px"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white"
              }}>
                <User size={20} />
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>
                  {user.fullName ?? user.email}
                </div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>
                  {user.role}
                </div>
              </div>
            </div>
            <button 
              onClick={() => { logout(); nav("/login"); }}
              style={{
                width: "100%",
                padding: "12px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: "white",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/login"
            style={{
              display: "block",
              padding: "12px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
              fontSize: "0.9rem",
              fontWeight: 500,
              transition: "all 0.3s ease"
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

// Navigation Link Component
function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        color: "white",
        textDecoration: "none",
        borderRadius: "8px",
        transition: "all 0.3s ease",
        fontSize: "0.95rem",
        fontWeight: 500
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        e.currentTarget.style.transform = "translateX(4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      {icon}
      {text}
    </Link>
  );
}
