import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Settings, BarChart, Clipboard, Lightbulb, Flame, Rocket, TrendingUp, TrendingDown, Target, Search, DollarSign, Monitor, Wrench, Stethoscope, Scale } from "lucide-react";
import { useFetchData } from "../../hooks/useFetchData";
import type { Trend } from "../../model/TrendModel";

export default function MajorSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  // removed compare feature - keep state for selected major to show details modal
  const [selectedMajorForDetails, setSelectedMajorForDetails] = useState<Trend | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const { data: allMajors, loading } = useFetchData<Trend[]>('/api/trend/top?year=2025&topN=50');

  // Filter and sort majors based on search criteria
  const filteredMajors = allMajors?.filter(major => {
    const matchesSearch = major.majorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         major.majorCode?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by field based on majorCode
    let matchesField = selectedField === "all";
    if (!matchesField) {
      switch(selectedField) {
        case "M01":
        case "M02":
          matchesField = major.majorCode === "M01" || major.majorCode === "M02"; // Công nghệ thông tin, AI
          break;
        case "M07":
        case "M08":
          matchesField = major.majorCode === "M07" || major.majorCode === "M08"; // Kế toán, Tài chính-Ngân hàng
          break;
        case "M03":
        case "M04":
          matchesField = major.majorCode === "M03" || major.majorCode === "M04"; // Kỹ thuật
          break;
        case "M05":
        case "M06":
          matchesField = major.majorCode === "M05" || major.majorCode === "M06"; // Y học, Dược
          break;
        case "M09":
        case "M10":
          matchesField = major.majorCode === "M09" || major.majorCode === "M10"; // Luật, Khoa học xã hội
          break;
        default:
          matchesField = true;
      }
    }
    
    return matchesSearch && matchesField;
  }) || [];

  const sortedMajors = [...filteredMajors].sort((a, b) => {
    switch(sortBy) {
      case "popularity":
        return (b.totalQuota || 0) - (a.totalQuota || 0);
      case "name":
        return (a.majorName || "").localeCompare(b.majorName || "");
      case "code":
        return (a.majorCode || "").localeCompare(b.majorCode || "");
      default:
        return 0;
    }
  });

  // open details modal for a major
  const openMajorDetails = (major: Trend) => {
    setSelectedMajorForDetails(major);
  };

  const closeMajorDetails = () => setSelectedMajorForDetails(null);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      padding: "20px"
    }}>
      {/* Top-left back button */}
      <button
       onClick={() => navigate("/")}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(42, 82, 152, 0.1)",
            border: "1px solid rgba(42, 82, 152, 0.2)",
            borderRadius: "12px",
            padding: "12px 16px",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(42, 82, 152, 0.2)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          ← Quay lại
      </button>
      
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          background: "rgba(42, 82, 152, 0.1)",
          backdropFilter: "blur(5px)",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
          border: "1px solid rgba(42, 82, 152, 0.2)"
        }}>
          <h1 style={{ 
            color: "white", 
            fontSize: "2.5rem", 
            fontWeight: 700, 
            margin: "0 0 15px 0",
            textAlign: "center"
          }}>
            <Search size={32} style={{ marginRight: 12 }} /> Tìm kiếm và Lọc Ngành Học
          </h1>
          <p style={{ 
            color: "rgba(255,255,255,0.8)", 
            fontSize: "1.1rem", 
            textAlign: "center",
            margin: 0
          }}>
            Khám phá ngành học phù hợp với bạn thông qua hệ thống lọc thông minh
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div style={{
          background: "rgba(42, 82, 152, 0.1)",
          backdropFilter: "blur(5px)",
          borderRadius: window.innerWidth <= 480 ? 12 : 15,
          padding: window.innerWidth <= 480 ? 20 : 25,
          marginBottom: window.innerWidth <= 480 ? 20 : 30,
          border: "1px solid rgba(42, 82, 152, 0.2)",
          animation: "slideInUp 0.6s ease-out"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth <= 768 ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
            gap: window.innerWidth <= 480 ? 15 : 20
          }}>
            
            {/* Search Input */}
            <div style={{ gridColumn: window.innerWidth <= 768 ? "1fr" : "span 2" }}>
              <label style={{ 
                color: "white", 
                fontSize: "1rem", 
                fontWeight: 600, 
                display: "block", 
                marginBottom: 8 
              }}>
                <Search size={16} style={{ marginRight: 6 }} /> Tìm kiếm ngành học
              </label>
              <div style={{
                position: "relative",
                transition: "all 0.3s ease"
              }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Nhập tên ngành, mã ngành, hoặc từ khóa..."
                  style={{
                    width: "100%",
                    padding: "14px 45px 14px 15px",
                    borderRadius: 10,
                    border: `2px solid ${isSearchFocused ? 'rgba(42, 82, 152, 0.5)' : 'rgba(42, 82, 152, 0.3)'}`,
                  background: "rgba(42, 82, 152, 0.1)",
                  backdropFilter: "blur(5px)",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "all 0.3s ease",
                  boxShadow: isSearchFocused ? "0 0 0 3px rgba(42, 82, 152, 0.1)" : "none"
                  }}
                />
                <Search
                  size={20}
                  style={{
                    position: "absolute",
                    right: 15,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: isSearchFocused ? "#3b82f6" : "rgba(42, 82, 152, 0.6)",
                    transition: "all 0.3s ease"
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    style={{
                      position: "absolute",
                      right: 45,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "rgba(42, 82, 152, 0.6)",
                      cursor: "pointer",
                      padding: "4px",
                      borderRadius: "50%",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(42, 82, 152, 0.2)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Field Filter */}
            <div>
              <label style={{ 
                color: "white", 
                fontSize: "1rem", 
                fontWeight: 600, 
                display: "block", 
                marginBottom: 8 
              }}>
                <BookOpen size={16} style={{ marginRight: 6 }} />
                Lĩnh vực
              </label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: 8,
                  border: "1px solid rgba(42, 82, 152, 0.3)",
                  background: "rgba(42, 82, 152, 0.1)",
                  backdropFilter: "blur(5px)",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              >
                <option value="all" style={{ background: "#764ba2" }}>Tất cả lĩnh vực</option>
                <option value="M01" style={{ background: "#764ba2" }}><Monitor size={14} style={{ marginRight: 6 }} /> Công nghệ thông tin & AI (M01, M02)</option>
                <option value="M07" style={{ background: "#764ba2" }}><DollarSign size={14} style={{ marginRight: 6 }} /> Tài chính & Kế toán (M07, M08)</option>
                <option value="M03" style={{ background: "#764ba2" }}><Wrench size={14} style={{ marginRight: 6 }} /> Kỹ thuật & Công nghệ (M03, M04)</option>
                <option value="M05" style={{ background: "#764ba2" }}><Stethoscope size={14} style={{ marginRight: 6 }} /> Y học & Dược học (M05, M06)</option>
                <option value="M09" style={{ background: "#764ba2" }}><Scale size={14} style={{ marginRight: 6 }} /> Luật & Khoa học xã hội (M09, M10)</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label style={{ 
                color: "white", 
                fontSize: "1rem", 
                fontWeight: 600, 
                display: "block", 
                marginBottom: 8 
              }}>
                <BarChart size={16} style={{ marginRight: 6 }} />
                Sắp xếp theo
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: 8,
                  border: "1px solid rgba(42, 82, 152, 0.3)",
                  background: "rgba(42, 82, 152, 0.1)",
                  backdropFilter: "blur(5px)",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              >
                <option value="popularity" style={{ background: "#764ba2" }}>Độ phổ biến</option>
                <option value="name" style={{ background: "#764ba2" }}>Tên ngành (A-Z)</option>
                <option value="code" style={{ background: "#764ba2" }}>Mã ngành</option>
              </select>
            </div>

          </div>

          {/* Advanced Filters Toggle */}
          <div style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            marginTop: window.innerWidth <= 480 ? 15 : 20
          }}>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              style={{
                background: showAdvancedFilters ? "rgba(42, 82, 152, 0.2)" : "rgba(42, 82, 152, 0.1)",
                border: `1px solid ${showAdvancedFilters ? 'rgba(42, 82, 152, 0.3)' : 'rgba(42, 82, 152, 0.2)'}`,
                borderRadius: 25,
                padding: "10px 20px",
                color: "white",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                margin: "0 auto",
                transition: "all 0.3s ease",
                transform: "translateY(0)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Settings size={16} style={{
                transform: showAdvancedFilters ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease"
              }} />
              {showAdvancedFilters ? "Ẩn bộ lọc nâng cao" : "Hiện bộ lọc nâng cao"}
            </button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div style={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: window.innerWidth <= 480 ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
              gap: window.innerWidth <= 480 ? 15 : 20,
              marginTop: 20,
              padding: 20,
              background: "rgba(42, 82, 152, 0.05)",
              borderRadius: 12,
              border: "1px solid rgba(42, 82, 152, 0.08)",
              animation: "fadeIn 0.4s ease-out"
            }}>
              {/* Advanced filter options can be added here */}
            </div>
          )}

          {/* Compare section removed - replaced by details modal triggered from MajorCard "Chi tiết" button */}
        </div>
        <div style={{
          background: "rgba(42, 82, 152, 0.1)",
          backdropFilter: "blur(5px)",
          borderRadius: 15,
          padding: 25,
          border: "1px solid rgba(42, 82, 152, 0.2)"
        }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: 20 
          }}>
            <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>
              <Clipboard size={20} style={{ marginRight: 8 }} />
              Kết quả tìm kiếm
            </h2>
            <div style={{ color: "rgba(255,255,255,0.8)" }}>
              {loading ? "Đang tải..." : `${sortedMajors.length} ngành được tìm thấy`}
            </div>
          </div>

          {loading ? (
            <div style={{ 
              color: "white", 
              textAlign: "center", 
              padding: 40,
              fontSize: "1.1rem"
            }}>
              <Settings size={20} style={{ marginRight: 8 }} /> Đang tải dữ liệu ngành học...
            </div>
          ) : sortedMajors.length > 0 ? (
            <div style={{ display: "grid", gap: 15 }}>
              {sortedMajors.map((major) => (
                <MajorCard
                  key={major.majorCode}
                  major={major}
                  onShowDetails={() => openMajorDetails(major)}
                />
              ))}
            </div>
          ) : (
            <div style={{ 
              color: "rgba(255,255,255,0.7)", 
              textAlign: "center", 
              padding: 40,
              fontSize: "1.1rem"
            }}>
              <Search size={20} style={{ marginRight: 8 }} /> Không tìm thấy ngành học phù hợp. Thử điều chỉnh bộ lọc.
            </div>
          )}
        </div>

        {/* Recommendation Section */}
        <div style={{
          background: "rgba(42, 82, 152, 0.1)",
          backdropFilter: "blur(5px)",
          borderRadius: 15,
          padding: 25,
          marginTop: 30,
          border: "1px solid rgba(42, 82, 152, 0.2)"
        }}>
          <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 600, marginBottom: 15 }}>
            <Lightbulb size={20} style={{ marginRight: 8 }} />
            Gợi ý cho bạn
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 15 }}>
            <RecommendationCard
              title={<><Flame size={16} style={{ marginRight: 6 }} /> Ngành Hot 2025</>}
              description="Công nghệ thông tin và Trí tuệ nhân tạo"
              action="Khám phá ngay"
            />
            <RecommendationCard
              title={<><DollarSign size={16} style={{ marginRight: 6 }} /> Lương cao nhất</>}
              description="Kỹ thuật phần mềm và Khoa học dữ liệu"
              action="Xem chi tiết"
            />
            <RecommendationCard
              title={<><Rocket size={16} style={{ marginRight: 6 }} /> Tăng trưởng mạnh</>}
              description="Digital Marketing và E-commerce"
              action="Tìm hiểu thêm"
            />
          </div>
        </div>

      </div>

      {/* Details modal */}
      <MajorDetailsModal major={selectedMajorForDetails} onClose={closeMajorDetails} />
    </div>
  );
}

