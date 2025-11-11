import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lightbulb, X } from "lucide-react";
import { getAllUsers, registerUser } from "../../services/userService";
import type { User } from "../../model/UserModel";

export default function Register() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userCode: "",
    role: "Student"
  });
  const [err, setErr] = useState<React.ReactNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleInputChange(field: string, value: string) {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  // Function to generate suggested userCode
  async function generateSuggestedUserCode(): Promise<string> {
    try {
      const users = await getAllUsers();
      
      // Find the highest numbered userCode
      let maxNumber = 0;
      users.forEach((user: User) => {
        if (user.userCode) {
          const numberPart = user.userCode.replace(/\D/g, '');
          const number = parseInt(numberPart);
          if (!isNaN(number) && number > maxNumber) {
            maxNumber = number;
          }
        }
      });
      
      // Generate next userCode
      const nextNumber = maxNumber + 1;
      return `USR${nextNumber.toString().padStart(3, '0')}`;
      
    } catch (error) {
      console.error("Error generating userCode:", error);
      return "USR001"; // Default fallback
    }
  }

  // Function to validate userCode
  async function validateUserCode(userCode: string): Promise<{ isValid: boolean; latestUserCode?: string; message?: React.ReactNode }> {
    if (!userCode.trim()) {
      return { isValid: false, message: "Vui lòng nhập mã số" };
    }

    try {
      console.log("Checking userCode:", userCode);
      const users = await getAllUsers();
      
      // Check if userCode already exists
      const existingUser = users.find((user: User) => 
        user.userCode?.toLowerCase() === userCode.toLowerCase()
      );
      
      if (existingUser) {
        // Generate suggested userCode
        const suggestedUserCode = await generateSuggestedUserCode();
        
        return { 
          isValid: false, 
          latestUserCode: suggestedUserCode,
          message: <><X size={16} style={{display: 'inline', marginRight: '8px'}} />Mã số "{userCode}" đã được đăng ký. Gợi ý mã mới: {suggestedUserCode}</>
        };
      }
      
      return { isValid: true };
      
    } catch (error) {
      console.error("Error validating userCode:", error);
      return { 
        isValid: false, 
        message: "Không thể kiểm tra mã số. Vui lòng thử lại." 
      };
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    
    try {
      // Validate input fields
      if (!formData.fullName.trim()) {
        setErr("Vui lòng nhập họ và tên");
        return;
      }
      
      if (!formData.email.trim()) {
        setErr("Vui lòng nhập email");
        return;
      }
      
      if (!formData.password.trim()) {
        setErr("Vui lòng nhập mật khẩu");
        return;
      }
      
      if (!formData.confirmPassword.trim()) {
        setErr("Vui lòng xác nhận mật khẩu");
        return;
      }
      
      if (!formData.userCode.trim()) {
        setErr("Vui lòng nhập mã số");
        return;
      }
      
      // Validate userCode uniqueness
      console.log("Validating userCode...");
      const userCodeValidation = await validateUserCode(formData.userCode);
      if (!userCodeValidation.isValid) {
        setErr(userCodeValidation.message || "Mã số không hợp lệ");
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErr("Email không đúng định dạng");
        return;
      }
      
      // Check if email already exists
      console.log("Checking email uniqueness...");
      try {
        const users = await getAllUsers();
        const existingEmailUser = users.find((user: User) => 
          user.email?.toLowerCase() === formData.email.toLowerCase()
        );
        
        if (existingEmailUser) {
          setErr(`Email "${formData.email}" đã được đăng ký. Vui lòng sử dụng email khác.`);
          return;
        }
      } catch (error) {
        console.error("Error checking email:", error);
        setErr("Không thể kiểm tra email. Vui lòng thử lại.");
        return;
      }
      
      // Validate password length
      if (formData.password.length < 6) {
        setErr("Mật khẩu phải có ít nhất 6 ký tự");
        return;
      }
      
      // Validate password confirmation
      if (formData.password !== formData.confirmPassword) {
        setErr("Mật khẩu xác nhận không khớp");
        return;
      }
      
      console.log("Attempting registration with:", {
        ...formData,
        password: "***",
        confirmPassword: "***"
      });
      
      // Call registration API to create the user in backend
      try {
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          userCode: formData.userCode,
          role: formData.role
        };

        console.log('Calling registerUser with payload:', payload);
        const created = await registerUser(payload);
        console.log('User created:', created);
      } catch (apiErr) {
        console.error('API registration error:', apiErr);
        // Surface API error to user
        if (apiErr instanceof Error) {
          setErr(<><X size={16} style={{display: 'inline', marginRight: '8px'}} />{apiErr.message}</>);
        } else {
          setErr(<><X size={16} style={{display: 'inline', marginRight: '8px'}} />Đăng ký thất bại. Vui lòng thử lại sau.</>);
        }
        return;
      }
      
      console.log("Registration successful");
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      nav("/login");
      
    } catch (e: unknown) {
      console.error("Registration error details:", e);
      
      if (e instanceof Error) {
        setErr(<><X size={16} style={{display: 'inline', marginRight: '8px'}} />{e.message}</>);
      } else {
        setErr(<><X size={16} style={{display: 'inline', marginRight: '8px'}} />Đăng ký thất bại - kiểm tra console để biết chi tiết</>);
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
   
      {/* Register Card */}
      <div style={{
        background: "rgba(42, 82, 152, 0.1)",
        backdropFilter: "blur(20px)",
        borderRadius: 20,
        padding: "50px 40px",
        width: "100%",
        maxWidth: 500,
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
            Đăng ký
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "1.1rem",
            margin: 0,
            lineHeight: 1.4
          }}>
            Tạo tài khoản mới để truy cập CareerTrend
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} style={{ position: "relative", zIndex: 2 }}>
          {/* Full Name Field */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: 8,
              opacity: 0.9
            }}>
              Họ và tên *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={e => handleInputChange('fullName', e.target.value)}
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
              placeholder="Nhập họ và tên"
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

          {/* User Code Field */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: 8,
              opacity: 0.9
            }}>
              Mã số *
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={formData.userCode}
                onChange={e => handleInputChange('userCode', e.target.value)}
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
                placeholder="Nhập mã số(VD: USR001)"
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
                onClick={async () => {
                  const suggested = await generateSuggestedUserCode();
                  handleInputChange('userCode', suggested);
                }}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(42, 82, 152, 0.2)",
                  border: "1px solid rgba(42, 82, 152, 0.3)",
                  borderRadius: 8,
                  color: "white",
                  padding: "6px 12px",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(42, 82, 152, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(42, 82, 152, 0.2)";
                }}
              >
                <Lightbulb size={16} style={{ marginRight: 6 }} />
                Gợi ý
              </button>
            </div>
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: 20 }}>
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
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
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

          {/* Role Selection */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: 8,
              opacity: 0.9
            }}>
              Vai trò
            </label>
            <select
              value={formData.role}
              onChange={e => handleInputChange('role', e.target.value)}
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
              onFocus={(e) => {
                e.target.style.border = "1px solid rgba(42, 82, 152, 0.5)";
                e.target.style.background = "rgba(42, 82, 152, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid rgba(42, 82, 152, 0.3)";
                e.target.style.background = "rgba(42, 82, 152, 0.1)";
              }}
            >
              <option value="User" style={{ background: "#16213e", color: "white" }}>Người dùng</option>
              <option value="Admin" style={{ background: "#16213e", color: "white" }}>Quản trị viên</option>
            </select>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: 20 }}>
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
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
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
                placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
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
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.background = "none";
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: 25 }}>
            <label style={{
              display: "block",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: 8,
              opacity: 0.9
            }}>
              Xác nhận mật khẩu *
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={e => handleInputChange('confirmPassword', e.target.value)}
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
                placeholder="Nhập lại mật khẩu"
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.background = "none";
                }}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                Đang đăng ký...
              </span>
            ) : (
              "Đăng ký"
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
            Đã có tài khoản?{" "}
            <Link 
              to="/login" 
              style={{
                color: "white",
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              Đăng nhập ngay
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
          
          input::placeholder, select::placeholder {
            color: rgba(42, 82, 152, 0.6);
          }
          
          select option {
            background: #16213e;
            color: white;
          }
        `}
      </style>
    </div>
  );
}
