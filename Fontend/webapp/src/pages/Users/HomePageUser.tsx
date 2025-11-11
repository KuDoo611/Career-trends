import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User as UserIcon, Flame, BookOpen, GraduationCap, Rocket, Lightbulb, TrendingUp, Target, Brain, LogOut, Search, School, BarChart, Settings, Trophy, Medal, Hash } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useFetchData } from "../../hooks/useFetchData";
import type { Trend } from "../../model/TrendModel";
import type { User } from "../../model/UserModel";

export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch data for dashboard overview
  const { data: trendData, loading: trendLoading } = useFetchData<Trend[]>('/api/trend/top?year=2025&topN=5');
  const { data: userData, loading: userLoading } = useFetchData<User[]>('/api/users');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  // Show loading if user is being verified
  if (!user) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "1.2rem"
      }}>
        Đang xác thực...
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      padding: 0,
      margin: 0,
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: 0
      }}>
        <div style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite"
        }}></div>
        <div style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(108, 92, 231, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite reverse"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "20%",
          left: "20%",
          width: "100px",
          height: "100px",
          background: "radial-gradient(circle, rgba(67, 56, 202, 0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 7s ease-in-out infinite"
        }}></div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes slideInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      {/* Top Navigation */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
        background: "rgba(42, 82, 152, 0.1)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(42, 82, 152, 0.2)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.1)"
      }}>
        <Link to="/" style={{
          fontSize: "1.8rem",
          fontWeight: 800,
          color: "white",
          textDecoration: "none",
          background: "linear-gradient(45deg, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
           CareerTrend 
        </Link>
        <div style={{ display: "flex", gap: 25, alignItems: "center" }}>
          <Link to="/major-search" style={{ 
            color: "white", 
            textDecoration: "none", 
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: "20px",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          ><Search size={16} /> Tìm kiếm ngành</Link>
          <Link to="/trend" style={{ 
            color: "white", 
            textDecoration: "none", 
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: "20px",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(42, 82, 152, 0.2)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          ><TrendingUp size={16} /> Xu hướng</Link>
          <Link to="/universities" style={{ 
            color: "white", 
            textDecoration: "none", 
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: "20px",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(42, 82, 152, 0.2)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          ><School size={16} /> Trường ĐH</Link>
          <Link to="/dashboard" style={{ 
            color: "white", 
            textDecoration: "none", 
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: "20px",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(42, 82, 152, 0.2)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          ><BarChart size={16} /> Dashboard</Link>
          {/* User Avatar and Dropdown */}
          <div style={{ position: "relative" }}>
            <div 
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 18px",
                background: "rgba(42, 82, 152, 0.25)",
                borderRadius: 25,
                cursor: "pointer",
                border: "1px solid rgba(42, 82, 152, 0.3)",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)"
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(42, 82, 152, 0.35)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(42, 82, 152, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(42, 82, 152, 0.25)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}
            >
              {/* Avatar */}
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "1rem",
                border: "2px solid rgba(255,255,255,0.3)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                animation: showDropdown ? "pulse 0.6s ease-in-out" : "none"
              }}>
                {user.fullName?.charAt(0)?.toUpperCase() || user.userCode?.charAt(0)?.toUpperCase() || "U"}
              </div>
              
              {/* Greeting */}
              <div style={{ color: "white" }}>
                <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>Xin chào</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  {user.fullName || user.userCode || "User"}
                </div>
              </div>
              
              {/* Dropdown Arrow */}
              <div style={{ 
                color: "white", 
                fontSize: "0.8rem",
                transition: "all 0.3s ease",
                transform: showDropdown ? "rotate(180deg) scale(1.2)" : "rotate(0deg) scale(1)",
                opacity: showDropdown ? 0.8 : 1
              }}>
                ▼
              </div>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div 
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 15,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 15,
                  border: "1px solid rgba(255,255,255,0.3)",
                  minWidth: 220,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                  animation: "slideInUp 0.3s ease-out",
                  overflow: "hidden"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Link 
                  to="/profile" 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "15px 18px",
                    color: "#333",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(102, 126, 234, 0.1)";
                    e.currentTarget.style.paddingLeft = "22px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.paddingLeft = "18px";
                  }}
                  onClick={() => setShowDropdown(false)}
                >
                  <UserIcon size={18} style={{ color: "#667eea" }} />
                  <span>Profile của tôi</span>
                </Link>
                
                <div 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "15px 18px",
                    color: "#dc2626",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(220, 38, 38, 0.1)";
                    e.currentTarget.style.paddingLeft = "22px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.paddingLeft = "18px";
                  }}
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Đăng xuất</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Dashboard Section */}
      <section style={{
        background: "rgba(42, 82, 152, 0.1)",
        backdropFilter: "blur(15px)",
        padding: "100px 20px 50px 20px",
        textAlign: "center",
        color: "white",
        position: "relative",
        zIndex: 5,
        borderBottom: "1px solid rgba(42, 82, 152, 0.2)",
        marginTop:20
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ 
            fontSize: "3.5rem", 
            fontWeight: 900, 
            margin: "0 0 20px 0",
            textShadow: "0 4px 8px rgba(0,0,0,0.3)",
            background: "linear-gradient(45deg, #fff 0%, #f0f0f0 50%, #e0e0e0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "fadeIn 1s ease-out",
            lineHeight: 1.1
          }}>
            Tổng quan CareerTrend
          </h1>
          <p style={{ 
            fontSize: "1.3rem", 
            margin: "0 0 35px 0", 
            opacity: 0.9,
            lineHeight: 1.6,
            maxWidth: 800,
            marginLeft: "auto",
            marginRight: "auto",
            animation: "fadeIn 1.2s ease-out",
            fontWeight: 300,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)"
          }}>
            Phân tích thời gian thực về xu hướng ngành học và cơ hội nghề nghiệp tại Việt Nam
          </p>
          
          {/* Hero Stats Preview */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            marginTop: 40,
            animation: "slideInUp 1.4s ease-out"
          }}>
            <div style={{
              textAlign: "center",
              padding: "20px",
              background: "rgba(42, 82, 152, 0.15)",
              borderRadius: 15,
              border: "1px solid rgba(42, 82, 152, 0.3)",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "#60a5fa" }}>2025</div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Dữ liệu cập nhật</div>
            </div>
            <div style={{
              textAlign: "center",
              padding: "20px",
              background: "rgba(42, 82, 152, 0.15)",
              borderRadius: 15,
              border: "1px solid rgba(42, 82, 152, 0.3)",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "#fbbf24" }}>50+</div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Ngành học</div>
            </div>
            <div style={{
              textAlign: "center",
              padding: "20px",
              background: "rgba(42, 82, 152, 0.15)",
              borderRadius: 15,
              border: "1px solid rgba(42, 82, 152, 0.3)",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "#3b82f6" }}>1000+</div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Chỉ tiêu tuyển sinh</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px" }}>
        
        {/* Key Statistics */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ 
            color: "white", 
            fontSize: "2rem", 
            fontWeight: 600, 
            marginBottom: 30,
            textAlign: "center"
          }}>
            <TrendingUp size={24} style={{ marginRight: 10 }} /> Thống kê tổng quan
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: 25 
          }}>
            <DashboardCard 
              title={<><GraduationCap size={16} style={{ marginRight: 6 }} /> Ngành học hot nhất</>} 
              value={trendData?.[0]?.majorName || "Đang tải..."}
              subtitle={`${trendData?.[0]?.totalQuota || 0} chỉ tiêu tuyển sinh`}
              icon={<Flame size={32} />}
              color="rgba(239, 68, 68, 0.15)"
              loading={trendLoading}
            />
            <DashboardCard 
              title={<><BarChart size={16} style={{ marginRight: 6 }} /> Tổng số ngành</>}
              value={trendData?.length || 0}
              subtitle="Được theo dõi và phân tích"
              icon={<BookOpen size={32} />}
              color="rgba(34, 197, 94, 0.15)"
              loading={trendLoading}
            />
            <DashboardCard 
              title={<><UserIcon size={16} style={{ marginRight: 6 }} /> Người dùng hệ thống</>} 
              value={userData?.length || 0}
              subtitle="Đang sử dụng CareerTrend"
              icon={<GraduationCap size={32} />}
              color="rgba(59, 130, 246, 0.15)"
              loading={userLoading}
            />
            <DashboardCard 
              title={<><Rocket size={16} style={{ marginRight: 6 }} /> Xu hướng tăng</>} 
              value="85%"
              subtitle="Ngành CNTT & Kỹ thuật"
              icon={<TrendingUp size={32} />}
              color="rgba(168, 85, 247, 0.15)"
              loading={false}
            />
          </div>
        </section>

        {/* Top Trending Majors */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ 
            background: "rgba(42, 82, 152, 0.1)", 
            backdropFilter: "blur(10px)",
            borderRadius: 20,
            padding: 30,
            border: "1px solid rgba(42, 82, 152, 0.2)"
          }}>
            <h2 style={{ 
              color: "white", 
              fontSize: "1.8rem", 
              fontWeight: 600, 
              marginBottom: 25,
              display: "flex",
              alignItems: "center",
              gap: 10
            }}>
              <Flame size={24} />
              Top 5 ngành học nổi bật 2025
            </h2>
            
            {trendLoading ? (
              <div style={{ color: "white", textAlign: "center", padding: 20 }}>
                Đang tải dữ liệu xu hướng...
              </div>
            ) : trendData && trendData.length > 0 ? (
              <div style={{ display: "grid", gap: 15 }}>
                {trendData.slice(0, 5).map((trend, index) => (
                  <TrendingMajorCard
                    key={trend.majorCode}
                    rank={index + 1}
                    majorName={trend.majorName || trend.majorCode}
                    majorCode={trend.majorCode}
                    quota={trend.totalQuota || 0}
                    growth={Math.floor(Math.random() * 30) + 10} // Mock growth percentage
                  />
                ))}
              </div>
            ) : (
              <div style={{ color: "rgba(255,255,255,0.7)", textAlign: "center", padding: 20 }}>
                Không có dữ liệu xu hướng
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ 
            color: "white", 
            fontSize: "1.8rem", 
            fontWeight: 600, 
            marginBottom: 25,
            textAlign: "center"
          }}>
            <Rocket size={24} style={{ marginRight: 10 }} />
            Khám phá thêm
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: 25
          }}>
            
            <ActionCard
              title={<><Search size={16} style={{ marginRight: 0 }} /> Tìm kiếm ngành học</>}
              description="Sử dụng bộ lọc thông minh để tìm ngành phù hợp với bạn"
              features={["Lọc theo lĩnh vực", "So sánh ngành học", "Gợi ý cá nhân"]}
              linkTo="/major-search"
              buttonText="Tìm kiếm ngay"
              color="rgba(59, 130, 246, 0.15)"
            />
            
            <ActionCard
              title={<><TrendingUp size={16} style={{ marginRight: 6 }} /> Phân tích xu hướng</>}
              description="Xem biểu đồ chi tiết và dự báo tương lai các ngành"
              features={["Biểu đồ tương tác", "Dự báo 3-5 năm", "Phân tích nguyên nhân"]}
              linkTo="/trend"
              buttonText="Xem xu hướng"
              color="rgba(239, 68, 68, 0.15)"
            />
            
            <ActionCard
              title={<><School size={16} style={{ marginRight: 2 }} />Thông tin trường ĐH</>}
              description="Khám phá các trường đại học và chương trình đào tạo"
              features={["Xếp hạng trường", "Điểm chuẩn", "Chi phí học tập"]}
              linkTo="/universities"
              buttonText="Khám phá"
              color="rgba(34, 197, 94, 0.15)"
            />
            
            <ActionCard
              title={<><Settings size={16} style={{ marginRight: 6 }} /> Cá nhân hóa</>}
              description="Quản lý hồ sơ và nhận gợi ý phù hợp với bạn"
              features={["Assessment test", "Lộ trình cá nhân", "Theo dõi mục tiêu"]}
              linkTo="/profile"
              buttonText="Cài đặt"
              color="rgba(168, 85, 247, 0.15)"
            />

          </div>
        </section>

        {/* Market Insights */}
        <section style={{
          background: "rgba(42, 82, 152, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
          border: "1px solid rgba(42, 82, 152, 0.2)"
        }}>
          <h2 style={{ 
            color: "white", 
            fontSize: "1.8rem", 
            marginBottom: 20,
            fontWeight: 600 
          }}>
            <Lightbulb size={24} style={{ marginRight: 10 }} />
            Thông tin thị trường mới nhất
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: 20,
            marginTop: 25
          }}>
            <InsightCard 
              icon={<TrendingUp size={32} />} 
              title="Mức lương trung bình" 
              value="15-25 triệu"
              subtitle="Cho ngành CNTT mới tốt nghiệp"
            />
            <InsightCard 
              icon={<Target size={32} />} 
              title="Tỷ lệ có việc làm" 
              value="87%"
              subtitle="Trong vòng 6 tháng sau tốt nghiệp"
            />
            <InsightCard 
              icon={<Brain size={32} />} 
              title="Ngành thiếu nhân lực" 
              value="AI & Data Science"
              subtitle="Cơ hội nghề nghiệp cao nhất"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

