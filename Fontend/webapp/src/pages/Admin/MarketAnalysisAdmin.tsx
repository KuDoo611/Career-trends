import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart2,
  Briefcase,
  Filter,
  Flame,
  Globe2,
  Layers3,
  LineChart,
  MapPin,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type TrendPoint = {
  period: string;
  value: number;
};

type TrendDirection = "up" | "neutral" | "down";

type MarketSegment = {
  id: string;
  code: string;
  sector: string;
  segment: string;
  description: string;
  demandScore: number;
  growthRate: number;
  avgSalary: number;
  projectedOpenings: number;
  satisfaction: number;
  riskLevel: "Thấp" | "Trung bình" | "Cao";
  topSkills: string[];
  topLocations: string[];
  certifications: string[];
  opportunities: string[];
  tags: string[];
  trend: TrendDirection;
  trendPoints: TrendPoint[];
};

const formatCurrency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

const PAGE_SIZE = 6;

const marketSegments: MarketSegment[] = [
  {
    id: "AI-01",
    code: "CNTT-AI-01",
    sector: "Công nghệ thông tin",
    segment: "Trí tuệ nhân tạo & ML",
    description:
      "Phát triển mô hình AI phục vụ tự động hoá doanh nghiệp, cá nhân hoá trải nghiệm và tối ưu vận hành.",
    demandScore: 94,
    growthRate: 18.4,
    avgSalary: 32000000,
    projectedOpenings: 4200,
    satisfaction: 86,
    riskLevel: "Thấp",
    topSkills: ["Python", "TensorFlow", "MLOps", "Generative AI"],
    topLocations: ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng"],
    certifications: ["Google ML Professional", "AWS AI Specialty"],
    opportunities: [
      "Tự động hóa quy trình nghiệp vụ",
      "Triển khai trợ lý ảo trong chăm sóc khách hàng",
      "Phân tích dự báo nhu cầu"
    ],
    tags: ["#AI", "#MachineLearning", "#Automation"],
    trend: "up",
    trendPoints: [
      { period: "Q1/24", value: 62 },
      { period: "Q2/24", value: 68 },
      { period: "Q3/24", value: 73 },
      { period: "Q4/24", value: 79 },
      { period: "Q1/25", value: 88 }
    ]
  },
  {
    id: "DATA-01",
    code: "CNTT-DS-02",
    sector: "Công nghệ thông tin",
    segment: "Khoa học dữ liệu",
    description:
      "Phân tích, trực quan hóa và xây dựng mô hình dự báo hỗ trợ ra quyết định dựa trên dữ liệu lớn.",
    demandScore: 91,
    growthRate: 16.1,
    avgSalary: 28500000,
    projectedOpenings: 3600,
    satisfaction: 82,
    riskLevel: "Thấp",
    topSkills: ["SQL", "Python", "Power BI", "Statistics"],
    topLocations: ["TP. Hồ Chí Minh", "Hà Nội"],
    certifications: ["AWS Data Analytics", "Azure Data Scientist"],
    opportunities: [
      "Tối ưu chuỗi cung ứng",
      "Phân tích hành vi người dùng",
      "Quản trị chiến dịch marketing"
    ],
    tags: ["#DataScience", "#Analytics", "#BusinessIntelligence"],
    trend: "up",
    trendPoints: [
      { period: "Q1/24", value: 54 },
      { period: "Q2/24", value: 59 },
      { period: "Q3/24", value: 64 },
      { period: "Q4/24", value: 70 },
      { period: "Q1/25", value: 76 }
    ]
  },
  {
    id: "CYBER-01",
    code: "CNTT-CS-05",
    sector: "Công nghệ thông tin",
    segment: "An toàn thông tin",
    description:
      "Bảo vệ hạ tầng số trước các mối đe dọa, xây dựng chiến lược và quy trình bảo mật toàn diện.",
    demandScore: 88,
    growthRate: 13.7,
    avgSalary: 29500000,
    projectedOpenings: 2400,
    satisfaction: 79,
    riskLevel: "Trung bình",
    topSkills: ["Network Security", "PenTesting", "Incident Response"],
    topLocations: ["Hà Nội", "TP. Hồ Chí Minh"],
    certifications: ["CEH", "CompTIA Security+"],
    opportunities: [
      "Xây dựng SOC nội bộ",
      "Tuân thủ chuẩn bảo mật quốc tế",
      "Giám sát an ninh 24/7"
    ],
    tags: ["#CyberSecurity", "#RiskManagement"],
    trend: "up",
    trendPoints: [
      { period: "Q1/24", value: 48 },
      { period: "Q2/24", value: 53 },
      { period: "Q3/24", value: 57 },
      { period: "Q4/24", value: 61 },
      { period: "Q1/25", value: 65 }
    ]
  },
  {
    id: "AUTO-01",
    code: "COKHI-RO-01",
    sector: "Kỹ thuật & Cơ khí",
    segment: "Tự động hóa và Robot",
    description:
      "Triển khai dây chuyền sản xuất thông minh, robot hợp tác và hệ thống điều khiển thời gian thực.",
    demandScore: 82,
    growthRate: 11.2,
    avgSalary: 26500000,
    projectedOpenings: 2100,
    satisfaction: 75,
    riskLevel: "Trung bình",
    topSkills: ["PLC", "SCADA", "Robotics", "IoT"],
    topLocations: ["Bắc Ninh", "Hải Phòng", "TP. Hồ Chí Minh"],
    certifications: ["Siemens Automation", "ABB Robotics"],
    opportunities: [
      "Nâng cấp nhà máy thông minh",
      "Triển khai robot cộng tác Cobots",
      "Bảo trì dự đoán"
    ],
    tags: ["#Automation", "#Industry40"],
    trend: "neutral",
    trendPoints: [
      { period: "Q1/24", value: 46 },
      { period: "Q2/24", value: 47 },
      { period: "Q3/24", value: 49 },
      { period: "Q4/24", value: 51 },
      { period: "Q1/25", value: 52 }
    ]
  },
  {
    id: "FIN-01",
    code: "KINHFIN-01",
    sector: "Kinh tế & Quản lý",
    segment: "Công nghệ tài chính (Fintech)",
    description:
      "Phát triển nền tảng thanh toán số, cho vay ngang hàng, quản lý tài sản và giải pháp ngân hàng mở.",
    demandScore: 89,
    growthRate: 14.9,
    avgSalary: 27500000,
    projectedOpenings: 2800,
    satisfaction: 81,
    riskLevel: "Trung bình",
    topSkills: ["Product Management", "KYC/AML", "Cloud"],
    topLocations: ["TP. Hồ Chí Minh", "Hà Nội"],
    certifications: ["CFA Level I", "Fintech Foundation"],
    opportunities: [
      "Phát triển ví điện tử thế hệ mới",
      "Tích hợp Open Banking",
      "Ứng dụng AI trong chấm điểm tín dụng"
    ],
    tags: ["#Fintech", "#DigitalBanking", "#Payments"],
    trend: "up",
    trendPoints: [
      { period: "Q1/24", value: 52 },
      { period: "Q2/24", value: 58 },
      { period: "Q3/24", value: 63 },
      { period: "Q4/24", value: 67 },
      { period: "Q1/25", value: 71 }
    ]
  },
  {
    id: "HEALTH-01",
    code: "YD-HT-01",
    sector: "Y dược",
    segment: "Công nghệ sức khỏe số",
    description:
      "Xây dựng hệ thống chẩn đoán từ xa, quản lý hồ sơ bệnh án điện tử và thiết bị đeo theo dõi sức khỏe.",
    demandScore: 84,
    growthRate: 12.6,
    avgSalary: 25500000,
    projectedOpenings: 1900,
    satisfaction: 78,
    riskLevel: "Trung bình",
    topSkills: ["Health Informatics", "IoT", "Analytics"],
    topLocations: ["TP. Hồ Chí Minh", "Hà Nội"],
    certifications: ["Healthcare IT", "HL7"],
    opportunities: [
      "Telemedicine",
      "Hệ thống quản lý bệnh viện",
      "Ứng dụng chăm sóc sức khỏe cá nhân"
    ],
    tags: ["#HealthTech", "#Telehealth"],
    trend: "up",
    trendPoints: [
      { period: "Q1/24", value: 43 },
      { period: "Q2/24", value: 47 },
      { period: "Q3/24", value: 51 },
      { period: "Q4/24", value: 55 },
      { period: "Q1/25", value: 60 }
    ]
  },
  {
    id: "GREEN-01",
    code: "MT-XD-01",
    sector: "Môi trường & Năng lượng",
    segment: "Kỹ sư năng lượng tái tạo",
    description:
      "Thiết kế, vận hành và tối ưu hệ thống điện mặt trời, điện gió và giải pháp lưu trữ năng lượng.",
    demandScore: 78,
    growthRate: 10.5,
    avgSalary: 24500000,
    projectedOpenings: 1700,
    satisfaction: 74,
    riskLevel: "Trung bình",
    topSkills: ["Solar Design", "Energy Storage", "Project Management"],
    topLocations: ["Ninh Thuận", "Bình Thuận", "Gia Lai"],
    certifications: ["LEED AP", "Solar PV Professional"],
    opportunities: [
      "Nhà máy điện mặt trời",
      "Trung tâm lưu trữ năng lượng",
      "Giải pháp tiết kiệm năng lượng"
    ],
    tags: ["#Renewable", "#CleanEnergy"],
    trend: "neutral",
    trendPoints: [
      { period: "Q1/24", value: 39 },
      { period: "Q2/24", value: 40 },
      { period: "Q3/24", value: 42 },
      { period: "Q4/24", value: 43 },
      { period: "Q1/25", value: 45 }
    ]
  },
  {
    id: "LOG-01",
    code: "KT-Log-02",
    sector: "Logistics & Chuỗi cung ứng",
    segment: "Quản trị chuỗi cung ứng số",
    description:
      "Số hóa vận hành kho, vận tải và tối ưu tồn kho theo thời gian thực dựa trên dữ liệu.",
    demandScore: 81,
    growthRate: 11.7,
    avgSalary: 23500000,
    projectedOpenings: 2600,
    satisfaction: 77,
    riskLevel: "Trung bình",
    topSkills: ["ERP", "Demand Planning", "Data Analytics"],
    topLocations: ["Bình Dương", "Hải Phòng", "TP. Hồ Chí Minh"],
    certifications: ["APICS CSCP", "Lean Six Sigma"],
    opportunities: [
      "Kho thông minh",
      "Quản lý vận tải realtime",
      "Chuỗi cung ứng bền vững"
    ],
    tags: ["#SupplyChain", "#LogisticsTech"],
    trend: "up",
    trendPoints: [
      { period: "Q1/24", value: 44 },
      { period: "Q2/24", value: 48 },
      { period: "Q3/24", value: 51 },
      { period: "Q4/24", value: 55 },
      { period: "Q1/25", value: 59 }
    ]
  },
  {
    id: "AGR-01",
    code: "NN-AgriTech-01",
    sector: "Nông nghiệp công nghệ",
    segment: "Nông nghiệp thông minh",
    description:
      "Ứng dụng IoT, cảm biến và phân tích dữ liệu để tối ưu sản lượng và chất lượng nông sản.",
    demandScore: 74,
    growthRate: 9.1,
    avgSalary: 19500000,
    projectedOpenings: 1500,
    satisfaction: 72,
    riskLevel: "Trung bình",
    topSkills: ["IoT", "Data Analytics", "Agronomy"],
    topLocations: ["Lâm Đồng", "Đồng Tháp", "An Giang"],
    certifications: ["Smart Farming", "AgriTech"],
    opportunities: [
      "Trang trại công nghệ cao",
      "Hệ thống tưới thông minh",
      "Chuỗi cung ứng nông sản số"
    ],
    tags: ["#AgriTech", "#SmartFarm"],
    trend: "neutral",
    trendPoints: [
      { period: "Q1/24", value: 33 },
      { period: "Q2/24", value: 35 },
      { period: "Q3/24", value: 36 },
      { period: "Q4/24", value: 38 },
      { period: "Q1/25", value: 39 }
    ]
  },
  {
    id: "DESIGN-01",
    code: "TKST-UX-01",
    sector: "Thiết kế & Sáng tạo",
    segment: "Trải nghiệm người dùng (UX)",
    description:
      "Thiết kế sản phẩm số theo hướng lấy người dùng làm trọng tâm, tối ưu hành trình và chuyển đổi.",
    demandScore: 79,
    growthRate: 10.2,
    avgSalary: 23000000,
    projectedOpenings: 1800,
    satisfaction: 83,
    riskLevel: "Thấp",
    topSkills: ["UX Research", "Design System", "Figma"],
    topLocations: ["TP. Hồ Chí Minh", "Hà Nội"],
    certifications: ["NN/g UX", "Google UX"],
    opportunities: [
      "Tái thiết kế ứng dụng di động",
      "Thiết kế sản phẩm thương mại điện tử",
      "Xây dựng design system"
    ],
    tags: ["#UX", "#Design", "#Product"],
    trend: "up",
    trendPoints: [
      { period: "Q1/24", value: 41 },
      { period: "Q2/24", value: 44 },
      { period: "Q3/24", value: 47 },
      { period: "Q4/24", value: 50 },
      { period: "Q1/25", value: 53 }
    ]
  },
  {
    id: "TOUR-01",
    code: "DL-Tour-01",
    sector: "Du lịch & Dịch vụ",
    segment: "Quản trị du lịch thông minh",
    description:
      "Kết hợp công nghệ số, dữ liệu du lịch và trải nghiệm cá nhân hoá cho khách quốc tế lẫn nội địa.",
    demandScore: 71,
    growthRate: 8.4,
    avgSalary: 18500000,
    projectedOpenings: 1300,
    satisfaction: 76,
    riskLevel: "Trung bình",
    topSkills: ["Digital Marketing", "Business Analytics"],
    topLocations: ["Khánh Hòa", "Đà Nẵng", "TP. Hồ Chí Minh"],
    certifications: ["Smart Tourism", "Hospitality Digital"],
    opportunities: [
      "Nền tảng du lịch thông minh",
      "Ứng dụng hỗ trợ du khách",
      "Quản trị khách sạn bằng IoT"
    ],
    tags: ["#SmartTourism", "#Hospitality"],
    trend: "neutral",
    trendPoints: [
      { period: "Q1/24", value: 28 },
      { period: "Q2/24", value: 31 },
      { period: "Q3/24", value: 32 },
      { period: "Q4/24", value: 34 },
      { period: "Q1/25", value: 35 }
    ]
  },
  {
    id: "EDU-01",
    code: "GD-EdTech-01",
    sector: "Giáo dục",
    segment: "Công nghệ giáo dục",
    description:
      "Phát triển nền tảng học trực tuyến, nội dung số tương tác và công cụ quản lý học tập thông minh.",
    demandScore: 76,
    growthRate: 9.8,
    avgSalary: 20500000,
    projectedOpenings: 1650,
    satisfaction: 80,
    riskLevel: "Thấp",
    topSkills: ["Instructional Design", "Gamification", "Product"],
    topLocations: ["TP. Hồ Chí Minh", "Hà Nội"],
    certifications: ["Learning Experience Designer"],
    opportunities: [
      "Nền tảng học tương tác",
      "Giải pháp quản lý học sinh",
      "Ứng dụng AI chấm điểm tự động"
    ],
    tags: ["#EdTech", "#DigitalLearning"],
    trend: "up",
    trendPoints: [
      { period: "Q1/24", value: 36 },
      { period: "Q2/24", value: 39 },
      { period: "Q3/24", value: 42 },
      { period: "Q4/24", value: 45 },
      { period: "Q1/25", value: 48 }
    ]
  },
  {
    id: "ESG-01",
    code: "QL-ESG-01",
    sector: "Quản trị doanh nghiệp",
    segment: "Chuyên gia ESG",
    description:
      "Tư vấn chiến lược phát triển bền vững, báo cáo ESG và quản trị rủi ro môi trường - xã hội.",
    demandScore: 69,
    growthRate: 7.1,
    avgSalary: 21500000,
    projectedOpenings: 1100,
    satisfaction: 73,
    riskLevel: "Trung bình",
    topSkills: ["Sustainability", "Reporting", "Risk"],
    topLocations: ["TP. Hồ Chí Minh", "Hà Nội"],
    certifications: ["GRI", "Sustainability Manager"],
    opportunities: [
      "Báo cáo ESG bắt buộc",
      "Tư vấn chuyển đổi xanh",
      "Đánh giá chuỗi cung ứng bền vững"
    ],
    tags: ["#ESG", "#Sustainability"],
    trend: "neutral",
    trendPoints: [
      { period: "Q1/24", value: 24 },
      { period: "Q2/24", value: 26 },
      { period: "Q3/24", value: 27 },
      { period: "Q4/24", value: 29 },
      { period: "Q1/25", value: 30 }
    ]
  }
];

