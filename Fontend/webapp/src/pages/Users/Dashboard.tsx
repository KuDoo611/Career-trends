import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopTrendingMajors } from "../../services/admissionService";
import TrendComparisonChart from "../../components/charts/TrendComparisonChart";
import TrendStats from "../../components/charts/TrendStats";
import { BarChart, X, TrendingUp, TrendingDown } from "lucide-react";
import type { TrendAnalysis } from "../../model/AdmissionModel";

export default function Dashboard() {
  const navigate = useNavigate();
  const [increasing, setIncreasing] = useState<TrendAnalysis[]>([]);
  const [decreasing, setDecreasing] = useState<TrendAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrendData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getTopTrendingMajors(2025, 5);
        setIncreasing(data.increasing);
        setDecreasing(data.decreasing);
        
        console.log("Trend data loaded:", data);
      } catch (err) {
        console.error("Error loading trend data:", err);
        setError(err instanceof Error ? err.message : "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };

    loadTrendData();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '20px',
        position: 'relative'
      }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            background: 'rgba(42, 82, 152, 0.1)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(42, 82, 152, 0.2)',
            borderRadius: '12px',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 1000,
            color: 'white',
            fontSize: '1.5rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(42, 82, 152, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(42, 82, 152, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="Quay lại trang chủ"
        >
          ←
        </button>

        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header Skeleton */}
          <div style={{
            background: 'rgba(42, 82, 152, 0.1)',
            backdropFilter: 'blur(5px)',
            borderRadius: 16,
            padding: '30px',
            marginBottom: '30px',
            border: '1px solid rgba(42, 82, 152, 0.2)',
            textAlign: 'center',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            <div style={{
              height: '40px',
              background: 'rgba(42, 82, 152, 0.2)',
              borderRadius: '8px',
              marginBottom: '15px',
              width: '60%',
              margin: '0 auto 15px'
            }} />
            <div style={{
              height: '20px',
              background: 'rgba(42, 82, 152, 0.2)',
              borderRadius: '4px',
              width: '40%',
              margin: '0 auto'
            }} />
          </div>

          {/* Statistics Skeleton */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                background: 'rgba(42, 82, 152, 0.1)',
                backdropFilter: 'blur(5px)',
                borderRadius: 16,
                padding: '20px',
                border: '1px solid rgba(42, 82, 152, 0.2)',
                textAlign: 'center',
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(42, 82, 152, 0.2)',
                  borderRadius: '50%',
                  margin: '0 auto 15px'
                }} />
                <div style={{
                  height: '16px',
                  background: 'rgba(42, 82, 152, 0.2)',
                  borderRadius: '4px',
                  width: '70%',
                  margin: '0 auto 10px'
                }} />
                <div style={{
                  height: '24px',
                  background: 'rgba(42, 82, 152, 0.2)',
                  borderRadius: '4px',
                  width: '50%',
                  margin: '0 auto 8px'
                }} />
                <div style={{
                  height: '12px',
                  background: 'rgba(42, 82, 152, 0.2)',
                  borderRadius: '4px',
                  width: '60%',
                  margin: '0 auto'
                }} />
              </div>
            ))}
          </div>

          {/* Chart Skeleton */}
          <div style={{
            background: 'rgba(42, 82, 152, 0.1)',
            backdropFilter: 'blur(5px)',
            borderRadius: 16,
            padding: '20px',
            border: '1px solid rgba(42, 82, 152, 0.2)',
            marginBottom: '30px',
            animation: 'pulse 2s ease-in-out infinite',
            animationDelay: '0.5s'
          }}>
            <div style={{
              height: '20px',
              background: 'rgba(42, 82, 152, 0.2)',
              borderRadius: '4px',
              width: '40%',
              marginBottom: '20px'
            }} />
            <div style={{
              height: '400px',
              background: 'rgba(42, 82, 152, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                border: '4px solid rgba(255, 255, 255, 0.3)',
                borderTop: '4px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          </div>

          {/* Lists Skeleton */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px'
          }}>
            {[1, 2].map((i) => (
              <div key={i} style={{
                background: 'rgba(42, 82, 152, 0.1)',
                backdropFilter: 'blur(5px)',
                borderRadius: 16,
                padding: '20px',
                border: '1px solid rgba(42, 82, 152, 0.2)',
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: `${0.7 + i * 0.1}s`
              }}>
                <div style={{
                  height: '20px',
                  background: 'rgba(42, 82, 152, 0.2)',
                  borderRadius: '4px',
                  width: '60%',
                  marginBottom: '20px'
                }} />
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} style={{
                    background: 'rgba(42, 82, 152, 0.05)',
                    borderRadius: 8,
                    padding: '15px',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        height: '14px',
                        background: 'rgba(42, 82, 152, 0.2)',
                        borderRadius: '4px',
                        width: '80%',
                        marginBottom: '8px'
                      }} />
                      <div style={{
                        height: '12px',
                        background: 'rgba(42, 82, 152, 0.2)',
                        borderRadius: '4px',
                        width: '60%'
                      }} />
                    </div>
                    <div style={{
                      width: '50px',
                      height: '20px',
                      background: 'rgba(42, 82, 152, 0.2)',
                      borderRadius: '4px'
                    }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.7; }
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative'
      }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            background: 'rgba(42, 82, 152, 0.1)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(42, 82, 152, 0.2)',
            borderRadius: '12px',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 1000,
            color: 'white',
            fontSize: '1.5rem'
          }}
          title="Quay lại trang chủ"
        >
          ←
        </button>

        <div style={{
          background: 'rgba(239, 68, 68, 0.08)',
          backdropFilter: 'blur(5px)',
          borderRadius: 16,
          padding: '40px',
          textAlign: 'center',
          border: '1px solid rgba(239, 68, 68, 0.15)',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}><X size={48} /></div>
          <h2 style={{ color: 'white', marginBottom: '15px' }}>Lỗi tải dữ liệu</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '20px' }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              border: 'none',
              background: '#ef4444',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Tải lại trang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '20px',
      position: 'relative',
      animation: 'fadeIn 0.8s ease-out'
    }}
    role="main"
    aria-label="Dashboard phân tích xu hướng tuyển sinh"
    >
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: '-40px',
          left: '6px',
          background: '#000',
          color: '#fff',
          padding: '8px',
          textDecoration: 'none',
          borderRadius: '4px',
          zIndex: 1001
        }}
        onFocus={(e) => e.currentTarget.style.top = '6px'}
        onBlur={(e) => e.currentTarget.style.top = '-40px'}
      >
        Bỏ qua điều hướng, đến nội dung chính
      </a>
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            background: 'rgba(42, 82, 152, 0.1)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(42, 82, 152, 0.2)',
            borderRadius: '12px',
            width: window.innerWidth <= 480 ? '44px' : '50px',
            height: window.innerWidth <= 480 ? '44px' : '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1000,
            color: 'white',
            fontSize: window.innerWidth <= 480 ? '1.2rem' : '1.5rem',
            transform: 'translateY(0)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(42, 82, 152, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(42, 82, 152, 0.1)';
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = '2px solid #3b82f6';
            e.currentTarget.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/');
            }
          }}
          aria-label="Quay lại trang chủ"
          title="Quay lại trang chủ"
          role="button"
          tabIndex={0}
        >
          ←
        </button>      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: window.innerWidth <= 480 ? '10px' : window.innerWidth <= 768 ? '15px' : '20px' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(42, 82, 152, 0.1)',
          backdropFilter: 'blur(5px)',
          borderRadius: window.innerWidth <= 480 ? 12 : 16,
          padding: window.innerWidth <= 480 ? '15px' : window.innerWidth <= 768 ? '20px' : '30px',
          marginBottom: window.innerWidth <= 480 ? '15px' : window.innerWidth <= 768 ? '20px' : '30px',
          border: '1px solid rgba(42, 82, 152, 0.2)',
          textAlign: 'center',
          animation: 'slideInUp 0.8s ease-out',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(42, 82, 152, 0.05) 0%, transparent 50%, rgba(42, 82, 152, 0.05) 100%)',
            animation: 'shimmer 3s ease-in-out infinite'
          }} />
          <h1 style={{
            color: 'white',
            fontSize: window.innerWidth <= 480 ? '1.5rem' : window.innerWidth <= 768 ? '2rem' : '2.5rem',
            fontWeight: 700,
            margin: '0 0 10px 0',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            position: 'relative',
            zIndex: 1,
            animation: 'textGlow 2s ease-in-out infinite alternate'
          }}>
            <BarChart size={window.innerWidth <= 480 ? 32 : 40} style={{ marginRight: 12, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} /> Dashboard Phân Tích Xu Hướng
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: window.innerWidth <= 480 ? '0.95rem' : window.innerWidth <= 768 ? '1.1rem' : '1.2rem',
            margin: 0,
            lineHeight: 1.4,
            position: 'relative',
            zIndex: 1
          }}>
            Phân tích xu hướng chỉ tiêu tuyển sinh các ngành năm 2025
          </p>
        </div>

        {/* Statistics */}
        <div style={{
          animation: 'slideInUp 0.8s ease-out 0.2s both'
        }}>
          <TrendStats increasing={increasing} decreasing={decreasing} />
        </div>

        {/* Trend Chart */}
        <div style={{
          animation: 'slideInUp 0.8s ease-out 0.4s both'
        }}>
          <TrendComparisonChart increasing={increasing} decreasing={decreasing} />
        </div>

        {/* Detailed Lists */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: window.innerWidth <= 480 ? '15px' : '20px',
          marginTop: window.innerWidth <= 480 ? '20px' : '30px',
          animation: 'slideInUp 0.8s ease-out 0.6s both'
        }}>
          {/* Top Increasing Majors */}
          {increasing.length > 0 && (
            <div style={{
              background: 'rgba(34, 197, 94, 0.08)',
              backdropFilter: 'blur(5px)',
              borderRadius: 16,
              padding: '20px',
              border: '1px solid rgba(34, 197, 94, 0.15)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(34, 197, 94, 0.08)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.15)';
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(34, 197, 94, 0.08)';
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.15)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} />
              <h3 style={{
                color: 'white',
                fontSize: '1.5rem',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                position: 'relative',
                zIndex: 1
              }}>
                <TrendingUp size={20} style={{ marginRight: 8, color: '#22c55e' }} /> Top 5 Ngành Tăng Mạnh Nhất
              </h3>
              {increasing.map((trend, index) => (
                <div key={trend.majorCode} style={{
                  background: 'rgba(42, 82, 152, 0.05)',
                  borderRadius: 8,
                  padding: '15px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  animation: `slideInLeft 0.6s ease-out ${0.8 + index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(42, 82, 152, 0.1)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(42, 82, 152, 0.05)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{
                      color: 'white',
                      fontWeight: '600',
                      margin: '0 0 5px 0'
                    }}>
                      #{index + 1} {trend.majorName}
                    </p>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem',
                      margin: 0
                    }}>
                      Chỉ tiêu 2025: {trend.totalQuota2025.toLocaleString()}
                    </p>
                  </div>
                  <div style={{
                    color: '#22c55e',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    +{trend.totalChange.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Top Decreasing Majors */}
          {decreasing.length > 0 && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.08)',
              backdropFilter: 'blur(5px)',
              borderRadius: 16,
              padding: '20px',
              border: '1px solid rgba(239, 68, 68, 0.15)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(239, 68, 68, 0.08)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.15)';
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(239, 68, 68, 0.08)';
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.15)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} />
              <h3 style={{
                color: 'white',
                fontSize: '1.5rem',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                position: 'relative',
                zIndex: 1
              }}>
                <TrendingDown size={20} style={{ marginRight: 8, color: '#ef4444' }} /> Top 5 Ngành Giảm Mạnh Nhất
              </h3>
              {decreasing.map((trend, index) => (
                <div key={trend.majorCode} style={{
                  background: 'rgba(42, 82, 152, 0.05)',
                  borderRadius: 8,
                  padding: '15px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  animation: `slideInRight 0.6s ease-out ${0.8 + index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(42, 82, 152, 0.1)';
                  e.currentTarget.style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(42, 82, 152, 0.05)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{
                      color: 'white',
                      fontWeight: '600',
                      margin: '0 0 5px 0'
                    }}>
                      #{index + 1} {trend.majorName}
                    </p>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem',
                      margin: 0
                    }}>
                      Chỉ tiêu 2025: {trend.totalQuota2025.toLocaleString()}
                    </p>
                  </div>
                  <div style={{
                    color: '#ef4444',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {trend.totalChange.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes textGlow {
            from { text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
            to { text-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.3); }
          }
        `}
      </style>
    </div>
  );
}