// Component for individual major cards
function MajorCard({ major, onShowDetails }: {
  major: Trend;
  onShowDetails: () => void;
}) {
  return (
    <div style={{
      background: "rgba(42, 82, 152, 0.1)",
      borderRadius: 12,
      padding: 20,
      border: "1px solid rgba(42, 82, 152, 0.2)",
      transition: "all 0.3s ease"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            color: "white", 
            fontSize: "1.2rem", 
            fontWeight: 600, 
            margin: "0 0 8px 0" 
          }}>
            {major.majorName || major.majorCode}
          </h3>
          <p style={{ 
            color: "rgba(255,255,255,0.7)", 
            margin: "0 0 15px 0",
            fontSize: "0.9rem"
          }}>
            Mã ngành: {major.majorCode} • {major.totalQuota || 0} chỉ tiêu tuyển sinh
          </p>
          
          <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
            <div style={{ 
              background: major.growthRate && major.growthRate > 0 ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)", 
              padding: "5px 10px", 
              borderRadius: 15,
              fontSize: "0.8rem",
              color: major.growthRate && major.growthRate > 0 ? "#4ade80" : "#f87171"
            }}>
              {major.growthRate && major.growthRate > 0 ? <><TrendingUp size={12} style={{ marginRight: 4 }} /> {major.growthRate?.toFixed(1) || 0}% tăng trưởng</> : <><TrendingDown size={12} style={{ marginRight: 4 }} /> {Math.abs(major.growthRate || 0).toFixed(1)}% giảm</>}
            </div>
            <div style={{ 
              background: "rgba(59, 130, 246, 0.2)", 
              padding: "5px 10px", 
              borderRadius: 15,
              fontSize: "0.8rem",
              color: "#60a5fa"
            }}>
              <Target size={12} style={{ marginRight: 4 }} /> Top {major.rankOrder || 'N/A'}
            </div>
          </div>
          
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
            <Target size={14} style={{ marginRight: 4 }} /> Chỉ tiêu: {major.totalQuota?.toLocaleString() || 0} • <BarChart size={14} style={{ marginRight: 4, marginLeft: 8 }} /> Năm: {major.year}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginLeft: 20 }}>
          <button onClick={onShowDetails} style={{
            background: "linear-gradient(135deg, rgba(42,82,152,0.25) 0%, rgba(42,82,152,0.18) 100%)",
            color: "white",
            border: "1px solid rgba(42, 82, 152, 0.3)",
            padding: "8px 16px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: "0.9rem"
          }}>
            <BarChart size={14} style={{ marginRight: 4 }} /> Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

