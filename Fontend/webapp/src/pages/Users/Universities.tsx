import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUniversities } from "../../services/universityService";
import { School, Search, MapPin, BarChart, Trash2, AlertTriangle, Target, DollarSign, Trophy, Check } from "lucide-react";
import type { University } from "../../model/UniversityModel";

export default function Universities() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async () => {
    try {
      setLoading(true);
      const data = await getAllUniversities();
      setUniversities(data);
    } catch (err) {
      console.error("Error loading universities:", err);
      setError("Không thể tải danh sách trường đại học");
    } finally {
      setLoading(false);
    }
  };

  // Filter universities based on search and region
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !selectedRegion || uni.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  // Get unique regions for filter
  const regions = [...new Set(universities.map(uni => uni.region).filter(Boolean))];

  // Handle university selection
  const handleUniversitySelect = (universityCode: string) => {
    setSelectedUniversities(prev => 
      prev.includes(universityCode) 
        ? prev.filter(code => code !== universityCode)
        : [...prev, universityCode]
    );
  };

  // Get selected universities data
  const selectedUniversitiesData = universities.filter(uni => 
    selectedUniversities.includes(uni.universityCode)
  );

  // Handle comparison
  const handleCompare = () => {
    if (selectedUniversities.length >= 2) {
      setShowComparison(true);
    }
  };

  // Close comparison modal
  const closeComparison = () => {
    setShowComparison(false);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(42, 82, 152, 0.1)",
            border: "1px solid rgba(42, 82, 152, 0.2)",
            borderRadius: "8px",
            padding: "10px 14px",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(42, 82, 152, 0.15)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          ← Quay lại
        </button>

        {/* Loading Spinner */}
        <div style={{
          background: "rgba(42, 82, 152, 0.1)",
          borderRadius: 20,
          padding: "50px 40px",
          border: "1px solid rgba(42, 82, 152, 0.2)",
          boxShadow: "0 4px 20px rgba(42, 82, 152, 0.1)",
          textAlign: "center",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(120, 119, 198, 0.05) 0%, rgba(255, 119, 198, 0.05) 100%)",
            borderRadius: 24,
            pointerEvents: "none"
          }} />
          <div style={{
            width: 80,
            height: 80,
            border: "4px solid rgba(120, 119, 198, 0.2)",
            borderTop: "4px solid rgba(120, 119, 198, 0.8)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 24px auto",
            position: "relative",
            zIndex: 2
          }} />
          <h3 style={{
            color: "white",
            margin: "0 0 12px 0",
            fontSize: "1.4rem",
            fontWeight: 600,
            position: "relative",
            zIndex: 2
          }}>
            Đang tải danh sách trường...
          </h3>
          <p style={{
            color: "rgba(255,255,255,0.8)",
            margin: 0,
            fontSize: "1rem",
            position: "relative",
            zIndex: 2
          }}>
            Vui lòng đợi trong giây lát
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(42, 82, 152, 0.1)",
            border: "1px solid rgba(42, 82, 152, 0.2)",
            borderRadius: "8px",
            padding: "10px 14px",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(42, 82, 152, 0.15)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          ← Quay lại
        </button>

        {/* Error Message */}
        <div style={{
          background: "rgba(42, 82, 152, 0.1)",
          borderRadius: 20,
          padding: "40px 40px",
          border: "1px solid rgba(42, 82, 152, 0.2)",
          boxShadow: "0 4px 20px rgba(42, 82, 152, 0.1)",
          textAlign: "center",
          maxWidth: 500,
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(244,67,54,0.05) 0%, rgba(255, 119, 198, 0.05) 100%)",
            borderRadius: 24,
            pointerEvents: "none"
          }} />
          <div style={{
            fontSize: "4rem",
            marginBottom: "24px",
            position: "relative",
            zIndex: 2,
            filter: "drop-shadow(0 4px 12px rgba(244,67,54,0.2))"
          }}>
            <AlertTriangle size={64} />
          </div>
          <h3 style={{
            color: "#ffcccc",
            margin: "0 0 16px 0",
            fontSize: "1.5rem",
            fontWeight: 600,
            position: "relative",
            zIndex: 2
          }}>
            Lỗi tải dữ liệu
          </h3>
          <p style={{
            color: "rgba(255,255,255,0.8)",
            margin: "0 0 24px 0",
            fontSize: "1rem",
            lineHeight: 1.6,
            position: "relative",
            zIndex: 2
          }}>
            {error}
          </p>
          <button
            onClick={loadUniversities}
            style={{
              background: "rgba(42, 82, 152, 0.1)",
              border: "1px solid rgba(42, 82, 152, 0.2)",
              borderRadius: "12px",
              padding: "14px 28px",
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 600,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              zIndex: 2,
              backdropFilter: "blur(4px)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(42, 82, 152, 0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(42, 82, 152, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      padding: "20px",
      position: "relative"
    }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "rgba(42, 82, 152, 0.1)",
          border: "1px solid rgba(42, 82, 152, 0.2)",
          borderRadius: "8px",
          padding: "10px 14px",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: "all 0.3s ease",
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(42, 82, 152, 0.15)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        ← Quay lại
      </button>

      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: "50px",
        marginTop: "60px",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          top: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "120px",
          background: "radial-gradient(circle, rgba(120, 119, 198, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)"
        }} />
        <h1 style={{
          color: "white",
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
          fontWeight: 800,
          margin: "0 0 15px 0",
          textShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(120, 119, 198, 0.3)",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          position: "relative",
          zIndex: 2
        }}>
          <School size={48} style={{
            marginRight: "16px",
            filter: "drop-shadow(0 2px 8px rgba(120, 119, 198, 0.4))"
          }} />
          Danh sách Trường Đại học
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          margin: "0 auto",
          lineHeight: 1.5,
          fontWeight: 400,
          maxWidth: "600px",
          position: "relative",
          zIndex: 2
        }}>
          Khám phá các trường đại học hàng đầu Việt Nam với thông tin chi tiết và công cụ so sánh thông minh
        </p>
        <div style={{
          width: "80px",
          height: "4px",
          background: "linear-gradient(90deg, rgba(120, 119, 198, 0.8), rgba(255, 119, 198, 0.8))",
          borderRadius: "2px",
          margin: "25px auto 0",
          boxShadow: "0 2px 10px rgba(120, 119, 198, 0.3)"
        }} />
      </div>

      {/* Filters */}
      <div style={{
        background: "rgba(42, 82, 152, 0.1)",
        borderRadius: 16,
        padding: "20px",
        margin: "0 auto 32px auto",
        border: "1px solid rgba(42, 82, 152, 0.2)",
        display: "flex",
        gap: "20px",
        alignItems: "end",
        flexWrap: "wrap",
        maxWidth: "1200px",
        boxShadow: "0 4px 16px rgba(42, 82, 152, 0.1)",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(42, 82, 152, 0.08) 0%, rgba(255, 119, 198, 0.08) 100%)",
          borderRadius: 16,
          pointerEvents: "none"
        }} />
        {/* Search Input */}
  <div style={{ flex: 1, minWidth: "160px" }}>
          <label style={{
            display: "block",
            color: "white",
            fontSize: "0.9rem",
            fontWeight: 600,
            marginBottom: "8px"
          }}>
            <Search size={16} style={{ marginRight: 6 }} /> Tìm kiếm trường
          </label>
          <input
            type="text"
            placeholder="Nhập tên trường hoặc địa chỉ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(42, 82, 152, 0.2)",
              background: "rgba(42, 82, 152, 0.08)",
              backdropFilter: "blur(5px)",
              color: "white",
              fontSize: "0.95rem",
              outline: "none",
              transition: "all 0.2s ease",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid rgba(42, 82, 152, 0.3)";
              e.target.style.background = "rgba(42, 82, 152, 0.12)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid rgba(42, 82, 152, 0.2)";
              e.target.style.background = "rgba(42, 82, 152, 0.08)";
            }}
          />
        </div>

        {/* Region Filter */}
  <div style={{ minWidth: "120px" }}>
          <label style={{
            display: "block",
            color: "white",
            fontSize: "0.9rem",
            fontWeight: 600,
            marginBottom: "8px"
          }}>
            <MapPin size={16} style={{ marginRight: 6 }} /> Khu vực
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(42, 82, 152, 0.2)",
              background: "rgba(42, 82, 152, 0.08)",
              backdropFilter: "blur(5px)",
              color: "white",
              fontSize: "0.95rem",
              outline: "none",
              transition: "all 0.2s ease",
              cursor: "pointer"
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid rgba(42, 82, 152, 0.3)";
              e.target.style.background = "rgba(42, 82, 152, 0.12)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid rgba(42, 82, 152, 0.2)";
              e.target.style.background = "rgba(42, 82, 152, 0.08)";
            }}
          >
            <option value="" style={{ background: "rgba(0,0,0,0.8)" }}>Tất cả khu vực</option>
            {regions.map(region => (
              <option key={region} value={region} style={{ background: "rgba(0,0,0,0.8)" }}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div style={{
          display: "flex",
          alignItems: "center",
          color: "rgba(255,255,255,0.8)",
          fontSize: "0.85rem"
        }}>
          <BarChart size={15} style={{ marginRight: 6 }} /> {filteredUniversities.length} trường
        </div>

        {/* Compare Button */}
        {selectedUniversities.length >= 2 && (
          <button
            onClick={handleCompare}
              style={{
                background: "rgba(33,150,243,0.6)",
                border: "1px solid rgba(33,150,243,0.4)",
                borderRadius: "10px",
                padding: "10px 18px",
                color: "white",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 600,
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 10px rgba(33,150,243,0.2)"
              }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(33,150,243,0.7)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(33,150,243,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(33,150,243,0.6)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(33,150,243,0.25)";
            }}
          >
            <BarChart size={16} style={{ marginRight: 6 }} /> So sánh ({selectedUniversities.length} trường)
          </button>
        )}

        {/* Clear Selection Button */}
        {selectedUniversities.length > 0 && (
          <button
            onClick={() => setSelectedUniversities([])}
            style={{
              background: "rgba(244,67,54,0.15)",
              border: "1px solid rgba(244,67,54,0.25)",
              borderRadius: "10px",
              padding: "10px 16px",
              color: "#ffcccc",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 600,
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(244,67,54,0.25)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(244,67,54,0.15)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Trash2 size={16} style={{ marginRight: 6 }} /> Xóa tất cả ({selectedUniversities.length})
          </button>
        )}
      </div>

      {/* Universities Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "24px",
        marginBottom: "40px"
      }}>
        {filteredUniversities.map((university) => (
          <div
            key={university.universityCode}
            style={{
              background: "rgba(42, 82, 152, 0.08)",
              borderRadius: 16,
              padding: "24px",
              border: "1px solid rgba(42, 82, 152, 0.12)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(42, 82, 152, 0.08)",
              transform: "translateY(0)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.01)";
              e.currentTarget.style.background = "rgba(42, 82, 152, 0.12)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(42, 82, 152, 0.12)";
              e.currentTarget.style.border = "1px solid rgba(42, 82, 152, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.background = "rgba(42, 82, 152, 0.08)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(42, 82, 152, 0.08)";
              e.currentTarget.style.border = "1px solid rgba(42, 82, 152, 0.12)";
            }}
          >
            {/* Selection Button */}
            <div style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              zIndex: 3
            }}>
              <button
                onClick={() => handleUniversitySelect(university.universityCode)}
                style={{
                  background: selectedUniversities.includes(university.universityCode)
                    ? "linear-gradient(135deg, rgba(76,175,80,0.8) 0%, rgba(56,142,60,0.8) 100%)"
                    : "rgba(42, 82, 152, 0.1)",
                  border: selectedUniversities.includes(university.universityCode)
                    ? "1px solid rgba(76,175,80,0.6)"
                    : "1px solid rgba(42, 82, 152, 0.15)",
                  borderRadius: "25px",
                  padding: "8px 16px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: selectedUniversities.includes(university.universityCode)
                    ? "0 4px 15px rgba(76,175,80,0.4)"
                    : "0 2px 10px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(4px)"
                }}
                onMouseEnter={(e) => {
                  if (!selectedUniversities.includes(university.universityCode)) {
                    e.currentTarget.style.background = "rgba(42, 82, 152, 0.15)";
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(42, 82, 152, 0.15)";
                  } else {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(76,175,80,0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedUniversities.includes(university.universityCode)) {
                    e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 2px 10px rgba(42, 82, 152, 0.1)";
                  } else {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(76,175,80,0.4)";
                  }
                }}
              >
                {selectedUniversities.includes(university.universityCode) ? "✓ Đã chọn" : "+ Chọn"}
              </button>
            </div>

            {/* University Name */}
            <h3 style={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: 700,
              margin: "0 0 16px 0",
              lineHeight: 1.3,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              position: "relative",
              zIndex: 2
            }}>
              {university.universityName}
            </h3>

            {/* Subtle gradient overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, rgba(42, 82, 152, 0.03) 0%, rgba(255, 119, 198, 0.03) 100%)",
              borderRadius: 20,
              pointerEvents: "none",
              zIndex: 1
            }} />

            {/* University Info */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "50px",
              position: "relative",
              zIndex: 2
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 12px",
                background: "rgba(42, 82, 152, 0.03)",
                borderRadius: "8px",
                border: "1px solid rgba(42, 82, 152, 0.05)"
              }}>
                <span style={{ color: "rgba(120, 119, 198, 0.8)", fontSize: "0.9rem" }}><MapPin size={16} /></span>
                <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "0.95rem", fontWeight: 500 }}>
                  {university.address}, {university.region}
                </span>
              </div>

              {university.admissionScore && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}>
                  <span style={{ color: "rgba(255, 119, 198, 0.8)", fontSize: "0.9rem" }}><Target size={16} /></span>
                  <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "0.95rem", fontWeight: 500 }}>
                    Điểm chuẩn: <strong style={{ color: "rgba(255, 119, 198, 0.9)" }}>{university.admissionScore}</strong>
                  </span>
                </div>
              )}

              {university.tuitionFee && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}>
                  <span style={{ color: "rgba(120, 219, 226, 0.8)", fontSize: "0.9rem" }}><DollarSign size={16} /></span>
                  <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "0.95rem", fontWeight: 500 }}>
                    Học phí: <strong style={{ color: "rgba(120, 219, 226, 0.9)" }}>{university.tuitionFee.toLocaleString()} VND/năm</strong>
                  </span>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredUniversities.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "60px 40px",
          background: "rgba(42, 82, 152, 0.08)",
          borderRadius: 20,
          border: "1px solid rgba(42, 82, 152, 0.12)",
          boxShadow: "0 4px 16px rgba(42, 82, 152, 0.08)",
          maxWidth: "500px",
          margin: "0 auto",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(42, 82, 152, 0.06) 0%, rgba(255, 119, 198, 0.06) 100%)",
            borderRadius: 20,
            pointerEvents: "none"
          }} />
          <div style={{
            fontSize: "4rem",
            marginBottom: "24px",
            position: "relative",
            zIndex: 2,
            filter: "drop-shadow(0 4px 12px rgba(120, 119, 198, 0.2))"
          }}>
            <Search size={64} />
          </div>
          <h3 style={{
            color: "white",
            margin: "0 0 16px 0",
            fontSize: "1.5rem",
            fontWeight: 600,
            position: "relative",
            zIndex: 2
          }}>
            Không tìm thấy trường nào
          </h3>
          <p style={{
            color: "rgba(255,255,255,0.8)",
            margin: 0,
            fontSize: "1rem",
            lineHeight: 1.6,
            position: "relative",
            zIndex: 2
          }}>
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc khu vực để tìm trường phù hợp
          </p>
        </div>
      )}

      {/* Loading Animation Keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          input::placeholder, select {
            color: rgba(42, 82, 152, 0.6);
          }

          option {
            background: rgba(0,0,0,0.8);
            color: white;
          }
        `}
      </style>

      {/* Comparison Modal */}
      {showComparison && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: 16,
            padding: "24px",
            maxWidth: "1200px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}>
            {/* Close Button */}
            <button
              onClick={closeComparison}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(0,0,0,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.2)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: "30px" }}>
              <h2 style={{
                color: "#333",
                fontSize: "2rem",
                fontWeight: 700,
                margin: "0 0 10px 0"
              }}>
                <BarChart size={24} style={{ marginRight: 12 }} /> So sánh các trường đại học
              </h2>
              <p style={{
                color: "#666",
                fontSize: "1rem",
                margin: 0
              }}>
                Đang so sánh {selectedUniversities.length} trường
              </p>
            </div>

            {/* Comparison Chart */}
            <div style={{
              background: "white",
              borderRadius: 12,
              padding: "20px",
              marginBottom: "30px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{
                color: "#333",
                fontSize: "1.4rem",
                fontWeight: 600,
                margin: "0 0 20px 0"
              }}>
                <BarChart size={20} style={{ marginRight: 8 }} /> Biểu đồ so sánh điểm chuẩn
              </h3>
              
              {/* Simple Bar Chart */}
              <div style={{
                display: "flex",
                alignItems: "end",
                gap: "20px",
                height: "300px",
                padding: "20px 0"
              }}>
                {selectedUniversitiesData.map((uni, index) => {
                  const maxScore = Math.max(...selectedUniversitiesData.map(u => u.admissionScore || 0));
                  const height = uni.admissionScore ? (uni.admissionScore / maxScore) * 250 : 0;
                  
                  return (
                    <div key={uni.universityCode} style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flex: 1
                    }}>
                      {/* Bar */}
                      <div style={{
                        width: "60px",
                        height: `${height}px`,
                        background: `hsl(${index * 360 / selectedUniversities.length}, 70%, 60%)`,
                        borderRadius: "4px 4px 0 0",
                        marginBottom: "10px",
                        transition: "all 0.3s ease",
                        position: "relative"
                      }}>
                        {/* Score Label */}
                        <div style={{
                          position: "absolute",
                          top: "-25px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          color: "#333",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap"
                        }}>
                          {uni.admissionScore || "N/A"}
                        </div>
                      </div>
                      
                      {/* University Name */}
                      <div style={{
                        color: "#666",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        textAlign: "center",
                        maxWidth: "80px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        {uni.universityName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comparison Table */}
            <div style={{
              background: "white",
              borderRadius: 12,
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{
                color: "#333",
                fontSize: "1.4rem",
                fontWeight: 600,
                margin: "0 0 20px 0"
              }}>
                <Check size={20} style={{ marginRight: 8 }} /> Bảng so sánh chi tiết
              </h3>
              
              <div style={{ overflowX: "auto" }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem"
                }}>
                  <thead>
                    <tr style={{ background: "#f8f9fa" }}>
                      <th style={{
                        padding: "12px",
                        textAlign: "left",
                        borderBottom: "2px solid #dee2e6",
                        fontWeight: 600,
                        color: "#333"
                      }}>
                        Thông tin
                      </th>
                      {selectedUniversitiesData.map((uni, index) => (
                        <th key={uni.universityCode} style={{
                          padding: "12px",
                          textAlign: "center",
                          borderBottom: "2px solid #dee2e6",
                          fontWeight: 600,
                          color: `hsl(${index * 360 / selectedUniversities.length}, 70%, 40%)`
                        }}>
                          {uni.universityName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #dee2e6",
                        fontWeight: 500,
                        color: "#333"
                      }}>
                        <Trophy size={16} style={{ marginRight: 6 }} /> Xếp hạng
                      </td>
                      {selectedUniversitiesData.map(uni => (
                        <td key={uni.universityCode} style={{
                          padding: "12px",
                          textAlign: "center",
                          borderBottom: "1px solid #dee2e6",
                          color: "#666"
                        }}>
                          {uni.ranking ? `#${uni.ranking}` : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ background: "#f8f9fa" }}>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #dee2e6",
                        fontWeight: 500,
                        color: "#333"
                      }}>
                        <MapPin size={16} style={{ marginRight: 6 }} /> Khu vực
                      </td>
                      {selectedUniversitiesData.map(uni => (
                        <td key={uni.universityCode} style={{
                          padding: "12px",
                          textAlign: "center",
                          borderBottom: "1px solid #dee2e6",
                          color: "#666"
                        }}>
                          {uni.region}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #dee2e6",
                        fontWeight: 500,
                        color: "#333"
                      }}>
                        <Target size={16} style={{ marginRight: 6 }} /> Điểm chuẩn
                      </td>
                      {selectedUniversitiesData.map(uni => (
                        <td key={uni.universityCode} style={{
                          padding: "12px",
                          textAlign: "center",
                          borderBottom: "1px solid #dee2e6",
                          color: "#666",
                          fontWeight: 600
                        }}>
                          {uni.admissionScore || "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ background: "#f8f9fa" }}>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #dee2e6",
                        fontWeight: 500,
                        color: "#333"
                      }}>
                        <DollarSign size={16} style={{ marginRight: 6 }} /> Học phí (VND/năm)
                      </td>
                      {selectedUniversitiesData.map(uni => (
                        <td key={uni.universityCode} style={{
                          padding: "12px",
                          textAlign: "center",
                          borderBottom: "1px solid #dee2e6",
                          color: "#666"
                        }}>
                          {uni.tuitionFee ? uni.tuitionFee.toLocaleString() : "N/A"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