// Dashboard Components
function DashboardCard({ title, value, subtitle, icon, color, loading }: {
  title: React.ReactNode;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  loading: boolean;
}) {
  return (
    <div style={{
      background: loading ? "rgba(42, 82, 152, 0.1)" : color,
      backdropFilter: "blur(15px)",
      padding: 30,
      borderRadius: 20,
      border: "1px solid rgba(42, 82, 152, 0.2)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
      e.currentTarget.style.borderColor = "rgba(42, 82, 152, 0.4)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0) scale(1)";
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)";
      e.currentTarget.style.borderColor = "rgba(42, 82, 152, 0.2)";
    }}
    >
      {/* Background gradient overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(42, 82, 152, 0.1) 0%, transparent 50%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none"
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
      onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
      ></div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, position: "relative", zIndex: 2 }}>
        <h3 style={{ color: "white", fontSize: "1.1rem", fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
          {title}
        </h3>
        <div style={{ 
          fontSize: "2.5rem",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
          transition: "transform 0.3s ease"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1) rotate(5deg)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}
        >
          {icon}
        </div>
      </div>
      <div style={{ 
        fontSize: "2.5rem", 
        fontWeight: 800, 
        color: "white", 
        marginBottom: 10,
        position: "relative",
        zIndex: 2,
        textShadow: "0 2px 4px rgba(0,0,0,0.3)"
      }}>
        {loading ? (
          <div style={{
            display: "inline-block",
            width: "40px",
            height: "40px",
            border: "3px solid rgba(42, 82, 152, 0.3)",
            borderRadius: "50%",
            borderTopColor: "rgba(42, 82, 152, 0.8)",
            animation: "spin 1s ease-in-out infinite"
          }}></div>
        ) : value}
      </div>
      <div style={{ 
        color: "rgba(255,255,255,0.8)", 
        fontSize: "0.95rem",
        position: "relative",
        zIndex: 2,
        fontWeight: 400
      }}>
        {subtitle}
      </div>
    </div>
  );
}

function TrendingMajorCard({ rank, majorName, majorCode, quota, growth }: {
  rank: number;
  majorName: string;
  majorCode: string;
  quota: number;
  growth: number;
}) {
  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy size={22} style={{ color: '#ffd700', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />;
      case 2: return <Medal size={22} style={{ color: '#c0c0c0', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />;
      case 3: return <Medal size={22} style={{ color: '#cd7f32', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />;
      default: return <Hash size={22} style={{ color: '#666', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />;
    }
  };

  return (
    <div style={{
      background: "rgba(42, 82, 152, 0.1)",
      borderRadius: 16,
      padding: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: "1px solid rgba(42, 82, 152, 0.2)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(15px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
      e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
      e.currentTarget.style.borderColor = "rgba(42, 82, 152, 0.4)";
      e.currentTarget.style.background = "rgba(42, 82, 152, 0.15)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0) scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
      e.currentTarget.style.borderColor = "rgba(42, 82, 152, 0.2)";
      e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
    }}
    >
      {/* Background gradient on hover */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(42, 82, 152, 0.05) 0%, transparent 70%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none"
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
      onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
      ></div>

      <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative", zIndex: 2 }}>
        <div style={{
          fontSize: "1.8rem",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: rank <= 3 ? "rgba(42, 82, 152, 0.2)" : "rgba(42, 82, 152, 0.1)",
          border: "2px solid rgba(42, 82, 152, 0.3)",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.background = "rgba(42, 82, 152, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = rank <= 3 ? "rgba(42, 82, 152, 0.2)" : "rgba(42, 82, 152, 0.1)";
        }}
        >
          {getRankIcon(rank)}
        </div>
        <div>
          <h4 style={{ 
            color: "white", 
            margin: 0, 
            fontSize: "1.2rem", 
            fontWeight: 700,
            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            lineHeight: 1.3
          }}>
            {majorName}
          </h4>
          <p style={{ 
            color: "rgba(255,255,255,0.7)", 
            margin: "6px 0 0 0", 
            fontSize: "0.95rem",
            fontWeight: 400
          }}>
            {majorCode} • {quota.toLocaleString()} chỉ tiêu
          </p>
        </div>
      </div>
      <div style={{ textAlign: "right", position: "relative", zIndex: 2 }}>
        <div style={{ 
          color: growth > 20 ? "#4ade80" : "#fbbf24", 
          fontWeight: 800, 
          fontSize: "1.3rem",
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: 4
        }}>
          <TrendingUp size={16} />
          +{growth}%
        </div>
        <div style={{ 
          color: "rgba(255,255,255,0.6)", 
          fontSize: "0.85rem",
          fontWeight: 400
        }}>
          tăng trưởng
        </div>
      </div>
    </div>
  );
}