type ChipOption = {
  id: string;
  label: string;
};

const riskOptions: ChipOption[] = [
  { id: "all", label: "Tất cả rủi ro" },
  { id: "Thấp", label: "Rủi ro thấp" },
  { id: "Trung bình", label: "Rủi ro trung bình" },
  { id: "Cao", label: "Rủi ro cao" }
];

const SORT_OPTIONS = [
  { id: "growth", label: "Tăng trưởng" },
  { id: "demand", label: "Nhu cầu" },
  { id: "salary", label: "Lương trung bình" },
  { id: "openings", label: "Số vị trí" }
];

function Sparkline({ points, color = "#4ade80" }: { points: TrendPoint[]; color?: string }) {
  if (!points.length) return null;

  const width = 160;
  const height = 50;
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const svgPoints = points
    .map((p, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((p.value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="50"
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        points={svgPoints}
      />
    </svg>
  );
}

function TrendBadge({ trend }: { trend: TrendDirection }) {
  const config: Record<TrendDirection, { label: string; color: string; icon: ReactNode }> = {
    up: {
      label: "Đang tăng",
      color: "rgba(34,197,94,0.12)",
      icon: <TrendingUp size={16} color="#22c55e" />
    },
    neutral: {
      label: "Ổn định",
      color: "rgba(14,165,233,0.12)",
      icon: <LineChart size={16} color="#38bdf8" />
    },
    down: {
      label: "Giảm nhẹ",
      color: "rgba(248,113,113,0.12)",
      icon: <TrendingDown size={16} color="#f87171" />
    }
  };

  const item = config[trend];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: item.color,
        color: "#fff",
        padding: "6px 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600
      }}
    >
      {item.icon}
      {item.label}
    </span>
  );
}