// Details modal rendered by parent when a major is selected
function MajorDetailsModal({ major, onClose }: { major: Trend | null; onClose: () => void }) {
  if (!major) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(2,6,23,0.6), rgba(2,6,23,0.85))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: 20
    }} onClick={onClose}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(20,30,60,0.95), rgba(8,12,28,0.95))',
        borderRadius: 14,
        maxWidth: 820,
        width: '100%',
        padding: 28,
        color: 'white',
        boxShadow: '0 18px 50px rgba(2,6,23,0.8)',
        border: '1px solid rgba(42,82,152,0.18)'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem' }}>{major.majorName || major.majorCode}</h2>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 6 }}>{major.majorCode} • Năm {major.year}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={onClose} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}>Đóng</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18, alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: 10, color: 'rgba(255,255,255,0.9)' }}>
              <strong>Giới thiệu ngắn</strong>
              <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{(major as unknown as { description?: string }).description || 'Chưa có mô tả chi tiết cho ngành này.'}</p>
            </div>

            {/* Additional rich info rows can be added here if available */}
          </div>

          <div style={{ background: 'rgba(42,82,152,0.06)', padding: 12, borderRadius: 10, border: '1px solid rgba(42,82,152,0.12)' }}>
            <div style={{ marginBottom: 10 }}><strong>Chỉ tiêu</strong></div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16 }}>{major.totalQuota?.toLocaleString() || 0}</div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '12px 0' }} />

            <div style={{ marginBottom: 6 }}><strong>Tăng trưởng</strong></div>
            <div style={{ color: major.growthRate && major.growthRate > 0 ? '#4ade80' : '#f87171' }}>{major.growthRate ? `${major.growthRate.toFixed(1)}%` : 'N/A'}</div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '12px 0' }} />

            <div style={{ marginBottom: 6 }}><strong>Thứ hạng</strong></div>
            <div style={{ color: 'rgba(255,255,255,0.9)' }}>{major.rankOrder || 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for recommendation cards
function RecommendationCard({ title, description, action }: {
  title: React.ReactNode;
  description: string;
  action: string;
}) {
  return (
    <div style={{
      background: "rgba(42, 82, 152, 0.1)",
      borderRadius: 10,
      padding: 20,
      border: "1px solid rgba(42, 82, 152, 0.2)",
      transition: "transform 0.3s ease"
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
    >
      <h4 style={{ color: "white", fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>
        {title}
      </h4>
      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", marginBottom: 15 }}>
        {description}
      </p>
      <button style={{
        background: "rgba(42, 82, 152, 0.2)",
        color: "white",
        border: "1px solid rgba(42, 82, 152, 0.3)",
        padding: "6px 12px",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: "0.8rem"
      }}>
        {action}
      </button>
    </div>
  );
}