function ActionCard({ title, description, features, linkTo, buttonText, color }: {
  title: React.ReactNode;
  description: string;
  features: string[];
  linkTo: string;
  buttonText: string;
  color: string;
}) {
  return (
    <div style={{
      background: color,
      backdropFilter: "blur(15px)",
      padding: 30,
      borderRadius: 20,
      border: "1px solid rgba(42, 82, 152, 0.2)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
      e.currentTarget.style.borderColor = "rgba(42, 82, 152, 0.4)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0) scale(1)";
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)";
      e.currentTarget.style.borderColor = "rgba(42, 82, 152, 0.2)";
    }}
    >
      {/* Background gradient overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(42, 82, 152, 0.1) 0%, transparent 50%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none"
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
      onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
      ></div>

      <h3 style={{ 
        color: "white", 
        fontSize: "1.4rem", 
        marginBottom: 18, 
        fontWeight: 700,
        position: "relative",
        zIndex: 2,
        textShadow: "0 2px 4px rgba(0,0,0,0.2)",
        lineHeight: 1.3
      }}>
        {title}
      </h3>
      <p style={{ 
        color: "rgba(255,255,255,0.85)", 
        lineHeight: 1.6, 
        marginBottom: 22, 
        fontSize: "1rem",
        position: "relative",
        zIndex: 2,
        fontWeight: 400
      }}>
        {description}
      </p>
      <ul style={{ 
        color: "rgba(255,255,255,0.75)", 
        marginBottom: 25, 
        paddingLeft: 20,
        position: "relative",
        zIndex: 2
      }}>
        {features.map((feature, index) => (
          <li key={index} style={{ 
            marginBottom: 8, 
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(42, 82, 152, 0.6)",
              flexShrink: 0
            }}></div>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        to={linkTo}
        style={{
          background: "rgba(42, 82, 152, 0.2)",
          color: "white",
          padding: "14px 28px",
          borderRadius: 12,
          textDecoration: "none",
          fontWeight: 600,
          display: "inline-block",
          border: "1px solid rgba(42, 82, 152, 0.3)",
          transition: "all 0.3s ease",
          position: "relative",
          zIndex: 2,
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "75%"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(42, 82, 152, 0.3)";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(42, 82, 152, 0.2)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
        }}
      >
        {buttonText}
      </Link>
    </div>
  );
}

function InsightCard({ icon, title, value, subtitle }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div style={{
      background: "rgba(42, 82, 152, 0.1)",
      padding: 25,
      borderRadius: 16,
      border: "1px solid rgba(42, 82, 152, 0.2)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(15px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
      e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
      e.currentTarget.style.borderColor = "rgba(42, 82, 152, 0.4)";
      e.currentTarget.style.background = "rgba(42, 82, 152, 0.15)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0) scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
      e.currentTarget.style.borderColor = "rgba(42, 82, 152, 0.2)";
      e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
    }}
    >
      {/* Background gradient overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(42, 82, 152, 0.05) 0%, transparent 70%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none"
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
      onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
      ></div>

      <div style={{ 
        fontSize: "2.5rem", 
        marginBottom: 15,
        position: "relative",
        zIndex: 2,
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
        transition: "transform 0.3s ease"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1) rotate(5deg)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}
      >
        {icon}
      </div>
      <h4 style={{ 
        color: "white", 
        fontSize: "1.1rem", 
        fontWeight: 700, 
        marginBottom: 12,
        position: "relative",
        zIndex: 2,
        textShadow: "0 1px 2px rgba(0,0,0,0.2)",
        lineHeight: 1.3
      }}>
        {title}
      </h4>
      <div style={{ 
        fontSize: "1.8rem", 
        fontWeight: 800, 
        color: "#4ade80", 
        marginBottom: 8,
        position: "relative",
        zIndex: 2,
        textShadow: "0 1px 2px rgba(0,0,0,0.2)"
      }}>
        {value}
      </div>
      <div style={{ 
        color: "rgba(255,255,255,0.7)", 
        fontSize: "0.9rem",
        position: "relative",
        zIndex: 2,
        fontWeight: 400
      }}>
        {subtitle}
      </div>
    </div>
  );
}