function ChipButton({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        borderRadius: 999,
        border: "1px solid",
        borderColor: active ? "rgba(96,165,250,0.7)" : "rgba(148,163,184,0.2)",
        background: active ? "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(59,130,246,0.1))" : "rgba(15,23,42,0.4)",
        color: "#e2e8f0",
        fontSize: 13,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        transition: "border-color 0.15s ease"
      }}
    >
      <Filter size={14} />
      {label}
    </button>
  );
}

function AnalyticsCard({
  icon,
  title,
  value,
  description,
  accent
}: {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: "rgba(15,23,42,0.66)",
        borderRadius: 24,
        padding: "22px 24px",
        border: "1px solid rgba(148,163,184,0.12)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: "0 12px 40px rgba(15,23,42,0.55)"
      }}
    >
      <span
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          background: accent,
          display: "grid",
          placeItems: "center"
        }}
      >
        {icon}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>{title}</span>
        <span style={{ fontSize: 28, fontWeight: 700, color: "#f8fafc", letterSpacing: 0.4 }}>{value}</span>
        <span style={{ color: "#cbd5f5", fontSize: 13 }}>{description}</span>
      </div>
    </div>
  );
}

function InlineStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderRadius: 18,
        background: "rgba(15,23,42,0.5)",
        border: "1px solid rgba(148,163,184,0.14)"
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          background: "rgba(59,130,246,0.25)",
          display: "grid",
          placeItems: "center"
        }}
      >
        {icon}
      </span>
      <div>
        <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 600 }}>{value}</div>
      </div>
    </div>
  );
}

