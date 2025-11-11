import { Zap, AlertTriangle, Rocket, TrendingUp, Target, Check, BarChart } from "lucide-react";

interface TrendAnalysisProps {
  majorName: string;
  analysis: {
    strengths: string[];
    challenges: string[];
    opportunities: string[];
    marketFactors: string[];
  };
}

export default function TrendAnalysis({ majorName, analysis }: TrendAnalysisProps) {
  const AnalysisCard = ({ 
    title, 
    items, 
    icon, 
    color 
  }: { 
    title: string; 
    items: string[]; 
    icon: React.ReactNode; 
    color: string; 
  }) => (
    <div style={{
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: 15,
      padding: 20,
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 25px 45px rgba(0,0,0,0.1)",
      flex: 1,
      minWidth: 280
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 15
      }}>
        <div style={{
          fontSize: '24px',
          background: color,
          padding: '8px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px'
        }}>
          {icon}
        </div>
        <h3 style={{
          color: 'white',
          margin: 0,
          fontSize: '18px',
          fontWeight: '600'
        }}>
          {title}
        </h3>
      </div>
      
      <ul style={{
        color: 'rgba(255,255,255,0.9)',
        fontSize: '14px',
        lineHeight: 1.6,
        paddingLeft: 0,
        listStyle: 'none',
        margin: 0
      }}>
        {items.map((item, index) => (
          <li key={index} style={{
            padding: '8px 0',
            borderBottom: index < items.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8
          }}>
            <span style={{ 
              color: color, 
              fontWeight: 'bold',
              fontSize: '16px'
            }}>
              •
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 30
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: 20
      }}>
        <h2 style={{
          color: 'white',
          fontSize: '28px',
          fontWeight: '700',
          margin: 0,
          marginBottom: 10
        }}>
          <BarChart size={28} style={{ marginRight: 12 }} /> Phân tích nguyên nhân xu hướng
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '16px',
          margin: 0
        }}>
          Đánh giá toàn diện về ngành {majorName}
        </p>
      </div>

      {/* First Row */}
      <div style={{
        display: 'flex',
        gap: 20,
        flexWrap: 'wrap'
      }}>
        <AnalysisCard
          title="Điểm mạnh"
          items={analysis.strengths}
          icon={<Zap size={20} />}
          color="rgba(34, 197, 94, 0.8)"
        />
        <AnalysisCard
          title="Thách thức"
          items={analysis.challenges}
          icon={<AlertTriangle size={20} />}
          color="rgba(239, 68, 68, 0.8)"
        />
      </div>

      {/* Second Row */}
      <div style={{
        display: 'flex',
        gap: 20,
        flexWrap: 'wrap'
      }}>
        <AnalysisCard
          title="Cơ hội"
          items={analysis.opportunities}
          icon={<Rocket size={20} />}
          color="rgba(59, 130, 246, 0.8)"
        />
        <AnalysisCard
          title="Yếu tố thị trường"
          items={analysis.marketFactors}
          icon={<TrendingUp size={20} />}
          color="rgba(168, 85, 247, 0.8)"
        />
      </div>

      {/* Summary Card */}
      <div style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        borderRadius: 20,
        padding: 30,
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 25px 45px rgba(0,0,0,0.1)",
        textAlign: 'center'
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: '600',
          margin: 0,
          marginBottom: 15
        }}>
          <Target size={20} style={{ marginRight: 8 }} /> Tóm tắt đánh giá
        </h3>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '16px',
          lineHeight: 1.6,
          margin: 0,
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Ngành <strong>{majorName}</strong> đang thể hiện xu hướng tích cực với nhiều cơ hội phát triển. 
          Tuy có những thách thức nhất định, nhưng với sự phát triển của công nghệ và nhu cầu thị trường, 
          đây vẫn là một lựa chọn tiềm năng cho sinh viên trong tương lai.
        </p>
        
        <div style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'center',
          gap: 15,
          flexWrap: 'wrap'
        }}>
          <div style={{
            padding: '8px 16px',
            borderRadius: 20,
            background: 'rgba(34, 197, 94, 0.2)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            color: 'rgb(34, 197, 94)',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <Check size={14} style={{ marginRight: 4 }} /> Triển vọng tốt
          </div>
          <div style={{
            padding: '8px 16px',
            borderRadius: 20,
            background: 'rgba(59, 130, 246, 0.2)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            color: 'rgb(59, 130, 246)',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <BarChart size={14} style={{ marginRight: 4 }} /> Phát triển ổn định
          </div>
          <div style={{
            padding: '8px 16px',
            borderRadius: 20,
            background: 'rgba(168, 85, 247, 0.2)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            color: 'rgb(168, 85, 247)',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <Rocket size={14} style={{ marginRight: 4 }} /> Tiềm năng cao
          </div>
        </div>
      </div>
    </div>
  );
}