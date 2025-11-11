import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Eye, EyeOff, X, Wrench, Globe, Flame, Search } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getPostLoginPath } from "../../utils/loginRedirect";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState<React.ReactNode | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    
    try {
      console.log("Attempting login with:", { email, password: "***" });
      
      // Validate input fields
      if (!email.trim()) {
        setErr("Vui lòng nhập email");
        return;
      }
      
      if (!password.trim()) {
        setErr("Vui lòng nhập mật khẩu");
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErr("Email không đúng định dạng");
        return;
      }
      
      // Validate password length
      if (password.length < 6) {
        setErr("Mật khẩu phải có ít nhất 6 ký tự");
        return;
      }
      
      console.log("Calling login function...");
      console.log("Login data being sent:", { 
        email: email.trim(), 
        password: `[${password.length} chars]`,
        passwordPreview: password.substring(0, 3) + "***"
      });
      
  const authenticatedUser = await login(email, password);

  const locationState = location.state as { from?: string } | null;
  const targetPath = locationState?.from || getPostLoginPath(authenticatedUser, { fallback: "/" });

  console.log("Login successful, navigating to", targetPath);
  nav(targetPath, { replace: true });
      
    } catch (e: unknown) {
      console.error("Login error details:", e);
      
      if (e instanceof Error) {
        console.error("Error message:", e.message);
        
        // Customize error messages in Vietnamese
        if (e.message.includes('Email hoặc mật khẩu không đúng')) {
          setErr(<><X size={16} style={{display: 'inline', marginRight: '8px'}} />Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại thông tin đăng nhập.</>);
        } else if (e.message.includes('Tài khoản không tồn tại')) {
          setErr(<><X size={16} style={{display: 'inline', marginRight: '8px'}} />Tài khoản không tồn tại trong hệ thống. Vui lòng kiểm tra lại email.</>);
        } else if (e.message.includes('Vui lòng nhập mật khẩu')) {
          setErr(<><X size={16} style={{display: 'inline', marginRight: '8px'}} />Vui lòng nhập mật khẩu</>);
        } else if (e.message.includes('Vui lòng nhập email')) {
          setErr(<><X size={16} style={{display: 'inline', marginRight: '8px'}} />Vui lòng nhập email</>);
        } else if (e.message.includes('CORS')) {
          setErr(<><Wrench size={16} style={{display: 'inline', marginRight: '8px'}} />Lỗi CORS: Backend API cần cấu hình CORS</>);
        } else if (e.message.includes('Network error') || e.message.includes('fetch')) {
          setErr(<><Globe size={16} style={{display: 'inline', marginRight: '8px'}} />Lỗi kết nối: Không thể kết nối tới server</>);
        } else if (e.message.includes('500')) {
          setErr(<><Flame size={16} style={{display: 'inline', marginRight: '8px'}} />Lỗi server (500): Có vấn đề với backend API</>);
        } else if (e.message.includes('404')) {
          setErr(<><Search size={16} style={{display: 'inline', marginRight: '8px'}} />Lỗi 404: Không tìm thấy API endpoint</>);
        } else {
          setErr(<><X size={16} style={{display: 'inline', marginRight: '8px'}} />{e.message}</>);
        }
      } else {
        console.error("Unknown error:", e);
        setErr(<><X size={16} style={{display: 'inline', marginRight: '8px'}} />Đăng nhập thất bại - kiểm tra console để biết chi tiết</>);
      }
    } finally { 
      setLoading(false); 
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative"
    }}>
     
      {/* Login Card */}
      <div style={{
        background: "rgba(42, 82, 152, 0.1)",
        backdropFilter: "blur(20px)",
        borderRadius: 20,
        padding: "50px 40px",
        width: "100%",
        maxWidth: 450,
        border: "1px solid rgba(42, 82, 152, 0.2)",
        boxShadow: "0 25px 45px rgba(0,0,0,0.1)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 100,
          height: 100,
          background: "rgba(42, 82, 152, 0.1)",
          borderRadius: "50%",
          filter: "blur(40px)"
        }} />
        
        <div style={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 80,
          height: 80,
          background: "rgba(42, 82, 152, 0.05)",
          borderRadius: "50%",
          filter: "blur(30px)"
        }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{
            color: "white",
            fontSize: "2.5rem",
            fontWeight: 700,
            margin: "0 0 10px 0",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)"
          }}>
            Đăng nhập 
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "1.1rem",
            margin: 0,
            lineHeight: 1.4
          }}>
            Đăng nhập để truy cập bảng điều khiển CareerTrend của bạn
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} style={{ position: "relative", zIndex: 2 }}>
          {/* Email Field */}
          <div style={{ marginBottom: 25 }}>
            <label style={{
              display: "block",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: 8,
              opacity: 0.9
            }}>
              Email * 
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "15px 20px",
                borderRadius: 12,
                border: "1px solid rgba(42, 82, 152, 0.3)",
                background: "rgba(42, 82, 152, 0.1)",
                backdropFilter: "blur(10px)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box"
              }}
              placeholder="Nhập email"
              onFocus={(e) => {
                e.target.style.border = "1px solid rgba(42, 82, 152, 0.5)";
                e.target.style.background = "rgba(42, 82, 152, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid rgba(42, 82, 152, 0.3)";
                e.target.style.background = "rgba(42, 82, 152, 0.1)";
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: 30 }}>
            <label style={{
              display: "block",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: 8,
              opacity: 0.9
            }}>
              Mật khẩu *
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "15px 20px",
                  paddingRight: "50px",
                  borderRadius: 12,
                  border: "1px solid rgba(42, 82, 152, 0.3)",
                  background: "rgba(42, 82, 152, 0.1)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box"
                }}
                placeholder="Nhập mật khẩu"
                onFocus={(e) => {
                  e.target.style.border = "1px solid rgba(42, 82, 152, 0.5)";
                  e.target.style.background = "rgba(42, 82, 152, 0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(42, 82, 152, 0.3)";
                  e.target.style.background = "rgba(42, 82, 152, 0.1)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  padding: "5px",
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(42, 82, 152, 0.6)";
                  e.currentTarget.style.background = "none";
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {err && (
            <div style={{
              background: "rgba(255,99,99,0.2)",
              border: "1px solid rgba(255,99,99,0.4)",
              borderRadius: 8,
              padding: "12px 16px",
              marginBottom: 20,
              color: "#ffcccc",
              fontSize: "0.95rem",
              textAlign: "center"
            }}>
              {err}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px 20px",
              borderRadius: 12,
              border: "none",
              background: loading 
                ? "rgba(42, 82, 152, 0.1)" 
                : "linear-gradient(135deg, rgba(42, 82, 152, 0.3) 0%, rgba(42, 82, 152, 0.2) 100%)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              opacity: loading ? 0.7 : 1,
              boxShadow: loading ? "none" : "0 8px 20px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(42, 82, 152, 0.4) 0%, rgba(42, 82, 152, 0.3) 100%)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(42, 82, 152, 0.3) 0%, rgba(42, 82, 152, 0.2) 100%)";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <div style={{
                  width: 20,
                  height: 20,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                Đăng nhập thành công...
              </span>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div style={{
          textAlign: "center",
          marginTop: 30,
          paddingTop: 20,
          borderTop: "1px solid rgba(42, 82, 152, 0.1)"
        }}>
          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.95rem",
            margin: 0
          }}>
            Chưa có tài khoản?{" "}
            <Link 
              to="/register" 
              style={{
                color: "white",
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>

      {/* Loading Animation Keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          input::placeholder {
            color: rgba(42, 82, 152, 0.6);
          }
        `}
      </style>
    </div>
  );
}
