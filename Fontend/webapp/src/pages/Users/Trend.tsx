import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopTrends, predictFutureTrends, getTrendAnalysis } from "../../services/trendService";
import TrendAnalysisChart from "../../components/charts/TrendAnalysisChart";
import PredictionChart from "../../components/charts/PredictionChart";
import TrendAnalysis from "../../components/analysis/TrendAnalysis";
import { TrendingUp, AlertTriangle, RefreshCw, BarChart, Sparkles, Brain } from "lucide-react";
import type { Trend } from "../../model/TrendModel";

export default function TrendPage() {
  const navigate = useNavigate();
  const [trends, setTrends] = useState<Trend[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [selectedMajorName, setSelectedMajorName] = useState<string>("");
  const [predictions, setPredictions] = useState<{
    year: number;
    predictedQuota: number;
    predictedGrowthRate: number;
    confidence: number;
  }[]>([]);
  const [analysis, setAnalysis] = useState<{
    strengths: string[];
    challenges: string[];
    opportunities: string[];
    marketFactors: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'prediction' | 'analysis'>('overview');

  useEffect(() => {
    loadTrendData();
  }, []);

  useEffect(() => {
    if (selectedMajor) {
      loadPredictionData(selectedMajor);
      loadAnalysisData(selectedMajor);
    }
  }, [selectedMajor]);

  const loadTrendData = async () => {
    try {
      setLoading(true);
      const trendData = await getTopTrends(2025, 10);
      setTrends(trendData);
      
      // Auto select first major
      if (trendData.length > 0) {
        setSelectedMajor(trendData[0].majorCode);
        setSelectedMajorName(trendData[0].majorName || trendData[0].majorCode);
      }
    } catch (err) {
      console.error("Error loading trend data:", err);
      setError("Không thể tải dữ liệu xu hướng");
    } finally {
      setLoading(false);
    }
  };

  const loadPredictionData = async (majorCode: string) => {
    try {
      const predictionData = await predictFutureTrends(majorCode, 5);
      setPredictions(predictionData);
    } catch (err) {
      console.error("Error loading prediction data:", err);
    }
  };

  const loadAnalysisData = async (majorCode: string) => {
    try {
      const analysisData = await getTrendAnalysis(majorCode);
      setAnalysis(analysisData);
    } catch (err) {
      console.error("Error loading analysis data:", err);
    }
  };

  const handleMajorSelect = (majorCode: string) => {
    const trend = trends.find(t => t.majorCode === majorCode);
    if (trend) {
      setSelectedMajor(majorCode);
      setSelectedMajorName(trend.majorName || majorCode);
    }
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

        {/* Loading Spinner */}
        <div style={{
          background: "rgba(42, 82, 152, 0.1)",
          borderRadius: 16,
          padding: "50px 40px",
          border: "1px solid rgba(42, 82, 152, 0.2)",
          boxShadow: "0 4px 20px rgba(42, 82, 152, 0.1)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(120, 119, 198, 0.05) 0%, rgba(255, 119, 198, 0.05) 100%)",
            borderRadius: 16,
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
            Đang tải dữ liệu xu hướng...
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

        {/* Error Message */}
        <div style={{
          background: "rgba(42, 82, 152, 0.1)",
          borderRadius: 16,
          padding: "40px 40px",
          border: "1px solid rgba(42, 82, 152, 0.2)",
          boxShadow: "0 4px 20px rgba(42, 82, 152, 0.1)",
          textAlign: "center",
          maxWidth: 500,
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(244,67,54, 0.05) 0%, rgba(255, 119, 198, 0.05) 100%)",
            borderRadius: 16,
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
            onClick={loadTrendData}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              padding: "12px 24px",
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 600,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              zIndex: 2
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <RefreshCw size={16} style={{ marginRight: 6 }} /> Thử lại
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
        position: "relative",
        animation: "fadeInUp 0.8s ease-out"
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
          zIndex: 2,
          animation: "fadeInUp 0.8s ease-out 0.2s both"
        }}>
          <TrendingUp size={48} style={{
            marginRight: "16px",
            filter: "drop-shadow(0 2px 8px rgba(120, 119, 198, 0.4))"
          }} />
          Phân tích xu hướng ngành học
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          margin: "0 auto",
          lineHeight: 1.5,
          fontWeight: 400,
          maxWidth: "600px",
          position: "relative",
          zIndex: 2,
          animation: "fadeInUp 0.8s ease-out 0.4s both"
        }}>
          Xem biểu đồ chi tiết, dự báo tương lai và phân tích nguyên nhân xu hướng các ngành học
        </p>
        <div style={{
          width: "80px",
          height: "4px",
          background: "linear-gradient(90deg, rgba(120, 119, 198, 0.8), rgba(255, 119, 198, 0.8))",
          borderRadius: "2px",
          margin: "25px auto 0",
          boxShadow: "0 2px 10px rgba(120, 119, 198, 0.3)",
          animation: "fadeInUp 0.8s ease-out 0.6s both"
        }} />
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px",
        gap: 8,
        animation: "fadeInUp 0.8s ease-out 0.8s both"
      }}>
        {[
          { key: 'overview' as const, label: 'Tổng quan', icon: <BarChart size={16} />, desc: 'Biểu đồ xu hướng' },
          { key: 'prediction' as const, label: 'Dự báo', icon: <Sparkles size={16} />, desc: 'Dự đoán tương lai' },
          { key: 'analysis' as const, label: 'Phân tích', icon: <Brain size={16} />, desc: 'Phân tích chi tiết' }
        ].map((tab, index) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '14px 20px',
              borderRadius: 12,
              border: activeTab === tab.key
                ? '1px solid rgba(42, 82, 152, 0.3)'
                : '1px solid rgba(42, 82, 152, 0.2)',
              background: activeTab === tab.key
                ? 'rgba(42, 82, 152, 0.15)'
                : 'rgba(42, 82, 152, 0.1)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === tab.key ? '600' : '500',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              minWidth: '120px',
              position: 'relative',
              overflow: 'hidden',
              animation: `fadeInUp 0.6s ease-out ${0.9 + index * 0.1}s both`
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.key) {
                e.currentTarget.style.background = "rgba(42, 82, 152, 0.12)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(42, 82, 152, 0.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.key) {
                e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 2
            }}>
              {tab.icon}
              <span>{tab.label}</span>
            </div>
            <span style={{
              fontSize: '11px',
              opacity: 0.7,
              fontWeight: 400
            }}>
              {tab.desc}
            </span>
            {activeTab === tab.key && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(120, 119, 198, 0.8), rgba(255, 119, 198, 0.8))',
                borderRadius: '1px'
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        position: 'relative'
      }}>
        {activeTab === 'overview' && (
          <div style={{
            marginBottom: 40,
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <TrendAnalysisChart
              trends={trends}
              selectedMajor={selectedMajor}
              onMajorSelect={handleMajorSelect}
            />
          </div>
        )}

        {activeTab === 'prediction' && selectedMajor && predictions.length > 0 && (
          <div style={{
            marginBottom: 40,
            animation: 'slideInRight 0.5s ease-out'
          }}>
            <PredictionChart
              predictions={predictions}
              majorName={selectedMajorName}
            />
          </div>
        )}

        {activeTab === 'analysis' && selectedMajor && analysis && (
          <div style={{
            marginBottom: 40,
            animation: 'slideInLeft 0.5s ease-out'
          }}>
            <TrendAnalysis
              majorName={selectedMajorName}
              analysis={analysis}
            />
          </div>
        )}

        {/* Empty State for Prediction Tab */}
        {activeTab === 'prediction' && (!selectedMajor || predictions.length === 0) && (
          <div style={{
            textAlign: 'center',
            padding: '80px 40px',
            background: 'rgba(42, 82, 152, 0.1)',
            borderRadius: 20,
            border: '1px solid rgba(42, 82, 152, 0.2)',
            boxShadow: '0 4px 20px rgba(42, 82, 152, 0.1)',
            maxWidth: '500px',
            margin: '0 auto',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '24px',
              filter: 'drop-shadow(0 4px 12px rgba(120, 119, 198, 0.2))'
            }}>
              <Sparkles size={64} />
            </div>
            <h3 style={{
              color: 'white',
              margin: '0 0 16px 0',
              fontSize: '1.5rem',
              fontWeight: 600
            }}>
              Chọn ngành học để xem dự báo
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              margin: 0,
              fontSize: '1rem',
              lineHeight: 1.6
            }}>
              Vui lòng chọn một ngành học từ tab Tổng quan để xem dự báo xu hướng tương lai
            </p>
          </div>
        )}

        {/* Empty State for Analysis Tab */}
        {activeTab === 'analysis' && (!selectedMajor || !analysis) && (
          <div style={{
            textAlign: 'center',
            padding: '80px 40px',
            background: 'rgba(42, 82, 152, 0.1)',
            borderRadius: 20,
            border: '1px solid rgba(42, 82, 152, 0.2)',
            boxShadow: '0 4px 20px rgba(42, 82, 152, 0.1)',
            maxWidth: '500px',
            margin: '0 auto',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '24px',
              filter: 'drop-shadow(0 4px 12px rgba(120, 119, 198, 0.2))'
            }}>
              <Brain size={64} />
            </div>
            <h3 style={{
              color: 'white',
              margin: '0 0 16px 0',
              fontSize: '1.5rem',
              fontWeight: 600
            }}>
              Chọn ngành học để xem phân tích
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              margin: 0,
              fontSize: '1rem',
              lineHeight: 1.6
            }}>
              Vui lòng chọn một ngành học từ tab Tổng quan để xem phân tích chi tiết
            </p>
          </div>
        )}
      </div>

      {/* Loading Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes slideInLeft {
            0% {
              opacity: 0;
              transform: translateX(-30px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            0% {
              opacity: 0;
              transform: translateX(30px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
}