export default function MarketAnalysisAdmin() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("Tất cả lĩnh vực");
  const [selectedRisk, setSelectedRisk] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("growth");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sectors = useMemo<ChipOption[]>(() => {
    const unique = Array.from(new Set(marketSegments.map((item) => item.sector)));
    return [{ id: "Tất cả lĩnh vực", label: "Tất cả lĩnh vực" }, ...unique.map((item) => ({ id: item, label: item }))];
  }, []);

  const filteredSegments = useMemo(() => {
    return marketSegments
      .filter((segment) => {
        const matchesSearch = `${segment.segment} ${segment.sector} ${segment.tags.join(" ")}`
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());

        const matchesSector =
          selectedSector === "Tất cả lĩnh vực" || segment.sector === selectedSector;

        const matchesRisk = selectedRisk === "all" || segment.riskLevel === selectedRisk;

        return matchesSearch && matchesSector && matchesRisk;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "demand":
            return b.demandScore - a.demandScore;
          case "salary":
            return b.avgSalary - a.avgSalary;
          case "openings":
            return b.projectedOpenings - a.projectedOpenings;
          case "growth":
          default:
            return b.growthRate - a.growthRate;
        }
      });
  }, [searchTerm, selectedSector, selectedRisk, sortOption]);

  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(filteredSegments[0]?.id ?? null);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredSegments.length / PAGE_SIZE)), [filteredSegments]);

  const paginatedSegments = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredSegments.slice(start, start + PAGE_SIZE);
  }, [filteredSegments, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSector, selectedRisk, sortOption]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!paginatedSegments.length) {
      setSelectedSegmentId(null);
      return;
    }

    const isSelectedVisible = paginatedSegments.some((segment) => segment.id === selectedSegmentId);
    if (!isSelectedVisible) {
      setSelectedSegmentId(paginatedSegments[0].id);
    }
  }, [paginatedSegments, selectedSegmentId]);

  const selectedSegment = useMemo(
    () => filteredSegments.find((segment) => segment.id === selectedSegmentId) ?? filteredSegments[0] ?? null,
    [filteredSegments, selectedSegmentId]
  );

  const analytics = useMemo(() => {
    const totalSegments = marketSegments.length;
    const avgGrowth =
      marketSegments.reduce((acc, segment) => acc + segment.growthRate, 0) /
      (marketSegments.length || 1);
    const totalOpenings = marketSegments.reduce((acc, segment) => acc + segment.projectedOpenings, 0);
    const highDemand = marketSegments.filter((segment) => segment.demandScore >= 85).length;

    return {
      totalSegments,
      avgGrowth: `${avgGrowth.toFixed(1)}%`,
      totalOpenings: totalOpenings.toLocaleString("vi-VN"),
      highDemand
    };
  }, []);

  const highlightedSegment = useMemo(() => {
    return marketSegments.reduce((prev, current) =>
      current.growthRate > prev.growthRate ? current : prev
    );
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1f3c88, #0b1629 62%)",
        padding: "28px 40px 48px",
        color: "#e2e8f0",
        fontFamily: "'Be Vietnam Pro', 'Inter', sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 28
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 16,
              background: "rgba(15,23,42,0.45)",
              border: "1px solid rgba(148,163,184,0.2)",
              color: "#e2e8f0",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <div>
            <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, color: "#f8fafc" }}>Phân tích thị trường</h1>
            <p style={{ marginTop: 6, color: "#94a3b8", fontSize: 16 }}>
              Theo dõi xu hướng nghề nghiệp, mức độ cạnh tranh và cơ hội phát triển cho từng lĩnh vực trọng điểm.
            </p>
          </div>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20
          }}
        >
          <AnalyticsCard
            icon={<Briefcase size={22} color="#38bdf8" />}
            title="Tổng số phân khúc"
            value={String(analytics.totalSegments)}
            description="Phân khúc tiềm năng đang được theo dõi"
            accent="linear-gradient(135deg, rgba(56,189,248,0.35), rgba(14,116,144,0.2))"
          />
          <AnalyticsCard
            icon={<TrendingUp size={22} color="#22c55e" />}
            title="Tăng trưởng trung bình"
            value={analytics.avgGrowth}
            description="Mức tăng trưởng dự kiến trong 12 tháng"
            accent="linear-gradient(135deg, rgba(34,197,94,0.35), rgba(6,95,70,0.25))"
          />
          <AnalyticsCard
            icon={<Users size={22} color="#f9a8d4" />}
            title="Nhu cầu cao"
            value={`${analytics.highDemand} phân khúc`}
            description="Điểm nhu cầu ≥ 85 đang dẫn đầu thị trường"
            accent="linear-gradient(135deg, rgba(244,114,182,0.32), rgba(190,24,93,0.2))"
          />
          <AnalyticsCard
            icon={<Wallet size={22} color="#facc15" />}
            title="Vị trí tuyển dụng"
            value={`${analytics.totalOpenings}+`}
            description="Cơ hội tuyển dụng dự kiến trên cả nước"
            accent="linear-gradient(135deg, rgba(250,204,21,0.35), rgba(161,98,7,0.25))"
          />
        </section>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            background: "rgba(15,23,42,0.55)",
            borderRadius: 26,
            padding: 24,
            border: "1px solid rgba(148,163,184,0.14)",
            boxShadow: "0 20px 52px rgba(15,23,42,0.65)"
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "space-between",
              alignItems: "stretch"
            }}
          >
            <div
              style={{
                flex: "1 1 320px",
                minWidth: 260,
                background: "rgba(2,132,199,0.08)",
                borderRadius: 18,
                padding: 16,
                border: "1px solid rgba(56,189,248,0.12)"
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: "#7dd3fc", textTransform: "uppercase" }}>
                Bộ lọc thông minh
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginTop: 16
                }}
              >
                {sectors.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSelectedSector(option.id);
                      setSelectedSegmentId(null);
                    }}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 999,
                      border: "1px solid",
                      borderColor:
                        selectedSector === option.id ? "rgba(56,189,248,0.8)" : "rgba(148,163,184,0.2)",
                      background:
                        selectedSector === option.id
                          ? "linear-gradient(135deg, rgba(56,189,248,0.25), rgba(56,189,248,0.1))"
                          : "rgba(8,47,73,0.2)",
                      color: "#e0f2fe",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer"
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                flex: "0 1 280px",
                display: "flex",
                flexDirection: "column",
                gap: 14
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 18,
                  border: "1px solid rgba(148,163,184,0.1)",
                  background: "rgba(15,23,42,0.66)"
                }}
              >
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Tìm kiếm theo phân khúc, lĩnh vực, hashtag"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    color: "#f8fafc",
                    fontSize: 14,
                    outline: "none"
                  }}
                />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {riskOptions.map((option) => (
                  <ChipButton
                    key={option.id}
                    label={option.label}
                    active={selectedRisk === option.id || (option.id === "all" && selectedRisk === "all")}
                    onClick={() => setSelectedRisk(option.id)}
                  />
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#cbd5f5" }}>Sắp xếp theo</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSortOption(option.id)}
                      style={{
                        padding: "10px 18px",
                        borderRadius: 999,
                        border: "1px solid",
                        borderColor:
                          sortOption === option.id ? "rgba(96,165,250,0.8)" : "rgba(148,163,184,0.2)",
                        background:
                          sortOption === option.id
                            ? "linear-gradient(135deg, rgba(96,165,250,0.28), rgba(59,130,246,0.12))"
                            : "rgba(8,47,73,0.2)",
                        color: "#dbeafe",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer"
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
              gap: 20,
              alignItems: "stretch"
            }}
          >
            <div
              style={{
                background: "rgba(15,23,42,0.72)",
                borderRadius: 24,
                border: "1px solid rgba(148,163,184,0.12)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 24px",
                  borderBottom: "1px solid rgba(148,163,184,0.12)"
                }}
              >
                <div>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f8fafc" }}>
                    Danh sách phân khúc
                  </h2>
                  <p style={{ margin: 6, color: "#94a3b8", fontSize: 13 }}>
                    {filteredSegments.length} phân khúc phù hợp với bộ lọc hiện tại
                  </p>
                </div>
                <InlineStat
                  icon={<Layers3 size={18} color="#38bdf8" />}
                  label="Tổng quan"
                  value={`${selectedSector === "Tất cả lĩnh vực" ? "Tất cả" : selectedSector}`}
                />
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
                  <thead>
                    <tr style={{ color: "#64748b", fontSize: 12, letterSpacing: 1.1, textTransform: "uppercase" }}>
                      <th style={tableHeaderStyle}>Mã</th>
                      <th style={tableHeaderStyle}>Phân khúc</th>
                      <th style={tableHeaderStyle}>Lĩnh vực</th>
                      <th style={tableHeaderStyle}>Nhu cầu</th>
                      <th style={tableHeaderStyle}>Tăng trưởng</th>
                      <th style={tableHeaderStyle}>Lương TB</th>
                      <th style={tableHeaderStyle}>Vị trí</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSegments.map((segment) => {
                      const isActive = selectedSegment?.id === segment.id;
                      return (
                        <tr
                          key={segment.id}
                          onClick={() => setSelectedSegmentId(segment.id)}
                          style={{
                            cursor: "pointer",
                            transition: "background 0.2s ease",
                            background: isActive ? "rgba(59,130,246,0.18)" : "transparent"
                          }}
                        >
                          <td style={getBodyCellStyle(isActive)}>{segment.code}</td>
                          <td style={getBodyCellStyle(isActive)}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                              <span style={{ fontWeight: 600, color: "#f8fafc" }}>{segment.segment}</span>
                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                {segment.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    style={{
                                      padding: "4px 8px",
                                      borderRadius: 999,
                                      background: "rgba(59,130,246,0.16)",
                                      color: "#bfdbfe",
                                      fontSize: 11,
                                      fontWeight: 600
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td style={getBodyCellStyle(isActive)}>{segment.sector}</td>
                          <td style={getBodyCellStyle(isActive)}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                              <span style={{ fontWeight: 600, color: "#38bdf8" }}>{segment.demandScore}/100</span>
                              <ProgressBar value={segment.demandScore} color="#38bdf8" />
                            </div>
                          </td>
                          <td style={getBodyCellStyle(isActive)}>
                            <span style={{ color: "#22c55e", fontWeight: 600 }}>{segment.growthRate.toFixed(1)}%</span>
                          </td>
                          <td style={getBodyCellStyle(isActive)}>{formatCurrency.format(segment.avgSalary)}</td>
                          <td style={getBodyCellStyle(isActive)}>{segment.projectedOpenings.toLocaleString("vi-VN")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 24px",
                  borderTop: "1px solid rgba(148,163,184,0.12)",
                  background: "rgba(10,20,38,0.6)"
                }}
              >
                <span style={{ fontSize: 13, color: "#94a3b8" }}>
                  Trang {currentPage}/{totalPages}
                </span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 12,
                      border: "1px solid rgba(148,163,184,0.18)",
                      background: currentPage === 1 ? "rgba(15,23,42,0.3)" : "rgba(30,64,175,0.25)",
                      color: currentPage === 1 ? "rgba(148,163,184,0.5)" : "#dbeafe",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      fontWeight: 600
                    }}
                  >
                    Trước
                  </button>
                  <div style={{ display: "flex", gap: 6 }}>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          border: "1px solid",
                          borderColor:
                            currentPage === page ? "rgba(96,165,250,0.8)" : "rgba(148,163,184,0.18)",
                          background:
                            currentPage === page
                              ? "linear-gradient(135deg, rgba(96,165,250,0.28), rgba(59,130,246,0.12))"
                              : "rgba(15,23,42,0.4)",
                          color: "#dbeafe",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 12,
                      border: "1px solid rgba(148,163,184,0.18)",
                      background:
                        currentPage === totalPages ? "rgba(15,23,42,0.3)" : "linear-gradient(135deg, rgba(56,189,248,0.25), rgba(56,189,248,0.1))",
                      color: currentPage === totalPages ? "rgba(148,163,184,0.5)" : "#e0f2fe",
                      cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                      fontWeight: 600
                    }}
                  >
                    Sau
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(15,23,42,0.72)",
                borderRadius: 24,
                border: "1px solid rgba(148,163,184,0.12)",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                minHeight: 420
              }}
            >
              {selectedSegment ? (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>
                        {selectedSegment.segment}
                      </h3>
                      <p style={{ marginTop: 8, color: "#cbd5f5", fontSize: 14 }}>{selectedSegment.description}</p>
                    </div>
                    <TrendBadge trend={selectedSegment.trend} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
                    <InlineStat
                      icon={<TrendingUp size={16} color="#22c55e" />}
                      label="Tăng trưởng"
                      value={`${selectedSegment.growthRate.toFixed(1)}%/năm`}
                    />
                    <InlineStat
                      icon={<BarChart2 size={16} color="#38bdf8" />}
                      label="Nhu cầu"
                      value={`${selectedSegment.demandScore}/100`}
                    />
                    <InlineStat
                      icon={<Wallet size={16} color="#facc15" />}
                      label="Lương trung bình"
                      value={formatCurrency.format(selectedSegment.avgSalary)}
                    />
                    <InlineStat
                      icon={<Users size={16} color="#f472b6" />}
                      label="Vị trí/ năm"
                      value={selectedSegment.projectedOpenings.toLocaleString("vi-VN")}
                    />
                  </div>

                  <div
                    style={{
                      borderRadius: 20,
                      border: "1px solid rgba(59,130,246,0.18)",
                      background: "rgba(30,64,175,0.18)",
                      padding: 18
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", color: "#bfdbfe" }}>
                        Xu hướng nhu cầu 24 tháng
                      </span>
                      <span style={{ fontSize: 12, color: "#93c5fd" }}>Điểm nhu cầu</span>
                    </div>
                    <Sparkline points={selectedSegment.trendPoints} />
                  </div>

                  <div style={{ display: "grid", gap: 12 }}>
                    <HighlightCard
                      title="Kỹ năng ưu tiên"
                      icon={<Sparkles size={18} color="#f9a8d4" />}
                      items={selectedSegment.topSkills}
                    />
                    <HighlightCard
                      title="Địa điểm nổi bật"
                      icon={<MapPin size={18} color="#fca5a5" />}
                      items={selectedSegment.topLocations}
                    />
                    <HighlightCard
                      title="Chứng chỉ đề xuất"
                      icon={<CertificateIcon />}
                      items={selectedSegment.certifications}
                    />
                    <HighlightCard
                      title="Cơ hội triển khai"
                      icon={<Globe2 size={18} color="#7dd3fc" />}
                      items={selectedSegment.opportunities}
                    />
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    color: "#94a3b8",
                    minHeight: 300
                  }}
                >
                  <BarChart2 size={42} />
                  <p style={{ margin: 0 }}>Chọn một phân khúc để xem chi tiết</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 24
          }}
        >
          <div
            style={{
              background: "rgba(15,23,42,0.6)",
              borderRadius: 22,
              padding: 24,
              border: "1px solid rgba(148,163,184,0.14)",
              display: "flex",
              flexDirection: "column",
              gap: 16
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f8fafc" }}>Phân khúc tăng trưởng nhanh</h3>
              <TrendBadge trend={highlightedSegment.trend} />
            </div>
            <p style={{ margin: 0, color: "#cbd5f5", fontSize: 14 }}>{highlightedSegment.description}</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <InlineStat
                icon={<Flame size={18} color="#f87171" />}
                label="Tăng trưởng"
                value={`${highlightedSegment.growthRate.toFixed(1)}%/năm`}
              />
              <InlineStat
                icon={<Briefcase size={18} color="#38bdf8" />}
                label="Vị trí dự kiến"
                value={`${highlightedSegment.projectedOpenings.toLocaleString("vi-VN")}`}
              />
              <InlineStat
                icon={<Wallet size={18} color="#facc15" />}
                label="Thu nhập"
                value={formatCurrency.format(highlightedSegment.avgSalary)}
              />
            </div>
            <Sparkline points={highlightedSegment.trendPoints} color="#f97316" />
          </div>

          <div
            style={{
              background: "rgba(15,23,42,0.6)",
              borderRadius: 22,
              padding: 24,
              border: "1px solid rgba(148,163,184,0.14)",
              display: "flex",
              flexDirection: "column",
              gap: 16
            }}
          >
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f8fafc" }}>Cảnh báo rủi ro</h3>
            <p style={{ margin: 0, color: "#cbd5f5", fontSize: 14 }}>
              Theo dõi các phân khúc có mức rủi ro cao để chuẩn bị chiến lược đào tạo và điều chỉnh chỉ tiêu kịp thời.
            </p>
            <div style={{ display: "grid", gap: 12 }}>
              {marketSegments
                .filter((segment) => segment.riskLevel === "Cao")
                .map((segment) => (
                  <div
                    key={segment.id}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 18,
                      border: "1px solid rgba(248,113,113,0.26)",
                      background: "rgba(127,29,29,0.28)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, color: "#fecaca" }}>{segment.segment}</span>
                      <AlertTriangle size={18} color="#fca5a5" />
                    </div>
                    <span style={{ fontSize: 12, color: "#fecaca" }}>
                      Nhu cầu {segment.demandScore}/100 • Tăng trưởng {segment.growthRate.toFixed(1)}% • Lương {formatCurrency.format(
                        segment.avgSalary
                      )}
                    </span>
                  </div>
                ))}
              {marketSegments.filter((segment) => segment.riskLevel === "Cao").length === 0 && (
                <div
                  style={{
                    padding: 20,
                    borderRadius: 18,
                    border: "1px dashed rgba(148,163,184,0.3)",
                    color: "#94a3b8",
                    textAlign: "center"
                  }}
                >
                  Hiện không có phân khúc nào ở mức rủi ro cao.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const tableHeaderStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "14px 24px",
  borderBottom: "1px solid rgba(148,163,184,0.12)",
  fontWeight: 700
};

function getBodyCellStyle(active: boolean): React.CSSProperties {
  return {
    padding: "18px 24px",
    borderBottom: "1px solid rgba(148,163,184,0.08)",
    fontSize: 14,
    color: active ? "#f8fafc" : "#cbd5f5"
  };
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div
      style={{
        height: 6,
        borderRadius: 999,
        background: "rgba(148,163,184,0.18)",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: `${Math.min(100, value)}%`,
          height: "100%",
          borderRadius: 999,
          background: color
        }}
      />
    </div>
  );
}

function HighlightCard({
  title,
  icon,
  items
}: {
  title: string;
  icon: ReactNode;
  items: string[];
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid rgba(148,163,184,0.14)",
        background: "rgba(15,23,42,0.5)",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 12
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: 12,
            background: "rgba(59,130,246,0.18)",
            display: "grid",
            placeItems: "center"
          }}
        >
          {icon}
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#f8fafc" }}>{title}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((item) => (
          <span
            key={item}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(59,130,246,0.16)",
              color: "#dbeafe",
              fontSize: 12,
              fontWeight: 600
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function CertificateIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 2H16.5C17.8807 2 19 3.11929 19 4.5V15.5C19 16.8807 17.8807 18 16.5 18H13L12 22L11 18H7.5C6.11929 18 5 16.8807 5 15.5V4.5C5 3.11929 6.11929 2 7.5 2Z"
        stroke="#f9a8d4"
        strokeWidth="1.4"
      />
      <path d="M9 6H15" stroke="#f9a8d4" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 9H15" stroke="#f9a8d4" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 12H13" stroke="#f9a8d4" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
