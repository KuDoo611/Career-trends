import type { TrendAnalysis } from "../../model/AdmissionModel";
import { BarChart, TrendingUp, TrendingDown, ArrowUp, ArrowDown, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface TrendStatsProps {
  increasing: TrendAnalysis[];
  decreasing: TrendAnalysis[];
}

export default function TrendStats({ increasing, decreasing }: TrendStatsProps) {
  const [animatedValues, setAnimatedValues] = useState({
    totalMajors: 0,
    avgIncrease: 0,
    avgDecrease: 0
  });

  const totalMajors = increasing.length + decreasing.length;
  const avgIncrease = increasing.length > 0
    ? increasing.reduce((sum, item) => sum + item.totalChange, 0) / increasing.length
    : 0;
  const avgDecrease = decreasing.length > 0
    ? decreasing.reduce((sum, item) => sum + item.totalChange, 0) / decreasing.length
    : 0;

  const topIncreasing = increasing[0];
  const topDecreasing = decreasing[0];

  // Animate counters on mount
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedValues({
        totalMajors: Math.floor(totalMajors * progress),
        avgIncrease: avgIncrease * progress,
        avgDecrease: avgDecrease * progress
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues({
          totalMajors,
          avgIncrease,
          avgDecrease
        });
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [totalMajors, avgIncrease, avgDecrease]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '40px'
    }}>
      {/* Tổng quan */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(8px)',
        borderRadius: 16,
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
      }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }} />
        <div style={{
          width: '50px',
          height: '50px',
          background: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 4px 12px rgba(71, 85, 105, 0.3)',
          position: 'relative'
        }}>
          <BarChart size={28} color="white" />
          <div style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '20px',
            height: '20px',
            background: '#10b981',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Activity size={10} color="white" />
          </div>
        </div>
        <h3 style={{
          color: 'white',
          margin: '0 0 12px 0',
          fontSize: '1.1rem',
          fontWeight: '600',
          position: 'relative',
          zIndex: 1
        }}>
          Tổng quan
        </h3>
        <p style={{
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          position: 'relative',
          zIndex: 1,
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          {animatedValues.totalMajors}
        </p>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.95rem',
          margin: 0,
          position: 'relative',
          zIndex: 1
        }}>
          ngành được phân tích
        </p>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #475569 0%, #64748b 50%, #94a3b8 100%)',
          borderRadius: '0 0 16px 16px'
        }} />
      </div>

      {/* Ngành tăng mạnh nhất */}
      {topIncreasing && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.06)',
          backdropFilter: 'blur(8px)',
          borderRadius: 16,
          padding: '20px',
          border: '1px solid rgba(34, 197, 94, 0.15)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(34, 197, 94, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(34, 197, 94, 0.08)';
        }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)'
          }} />
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
            position: 'relative'
          }}>
            <TrendingUp size={28} color="white" />
          </div>
          <h3 style={{
            color: 'white',
            margin: '0 0 12px 0',
            fontSize: '1.1rem',
            fontWeight: '600',
            position: 'relative',
            zIndex: 1
          }}>
            Tăng mạnh nhất
          </h3>
          <p style={{
            color: 'white',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            margin: '8px 0',
            position: 'relative',
            zIndex: 1
          }}>
            {topIncreasing.majorName}
          </p>
          <p style={{
            color: '#22c55e',
            fontSize: '2.2rem',
            fontWeight: 'bold',
            margin: 0,
            position: 'relative',
            zIndex: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            +{topIncreasing.totalChange.toFixed(1)}%
          </p>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '0 0 16px 16px'
          }} />
        </div>
      )}

      {/* Ngành giảm mạnh nhất */}
      {topDecreasing && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.06)',
          backdropFilter: 'blur(8px)',
          borderRadius: 16,
          padding: '20px',
          border: '1px solid rgba(239, 68, 68, 0.15)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(239, 68, 68, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(239, 68, 68, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(239, 68, 68, 0.08)';
        }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)'
          }} />
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
            position: 'relative'
          }}>
            <TrendingDown size={28} color="white" />
          </div>
          <h3 style={{
            color: 'white',
            margin: '0 0 12px 0',
            fontSize: '1.1rem',
            fontWeight: '600',
            position: 'relative',
            zIndex: 1
          }}>
            Giảm mạnh nhất
          </h3>
          <p style={{
            color: 'white',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            margin: '8px 0',
            position: 'relative',
            zIndex: 1
          }}>
            {topDecreasing.majorName}
          </p>
          <p style={{
            color: '#ef4444',
            fontSize: '2.2rem',
            fontWeight: 'bold',
            margin: 0,
            position: 'relative',
            zIndex: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            {topDecreasing.totalChange.toFixed(1)}%
          </p>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
            borderRadius: '0 0 16px 16px'
          }} />
        </div>
      )}

      {/* Mức tăng trung bình */}
      {increasing.length > 0 && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(8px)',
          borderRadius: 16,
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.04) 100%)'
          }} />
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
            position: 'relative'
          }}>
            <ArrowUp size={28} color="white" />
          </div>
          <h3 style={{
            color: 'white',
            margin: '0 0 12px 0',
            fontSize: '1.1rem',
            fontWeight: '600',
            position: 'relative',
            zIndex: 1
          }}>
            Tăng trung bình
          </h3>
          <p style={{
            color: '#22c55e',
            fontSize: '2.2rem',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            +{animatedValues.avgIncrease.toFixed(1)}%
          </p>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.95rem',
            margin: 0,
            position: 'relative',
            zIndex: 1
          }}>
            từ {increasing.length} ngành
          </p>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '0 0 16px 16px'
          }} />
        </div>
      )}

      {/* Mức giảm trung bình */}
      {decreasing.length > 0 && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(8px)',
          borderRadius: 16,
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.04) 100%)'
          }} />
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
            position: 'relative'
          }}>
            <ArrowDown size={28} color="white" />
          </div>
          <h3 style={{
            color: 'white',
            margin: '0 0 12px 0',
            fontSize: '1.1rem',
            fontWeight: '600',
            position: 'relative',
            zIndex: 1
          }}>
            Giảm trung bình
          </h3>
          <p style={{
            color: '#ef4444',
            fontSize: '2.2rem',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            {animatedValues.avgDecrease.toFixed(1)}%
          </p>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.95rem',
            margin: 0,
            position: 'relative',
            zIndex: 1
          }}>
            từ {decreasing.length} ngành
          </p>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
            borderRadius: '0 0 16px 16px'
          }} />
        </div>
      )}
    </div>
  );
}