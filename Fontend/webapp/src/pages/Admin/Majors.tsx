import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  GraduationCap,
  ArrowUpRight,
  Building2,
  Sparkles,
  Target,
  Briefcase,
  Plus,
  Layers,
  Star,
  ArrowLeft
} from "lucide-react";
import type { Major } from "../../model/MajorModel";

type TrendDirection = "up" | "neutral" | "down";

type AdminMajor = Major & {
  field: string;
  description: string;
  demandScore: number; // 0 - 100
  growth: number; // %
  averageSalary: number; // VND
  topUniversities: string[];
  tags: string[];
  skills: string[];
  opportunities: string;
  trend: TrendDirection;
};

const mockMajors: AdminMajor[] = [
  {
    majorCode: "CNTT01",
    majorName: "Khoa học Máy tính",
    field: "Công nghệ thông tin",
    description: "Nghiên cứu thuật toán, trí tuệ nhân tạo, phát triển phần mềm và tối ưu hệ thống.",
    demandScore: 92,
    growth: 14.8,
    averageSalary: 22000000,
    topUniversities: ["ĐH Bách Khoa Hà Nội", "ĐH Công nghệ - ĐHQGHN", "ĐH FPT"],
    tags: ["AI", "Machine Learning", "Cloud"],
    skills: ["Python", "Thuật toán", "Kiến trúc hệ thống"],
    opportunities: "Các vị trí kỹ sư AI, kiến trúc sư giải pháp, chuyên gia dữ liệu và R&D.",
    trend: "up"
  },
  {
    majorCode: "CNTT02",
    majorName: "Kỹ thuật Phần mềm",
    field: "Công nghệ thông tin",
    description: "Phát triển, kiểm thử, triển khai và bảo trì hệ thống phần mềm quy mô lớn.",
    demandScore: 89,
    growth: 12.1,
    averageSalary: 20000000,
    topUniversities: ["ĐH Bách Khoa TP.HCM", "ĐH FPT", "ĐH Công nghệ Thông tin - ĐHQG"],
    tags: ["DevOps", "Microservices", "Agile"],
    skills: ["Java", "CI/CD", "Thiết kế hệ thống"],
    opportunities: "Kỹ sư phần mềm, trưởng nhóm phát triển, kỹ sư DevOps tại các tập đoàn công nghệ.",
    trend: "up"
  },
  {
    majorCode: "CNTT03",
    majorName: "An toàn Thông tin",
    field: "Công nghệ thông tin",
    description: "Bảo mật hệ thống, phân tích rủi ro, phòng chống tấn công mạng và pháp y số.",
    demandScore: 95,
    growth: 17.6,
    averageSalary: 24000000,
    topUniversities: ["HV Kỹ thuật Mật mã", "ĐH Bách Khoa Hà Nội", "ĐH Công nghệ thông tin - ĐHQG"],
    tags: ["Cyber Security", "PenTest", "SOC"],
    skills: ["Phân tích mã độc", "Thiết kế hệ thống an toàn", "Điều tra số"],
    opportunities: "Chuyên gia an ninh mạng, chuyên viên SOC, chuyên gia tư vấn bảo mật.",
    trend: "up"
  },
  {
    majorCode: "BUS01",
    majorName: "Quản trị Kinh doanh",
    field: "Kinh tế & Quản lý",
    description: "Chiến lược, vận hành, marketing và quản trị nguồn lực trong doanh nghiệp.",
    demandScore: 78,
    growth: 6.2,
    averageSalary: 18000000,
    topUniversities: ["ĐH Kinh tế Quốc dân", "ĐH Thương mại", "FTU"],
    tags: ["Strategy", "Marketing", "Leadership"],
    skills: ["Phân tích thị trường", "Lập kế hoạch", "Quản lý dự án"],
    opportunities: "Quản lý dự án, chuyên viên chiến lược, giám đốc vận hành, quản lý thương hiệu.",
    trend: "neutral"
  },
  {
    majorCode: "BUS02",
    majorName: "Marketing số",
    field: "Kinh tế & Quản lý",
    description: "Chiến lược truyền thông đa kênh, tối ưu chuyển đổi và phân tích dữ liệu khách hàng.",
    demandScore: 84,
    growth: 9.7,
    averageSalary: 16500000,
    topUniversities: ["ĐH Kinh tế Quốc dân", "RMIT", "ĐH Thương mại"],
    tags: ["Digital Marketing", "Growth", "Content"],
    skills: ["SEO/SEM", "Phân tích dữ liệu", "Creative"],
    opportunities: "Chuyên viên digital, trưởng phòng marketing, growth manager.",
    trend: "up"
  },
  {
    majorCode: "BUS03",
    majorName: "Tài chính - Ngân hàng",
    field: "Kinh tế & Quản lý",
    description: "Quản lý tài chính, đầu tư, ngân hàng và phân tích thị trường vốn.",
    demandScore: 81,
    growth: 5.4,
    averageSalary: 19000000,
    topUniversities: ["HV Ngân hàng", "HV Tài chính", "ĐH Kinh tế TP.HCM"],
    tags: ["Fintech", "Phân tích đầu tư", "Risk"],
    skills: ["Phân tích tài chính", "Quản lý rủi ro", "Định giá"],
    opportunities: "Chuyên viên tài chính, phân tích đầu tư, chuyên viên tín dụng, quản lý rủi ro.",
    trend: "neutral"
  },
  {
    majorCode: "HLT01",
    majorName: "Y khoa",
    field: "Y dược",
    description: "Chẩn đoán, điều trị bệnh, nghiên cứu y học và chăm sóc sức khỏe cộng đồng.",
    demandScore: 88,
    growth: 7.3,
    averageSalary: 26000000,
    topUniversities: ["ĐH Y Hà Nội", "ĐH Y Dược TP.HCM", "HV Quân Y"],
    tags: ["Healthcare", "Diagnostics", "Research"],
    skills: ["Lâm sàng", "Phẫu thuật", "Chăm sóc bệnh nhân"],
    opportunities: "Bác sĩ đa khoa, bác sĩ chuyên khoa, nhà nghiên cứu y sinh, quản lý bệnh viện.",
    trend: "up"
  },
  {
    majorCode: "HLT02",
    majorName: "Dược học",
    field: "Y dược",
    description: "Nghiên cứu, sản xuất, kiểm nghiệm thuốc và quản lý phân phối dược phẩm.",
    demandScore: 83,
    growth: 6.5,
    averageSalary: 20000000,
    topUniversities: ["ĐH Dược Hà Nội", "ĐH Y Dược TP.HCM", "ĐH Nguyễn Tất Thành"],
    tags: ["Pharmaceutical", "R&D", "QA"],
    skills: ["Bào chế", "Kiểm nghiệm", "Quản lý chất lượng"],
    opportunities: "Dược sĩ bệnh viện, kiểm nghiệm viên, chuyên viên phát triển thuốc.",
    trend: "neutral"
  },
  {
    majorCode: "HLT03",
    majorName: "Điều dưỡng",
    field: "Y dược",
    description: "Chăm sóc người bệnh, hỗ trợ bác sĩ, quản lý quy trình điều trị và phục hồi.",
    demandScore: 86,
    growth: 8.9,
    averageSalary: 15000000,
    topUniversities: ["ĐH Điều dưỡng Nam Định", "ĐH Y Hà Nội", "ĐH Y Dược Đà Nẵng"],
    tags: ["Nursing", "Care", "Wellness"],
    skills: ["Chăm sóc bệnh nhân", "Giao tiếp", "Quản lý hồ sơ"],
    opportunities: "Điều dưỡng bệnh viện, chăm sóc tại nhà, quản lý điều dưỡng, điều dưỡng quốc tế.",
    trend: "up"
  },
  {
    majorCode: "ENG01",
    majorName: "Kỹ thuật Cơ khí",
    field: "Kỹ thuật & Công nghệ",
    description: "Thiết kế, chế tạo, vận hành và tối ưu hệ thống cơ khí, tự động hóa.",
    demandScore: 76,
    growth: 4.8,
    averageSalary: 17500000,
    topUniversities: ["ĐH Bách Khoa Hà Nội", "ĐH Sư phạm Kỹ thuật", "ĐH Giao thông Vận tải"],
    tags: ["CAD/CAM", "Robotics", "Manufacturing"],
    skills: ["Thiết kế 3D", "Quy trình sản xuất", "Bảo trì"],
    opportunities: "Kỹ sư thiết kế, kỹ sư bảo trì, quản lý sản xuất, kỹ sư tự động hóa.",
    trend: "neutral"
  },
  {
    majorCode: "ENG02",
    majorName: "Kỹ thuật Điện tử - Viễn thông",
    field: "Kỹ thuật & Công nghệ",
    description: "Thiết kế mạch, hệ thống nhúng, viễn thông và giải pháp IoT.",
    demandScore: 82,
    growth: 9.1,
    averageSalary: 18500000,
    topUniversities: ["ĐH Bách Khoa Hà Nội", "ĐH Điện lực", "ĐH Công nghiệp"],
    tags: ["IoT", "Embedded", "5G"],
    skills: ["Thiết kế mạch", "Lập trình nhúng", "Tối ưu tín hiệu"],
    opportunities: "Kỹ sư nhúng, chuyên viên viễn thông, kỹ sư IoT, chuyên gia tư vấn công nghệ.",
    trend: "up"
  },
  {
    majorCode: "ENG03",
    majorName: "Kỹ thuật Hóa học",
    field: "Kỹ thuật & Công nghệ",
    description: "Thiết kế và vận hành quy trình hóa học, vật liệu và công nghệ xanh.",
    demandScore: 70,
    growth: 3.5,
    averageSalary: 17200000,
    topUniversities: ["ĐH Bách Khoa Hà Nội", "ĐH Bách khoa TP.HCM", "ĐH Công nghiệp Thực phẩm"],
    tags: ["Material", "Process", "Sustainability"],
    skills: ["Thiết kế quy trình", "Phân tích hóa", "Kiểm soát chất lượng"],
    opportunities: "Kỹ sư quy trình, chuyên viên R&D vật liệu, quản lý sản xuất hóa chất.",
    trend: "neutral"
  },
  {
    majorCode: "DES01",
    majorName: "Thiết kế Đồ họa",
    field: "Thiết kế & Sáng tạo",
    description: "Thiết kế nhận diện thương hiệu, UI/UX, sản phẩm số và truyền thông trực quan.",
    demandScore: 79,
    growth: 8.4,
    averageSalary: 16000000,
    topUniversities: ["ĐH Kiến trúc Hà Nội", "Arena Multimedia", "ĐH Mỹ thuật Công nghiệp"],
    tags: ["Branding", "UI/UX", "Motion"],
    skills: ["Adobe Suite", "Thiết kế trải nghiệm", "Nguyên lý màu sắc"],
    opportunities: "Designer UI/UX, giám đốc sáng tạo, chuyên viên thiết kế marketing.",
    trend: "up"
  },
  {
    majorCode: "DES02",
    majorName: "Kiến trúc",
    field: "Thiết kế & Sáng tạo",
    description: "Thiết kế kiến trúc công trình, quy hoạch đô thị và nội thất xanh.",
    demandScore: 68,
    growth: 2.8,
    averageSalary: 17000000,
    topUniversities: ["ĐH Kiến trúc Hà Nội", "ĐH Xây dựng", "ĐH Kiến trúc TP.HCM"],
    tags: ["BIM", "Urban", "Interior"],
    skills: ["Revit", "Thiết kế bền vững", "Quản lý dự án"],
    opportunities: "Kiến trúc sư, quy hoạch gia, chuyên viên thiết kế nội thất, giám sát công trình.",
    trend: "neutral"
  },
  {
    majorCode: "DES03",
    majorName: "Truyền thông Đa phương tiện",
    field: "Thiết kế & Sáng tạo",
    description: "Sản xuất nội dung số, phim, hoạt hình, thực tế ảo và trải nghiệm đa nền tảng.",
    demandScore: 82,
    growth: 10.2,
    averageSalary: 15000000,
    topUniversities: ["HV Báo chí", "ĐH Văn Lang", "RMIT"],
    tags: ["Media", "Animation", "AR/VR"],
    skills: ["Dựng phim", "Kịch bản", "Thiết kế trải nghiệm"],
    opportunities: "Producer, chuyên viên nội dung số, đạo diễn sáng tạo, chuyên gia trải nghiệm ảo.",
    trend: "up"
  },
  {
    majorCode: "SOC01",
    majorName: "Quan hệ Quốc tế",
    field: "Khoa học xã hội",
    description: "Ngoại giao, phân tích chính sách, nghiên cứu phát triển và truyền thông quốc tế.",
    demandScore: 73,
    growth: 5.9,
    averageSalary: 16500000,
    topUniversities: ["HV Ngoại giao", "HV Báo chí", "ĐH Khoa học Xã hội & Nhân văn"],
    tags: ["Diplomacy", "Policy", "Communication"],
    skills: ["Ngoại ngữ", "Đàm phán", "Nghiên cứu"],
    opportunities: "Chuyên viên đối ngoại, chuyên gia chính sách, chuyên viên truyền thông quốc tế.",
    trend: "neutral"
  },
  {
    majorCode: "SOC02",
    majorName: "Tâm lý học",
    field: "Khoa học xã hội",
    description: "Tham vấn tâm lý, nghiên cứu hành vi, tâm lý học tổ chức và lâm sàng.",
    demandScore: 80,
    growth: 9.5,
    averageSalary: 15500000,
    topUniversities: ["ĐH KHXH&NV", "HV Hành chính", "ĐH Sư phạm"],
    tags: ["Counseling", "Behavior", "HR"],
    skills: ["Lắng nghe", "Đánh giá tâm lý", "Thiết kế can thiệp"],
    opportunities: "Chuyên gia tham vấn, chuyên viên nhân sự, nhà nghiên cứu hành vi, therapist.",
    trend: "up"
  },
  {
    majorCode: "SOC03",
    majorName: "Luật",
    field: "Khoa học xã hội",
    description: "Pháp luật, tư vấn pháp lý, tố tụng, trọng tài và chính sách công.",
    demandScore: 77,
    growth: 4.1,
    averageSalary: 19000000,
    topUniversities: ["ĐH Luật Hà Nội", "ĐH Luật TP.HCM", "HV Tư pháp"],
    tags: ["Legal", "Compliance", "Policy"],
    skills: ["Soạn thảo văn bản", "Đàm phán", "Phân tích pháp lý"],
    opportunities: "Luật sư, chuyên viên pháp chế, cố vấn pháp lý, chuyên gia chính sách.",
    trend: "neutral"
  },
  {
    majorCode: "EDU01",
    majorName: "Giáo dục Tiểu học",
    field: "Giáo dục",
    description: "Giảng dạy, phát triển chương trình, tâm lý lứa tuổi và công nghệ giáo dục.",
    demandScore: 74,
    growth: 6.8,
    averageSalary: 13000000,
    topUniversities: ["ĐH Sư phạm Hà Nội", "ĐH Sư phạm TP.HCM", "ĐH Vinh"],
    tags: ["Pedagogy", "Curriculum", "EdTech"],
    skills: ["Sư phạm", "Thiết kế bài giảng", "Đánh giá học tập"],
    opportunities: "Giáo viên, chuyên viên phát triển chương trình, quản lý giáo dục, cố vấn học tập.",
    trend: "up"
  },
  {
    majorCode: "EDU02",
    majorName: "Quản lý Giáo dục",
    field: "Giáo dục",
    description: "Quản trị trường học, chính sách giáo dục, quản lý chất lượng và chuyển đổi số.",
    demandScore: 69,
    growth: 3.6,
    averageSalary: 15000000,
    topUniversities: ["ĐH Giáo dục - ĐHQGHN", "ĐH Sư phạm Hà Nội", "ĐH Sư phạm TP.HCM"],
    tags: ["Leadership", "Strategy", "Accreditation"],
    skills: ["Lập kế hoạch", "Đánh giá chất lượng", "Quản lý nhân sự"],
    opportunities: "Hiệu trưởng, chuyên viên sở giáo dục, quản lý chất lượng, tư vấn chuyển đổi số giáo dục.",
    trend: "neutral"
  },
  {
    majorCode: "AGR01",
    majorName: "Công nghệ Sinh học",
    field: "Nông - Lâm - Ngư nghiệp",
    description: "Ứng dụng sinh học phân tử, di truyền, vi sinh và công nghệ sinh học trong nông nghiệp.",
    demandScore: 75,
    growth: 7.1,
    averageSalary: 16000000,
    topUniversities: ["ĐH Nông nghiệp", "ĐH KHTN", "ĐH Cần Thơ"],
    tags: ["Genomics", "BioTech", "AgriTech"],
    skills: ["Nuôi cấy", "Phân tích gene", "Chuyển giao công nghệ"],
    opportunities: "Nhà nghiên cứu sinh học, chuyên viên phòng lab, chuyên gia nông nghiệp công nghệ cao.",
    trend: "up"
  },
  {
    majorCode: "AGR02",
    majorName: "Quản lý Tài nguyên & Môi trường",
    field: "Nông - Lâm - Ngư nghiệp",
    description: "Quản lý tài nguyên thiên nhiên, môi trường và phát triển bền vững.",
    demandScore: 66,
    growth: 2.9,
    averageSalary: 14500000,
    topUniversities: ["ĐH Tài nguyên & Môi trường", "ĐH KHTN", "ĐH Huế"],
    tags: ["Sustainability", "ESG", "Climate"],
    skills: ["Đánh giá môi trường", "GIS", "Chính sách"],
    opportunities: "Chuyên viên môi trường, tư vấn ESG, quản lý dự án phát triển bền vững.",
    trend: "neutral"
  },
  {
    majorCode: "TOU01",
    majorName: "Quản trị Du lịch",
    field: "Du lịch & Dịch vụ",
    description: "Quản lý khách sạn, lữ hành, phát triển sản phẩm du lịch và trải nghiệm dịch vụ.",
    demandScore: 72,
    growth: 8.6,
    averageSalary: 14000000,
    topUniversities: ["ĐH Kinh tế Quốc dân", "ĐH Văn Lang", "ĐH Hoa Sen"],
    tags: ["Hospitality", "Service", "Experience"],
    skills: ["Quản lý dịch vụ", "Thiết kế tour", "Chăm sóc khách hàng"],
    opportunities: "Quản lý khách sạn, giám đốc vận hành, chuyên viên phát triển du lịch, quản lý lữ hành.",
    trend: "up"
  },
  {
    majorCode: "TOU02",
    majorName: "Quản trị Sự kiện",
    field: "Du lịch & Dịch vụ",
    description: "Tổ chức sự kiện, trải nghiệm thương hiệu, quản lý hậu cần và truyền thông.",
    demandScore: 74,
    growth: 7.9,
    averageSalary: 15000000,
    topUniversities: ["ĐH Văn Lang", "Hutech", "RMIT"],
    tags: ["Event", "PR", "Creative"],
    skills: ["Lập kế hoạch", "Quản lý rủi ro", "Giao tiếp"],
    opportunities: "Event manager, producer, chuyên viên truyền thông sự kiện, quản lý trải nghiệm khách hàng.",
    trend: "up"
  },
  {
    majorCode: "FIN01",
    majorName: "Kế toán Phân tích",
    field: "Kinh tế & Quản lý",
    description: "Kế toán, kiểm toán và ứng dụng phân tích dữ liệu trong quản trị tài chính.",
    demandScore: 71,
    growth: 5.2,
    averageSalary: 16500000,
    topUniversities: ["HV Tài chính", "ĐH Kinh tế Quốc dân", "ĐH Kinh tế TP.HCM"],
    tags: ["Accounting", "Data", "Governance"],
    skills: ["Chuẩn mực kế toán", "Phân tích dữ liệu", "Quản trị rủi ro"],
    opportunities: "Kế toán trưởng, chuyên viên phân tích chi phí, kiểm toán nội bộ, chuyên gia quản trị tài chính.",
    trend: "neutral"
  },
  {
    majorCode: "MED01",
    majorName: "Công nghệ Thực phẩm",
    field: "Kỹ thuật & Công nghệ",
    description: "Chế biến, bảo quản, kiểm soát chất lượng và phát triển sản phẩm thực phẩm.",
    demandScore: 69,
    growth: 4.4,
    averageSalary: 15000000,
    topUniversities: ["ĐH Công nghiệp Thực phẩm", "ĐH Bách khoa", "ĐH Nông Lâm"],
    tags: ["FoodTech", "QA", "Innovation"],
    skills: ["Kiểm nghiệm", "Phát triển sản phẩm", "Quản lý chất lượng"],
    opportunities: "Kỹ sư công nghệ thực phẩm, quản lý nhà máy, chuyên gia R&D thực phẩm.",
    trend: "neutral"
  },
  {
    majorCode: "BIO01",
    majorName: "Sinh học Y tế",
    field: "Y dược",
    description: "Nghiên cứu sinh học phân tử, y sinh học và ứng dụng công nghệ trong y học chính xác.",
    demandScore: 85,
    growth: 11.3,
    averageSalary: 21000000,
    topUniversities: ["ĐH Y Hà Nội", "ĐH KHTN", "ĐH VinUni"],
    tags: ["Bioinformatics", "Genomics", "Precision Medicine"],
    skills: ["Phân tích dữ liệu sinh học", "Thí nghiệm", "Nghiên cứu lâm sàng"],
    opportunities: "Nhà nghiên cứu y sinh, chuyên viên phân tích dữ liệu y tế, chuyên gia xét nghiệm di truyền.",
    trend: "up"
  },
  {
    majorCode: "ART01",
    majorName: "Quản trị Nghệ thuật & Giải trí",
    field: "Thiết kế & Sáng tạo",
    description: "Quản lý nghệ sĩ, sản xuất chương trình, kinh doanh sản phẩm sáng tạo và bản quyền.",
    demandScore: 67,
    growth: 6.1,
    averageSalary: 14500000,
    topUniversities: ["ĐH Văn Lang", "ĐH Sân khấu Điện ảnh", "ĐH Văn hóa"],
    tags: ["Entertainment", "Management", "Production"],
    skills: ["Quản lý nghệ sĩ", "Đàm phán", "Phát triển sản phẩm"],
    opportunities: "Quản lý nghệ sĩ, nhà sản xuất chương trình, chuyên viên bản quyền, quản lý thương hiệu văn hóa.",
    trend: "up"
  }
];

const gradientBackground = "linear-gradient(135deg, #1f2937 0%, #312e81 50%, #1e1b4b 100%)";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

const growthFormatter = new Intl.NumberFormat("vi-VN", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

const ITEMS_PER_PAGE = 7;

export default function Majors() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState<string>("Tất cả lĩnh vực");
  const [selectedMajor, setSelectedMajor] = useState<AdminMajor | null>(mockMajors[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const fields = useMemo(() => {
    const unique = new Set<string>();
    mockMajors.forEach((major) => unique.add(major.field));
    return ["Tất cả lĩnh vực", ...Array.from(unique)];
  }, []);

  const filteredMajors = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return mockMajors.filter((major) => {
      const matchesSearch = !normalizedSearch
        || major.majorName?.toLowerCase().includes(normalizedSearch)
        || major.majorCode.toLowerCase().includes(normalizedSearch)
        || major.field.toLowerCase().includes(normalizedSearch)
        || major.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      const matchesField = selectedField === "Tất cả lĩnh vực" || major.field === selectedField;

      return matchesSearch && matchesField;
    });
  }, [searchTerm, selectedField]);

  const searchPreview = searchTerm.trim();
  const isSearching = searchPreview.length > 0;

  const totalPages = Math.max(1, Math.ceil(filteredMajors.length / ITEMS_PER_PAGE));

  const paginatedMajors = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMajors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredMajors]);

  const pageNumbers = useMemo(() => Array.from({ length: totalPages }, (_, index) => index + 1), [totalPages]);

  const startIndex = filteredMajors.length ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, filteredMajors.length);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedField]);

  useEffect(() => {
    if (!filteredMajors.length) {
      setSelectedMajor(null);
      return;
    }

    if (!selectedMajor || !filteredMajors.some((major) => major.majorCode === selectedMajor.majorCode)) {
      setSelectedMajor(filteredMajors[0]);
      return;
    }

    if (!paginatedMajors.some((major) => major.majorCode === selectedMajor.majorCode)) {
      setSelectedMajor(paginatedMajors[0] ?? filteredMajors[0]);
    }
  }, [filteredMajors, paginatedMajors, selectedMajor]);

  const analytics = useMemo(() => {
    if (!filteredMajors.length) {
      return {
        total: 0,
        averageDemand: 0,
        averageGrowth: 0,
        highDemand: 0,
        topField: ""
      };
    }

    const totals = filteredMajors.reduce(
      (acc, major) => {
        acc.demand += major.demandScore;
        acc.growth += major.growth;
        acc.fields[major.field] = (acc.fields[major.field] ?? 0) + 1;
        if (major.demandScore >= 80) acc.highDemand += 1;
        return acc;
      },
      { demand: 0, growth: 0, highDemand: 0, fields: {} as Record<string, number> }
    );

    const topFieldEntry = Object.entries(totals.fields).sort((a, b) => b[1] - a[1])[0];

    return {
      total: filteredMajors.length,
      averageDemand: totals.demand / filteredMajors.length,
      averageGrowth: totals.growth / filteredMajors.length,
      highDemand: totals.highDemand,
      topField: topFieldEntry?.[0] ?? "Không xác định"
    };
  }, [filteredMajors]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: gradientBackground,
        padding: "32px",
        color: "white"
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "28px"
        }}
      >
        <header style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <button
            type="button"
            onClick={() => navigate("/admin/HomeAdmin")}
            style={{
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              borderRadius: 16,
              border: "1px solid rgba(226,232,240,0.25)",
              background: "rgba(15,23,42,0.35)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 12px 24px rgba(15,23,42,0.28)"
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = "rgba(15,23,42,0.5)";
              event.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "rgba(15,23,42,0.35)";
              event.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <h1 style={{ margin: 0, fontSize: "2.4rem", fontWeight: 700 }}>Quản lý Ngành học</h1>
              <p style={{ margin: "8px 0 0", color: "rgba(226,232,240,0.8)", maxWidth: "640px", lineHeight: 1.5 }}>
                Theo dõi xu hướng tuyển sinh, nhu cầu thị trường và thông tin chi tiết của từng ngành học để tối ưu chiến lược đào tạo.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/admin/majors/create")}
              style={{
                padding: "12px 20px",
                borderRadius: 14,
                border: "1px solid rgba(56,189,248,0.4)",
                background: "linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(14,165,233,0.35) 100%)",
                color: "white",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                boxShadow: "0 15px 35px rgba(59,130,246,0.25)",
                transition: "all 0.25s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 18px 40px rgba(59,130,246,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(59,130,246,0.25)";
              }}
            >
              <Plus size={18} />
              Thêm ngành mới
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "18px",
              alignItems: "stretch"
            }}
          >
            <div
              style={{
                background: "linear-gradient(140deg, rgba(30,64,175,0.55) 0%, rgba(13,148,136,0.35) 100%)",
                border: "1px solid rgba(148,163,184,0.35)",
                borderRadius: 20,
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                boxShadow: "0 20px 40px rgba(17,24,39,0.32)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  alignItems: "stretch"
                }}
              >
                <div
                  style={{
                    flex: "1 1 280px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "rgba(15,23,42,0.55)",
                    borderRadius: 16,
                    padding: "12px 18px",
                    border: "1px solid rgba(255,255,255,0.12)"
                  }}
                >
                  <Search size={18} color="rgba(226,232,240,0.7)" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên ngành, mã ngành hoặc từ khóa..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "white",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>
                <button
                  type="button"
                  style={{
                    flex: "0 0 auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 18px",
                    borderRadius: 16,
                    border: "1px solid rgba(226,232,240,0.28)",
                    background: "rgba(15,23,42,0.32)",
                    color: "white",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = "rgba(15,23,42,0.45)";
                    event.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = "rgba(15,23,42,0.32)";
                    event.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Filter size={16} />
                  Bộ lọc nâng cao
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  gap: "16px",
                  alignItems: "center"
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "rgba(226,232,240,0.7)"
                    }}
                  >
                    Trạng thái bộ lọc
                  </span>
                  <strong style={{ fontSize: "1.15rem", lineHeight: 1 }}>{analytics.total} ngành phù hợp</strong>
                  <p style={{ margin: 0, color: "rgba(226,232,240,0.78)", fontSize: "0.88rem", lineHeight: 1.5 }}>
                    {analytics.highDemand} ngành có nhu cầu cao, tập trung nhiều nhất ở lĩnh vực {analytics.topField.toLowerCase()}.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 16px",
                    borderRadius: 16,
                    background: "rgba(15,23,42,0.35)",
                    border: "1px solid rgba(226,232,240,0.25)",
                    color: "rgba(226,232,240,0.9)",
                    fontSize: "0.86rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap"
                  }}
                >
                  <Filter size={16} />
                  <span>
                    {selectedField === "Tất cả lĩnh vực"
                      ? "Không giới hạn lĩnh vực"
                      : `Đang lọc: ${selectedField}`}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px"
                }}
              >
                <StatusBadge
                  label="Từ khóa tìm kiếm"
                  value={isSearching ? `"${searchTerm.trim()}"` : "Không có"}
                />
                <StatusBadge
                  label="Số lĩnh vực khả dụng"
                  value={`${fields.length - 1} lĩnh vực`}
                />
                <StatusBadge
                  label="Ngành nhu cầu cao"
                  value={`${analytics.highDemand} ngành (>= 80 điểm)`}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  overflowX: "auto",
                  padding: "2px 6px 6px",
                  margin: "0 -6px"
                }}
              >
                {fields.map((field) => {
                  const isActive = selectedField === field;
                  return (
                    <button
                      key={field}
                      type="button"
                      onClick={() => setSelectedField(field)}
                      style={{
                        padding: "9px 16px",
                        borderRadius: 999,
                        border: isActive ? "1px solid rgba(190,242,100,0.7)" : "1px solid rgba(226,232,240,0.25)",
                        background: isActive ? "rgba(190,242,100,0.2)" : "rgba(15,23,42,0.35)",
                        color: "white",
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        whiteSpace: "nowrap",
                        flex: "0 0 auto"
                      }}
                    >
                      {field}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px"
          }}
        >
          <AnalyticsCard
            icon={<GraduationCap size={24} color="#38bdf8" />}
            title="Tổng số ngành"
            value={analytics.total}
            helper="Ngành thuộc các lĩnh vực"
          />
          <AnalyticsCard
            icon={<TrendingUp size={24} color="#4ade80" />}
            title="Nhu cầu trung bình"
            value={`${Math.round(analytics.averageDemand)} / 100`}
            helper="Điểm hấp dẫn thị trường"
          />
          <AnalyticsCard
            icon={<BarChart3 size={24} color="#facc15" />}
            title="Tăng trưởng trung bình"
            value={`${growthFormatter.format(analytics.averageGrowth)}%`}
            helper="So với cùng kỳ năm trước"
          />
          <AnalyticsCard
            icon={<Sparkles size={24} color="#f472b6" />}
            title="Ngành nổi bật"
            value={analytics.topField || "Không xác định"}
            helper={`${analytics.highDemand} ngành có nhu cầu cao`}
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.05fr) minmax(0, 1fr)",
            gap: "24px",
            alignItems: "stretch"
          }}
        >
          <div
            style={{
              background: "rgba(15,23,42,0.6)",
              borderRadius: 22,
              border: "1px solid rgba(148,163,184,0.22)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxHeight: "1200px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <h2 style={{ margin: 0, fontSize: "1.3rem" }}>Danh sách ngành</h2>
              <span style={{ fontSize: "0.85rem", color: "rgba(226,232,240,0.7)" }}>
                {filteredMajors.length
                  ? `Hiển thị ${startIndex}-${endIndex} / ${filteredMajors.length} ngành`
                  : "0 ngành phù hợp"}
              </span>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: 0,
                borderRadius: 18,
                border: "1px solid rgba(148,163,184,0.16)",
                background: "rgba(15,23,42,0.45)",
                overflow: "hidden"
              }}
            >
              <div style={{ width: "100%", height: "100%", overflowX: "auto" }}>
                <div style={{ minWidth: "1120px", height: "100%", overflowY: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(59,130,246,0.08)", textAlign: "left" }}>
                    <TableHeaderCell>Mã ngành</TableHeaderCell>
                    <TableHeaderCell>Tên ngành</TableHeaderCell>
                    <TableHeaderCell>Lĩnh vực</TableHeaderCell>
                    <TableHeaderCell>Nhu cầu</TableHeaderCell>
                    <TableHeaderCell>Tăng trưởng</TableHeaderCell>
                    <TableHeaderCell>Lương TB</TableHeaderCell>
                    <TableHeaderCell>Top trường</TableHeaderCell>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMajors.map((major) => (
                    <tr
                      key={major.majorCode}
                      onClick={() => setSelectedMajor(major)}
                      style={{
                        cursor: "pointer",
                        background:
                          selectedMajor?.majorCode === major.majorCode ? "rgba(59,130,246,0.18)" : "transparent",
                        transition: "background 0.2s ease"
                      }}
                    >
                      <TableCell>{major.majorCode}</TableCell>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <Layers size={16} color="rgba(226,232,240,0.8)" />
                          <span style={{ fontWeight: 600 }}>{major.majorName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                          }}
                        >
                          <span
                            style={{
                              padding: "6px 14px",
                              borderRadius: 999,
                              background: "rgba(59,130,246,0.12)",
                              border: "1px solid rgba(59,130,246,0.25)",
                              fontSize: "0.82rem",
                              lineHeight: 1.35,
                              textAlign: "center",
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                              maxWidth: "180px"
                            }}
                          >
                            {major.field}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <div style={{ fontWeight: 600 }}>{major.demandScore}/100</div>
                          <div
                            style={{
                              width: "120px",
                              height: "8px",
                              borderRadius: 999,
                              background: "rgba(255,255,255,0.08)",
                              overflow: "hidden"
                            }}
                          >
                            <div
                              style={{
                                width: `${major.demandScore}%`,
                                height: "100%",
                                background: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)"
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          style={{
                            color: major.growth >= 0 ? "#4ade80" : "#fca5a5",
                            fontWeight: 600
                          }}
                        >
                          {major.growth >= 0 ? "+" : ""}
                          {growthFormatter.format(major.growth)}%
                        </span>
                      </TableCell>
                      <TableCell>{currencyFormatter.format(major.averageSalary)}</TableCell>
                      <TableCell>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem" }}>
                          {major.topUniversities.slice(0, 2).map((university) => (
                            <span key={university}>{university}</span>
                          ))}
                          {major.topUniversities.length > 2 && (
                            <span style={{ color: "rgba(226,232,240,0.7)" }}>
                              +{major.topUniversities.length - 2} trường khác
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </tr>
                  ))}
                  {!filteredMajors.length && (
                    <tr>
                      <TableCell colSpan={7}>
                        <div style={{ textAlign: "center", padding: "32px 0", color: "rgba(226,232,240,0.7)" }}>
                          Không tìm thấy ngành phù hợp. Thử thay đổi từ khóa hoặc bộ lọc.
                        </div>
                      </TableCell>
                    </tr>
                  )}
                </tbody>
              </table>
                </div>
              </div>
            </div>
            {filteredMajors.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                  padding: "4px 2px 0"
                }}
              >
                <span style={{ fontSize: "0.85rem", color: "rgba(226,232,240,0.7)" }}>
                  Trang {currentPage} / {totalPages}
                </span>
                {totalPages > 1 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => canGoPrev && setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={!canGoPrev}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(226,232,240,0.25)",
                        background: canGoPrev ? "rgba(15,23,42,0.4)" : "rgba(15,23,42,0.2)",
                        color: "white",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: canGoPrev ? "pointer" : "not-allowed",
                        opacity: canGoPrev ? 0.95 : 0.5,
                        transition: "all 0.2s ease"
                      }}
                    >
                      Trước
                    </button>
                    {pageNumbers.map((page) => {
                      const isActive = page === currentPage;
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          style={{
                            padding: "8px 14px",
                            borderRadius: 999,
                            border: isActive ? "1px solid rgba(59,130,246,0.6)" : "1px solid rgba(226,232,240,0.25)",
                            background: isActive ? "rgba(59,130,246,0.25)" : "rgba(15,23,42,0.32)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            cursor: isActive ? "default" : "pointer",
                            opacity: isActive ? 1 : 0.9,
                            minWidth: "42px",
                            transition: "all 0.2s ease"
                          }}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => canGoNext && setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={!canGoNext}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(226,232,240,0.25)",
                        background: canGoNext ? "rgba(15,23,42,0.4)" : "rgba(15,23,42,0.2)",
                        color: "white",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: canGoNext ? "pointer" : "not-allowed",
                        opacity: canGoNext ? 0.95 : 0.5,
                        transition: "all 0.2s ease"
                      }}
                    >
                      Sau
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              background: "rgba(15,23,42,0.58)",
              borderRadius: 22,
              border: "1px solid rgba(148,163,184,0.22)",
              padding: "22px",
              display: "flex",
              flexDirection: "column",
              gap: "18px"
            }}
          >
            {selectedMajor ? (
              <MajorDetailCard major={selectedMajor} />
            ) : (
              <div style={{ textAlign: "center", color: "rgba(226,232,240,0.7)", padding: "40px 20px" }}>
                <Target size={28} />
                <p style={{ marginTop: "12px" }}>Chọn một ngành trong bảng để xem chi tiết.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatusBadge({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(15,23,42,0.45)",
        borderRadius: 16,
        border: "1px solid rgba(226,232,240,0.2)",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minHeight: "84px"
      }}
    >
      <span style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(226,232,240,0.65)" }}>
        {label}
      </span>
      <strong style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.95)" }}>{value}</strong>
    </div>
  );
}

function AnalyticsCard({ icon, title, value, helper }: { icon: React.ReactNode; title: string; value: React.ReactNode; helper: string }) {
  return (
    <div
      style={{
        background: "rgba(15,23,42,0.55)",
        borderRadius: 20,
        border: "1px solid rgba(148,163,184,0.25)",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 18px 30px rgba(15,23,42,0.35)"
      }}
    >
      <span
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "rgba(59,130,246,0.12)",
          border: "1px solid rgba(59,130,246,0.3)",
          display: "grid",
          placeItems: "center"
        }}
      >
        {icon}
      </span>
      <div>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(226,232,240,0.7)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {title}
        </p>
        <h3 style={{ margin: "6px 0 0", fontSize: "1.4rem" }}>{value}</h3>
      </div>
      <p style={{ margin: 0, color: "rgba(226,232,240,0.75)", fontSize: "0.85rem" }}>{helper}</p>
    </div>
  );
}

function TableHeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        padding: "14px 16px",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "rgba(226,232,240,0.8)",
        textTransform: "uppercase",
        letterSpacing: "0.06em"
      }}
    >
      {children}
    </th>
  );
}

function TableCell({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) {
  return (
    <td
      colSpan={colSpan}
      style={{
        padding: "14px 16px",
        borderBottom: "1px solid rgba(148,163,184,0.12)",
        fontSize: "0.92rem"
      }}
    >
      {children}
    </td>
  );
}

function MajorDetailCard({ major }: { major: AdminMajor }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "0.85rem", color: "rgba(226,232,240,0.7)" }}>{major.field}</span>
          <h2 style={{ margin: "6px 0", fontSize: "1.6rem" }}>{major.majorName}</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {major.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: "rgba(236,72,153,0.1)",
                  border: "1px solid rgba(236,72,153,0.25)",
                  fontSize: "0.82rem"
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            padding: "10px 16px",
            borderRadius: 14,
            background: "rgba(59,130,246,0.18)",
            border: "1px solid rgba(59,130,246,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "6px"
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "rgba(226,232,240,0.75)" }}>Xu hướng</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
            <TrendingIcon direction={major.trend} />
            {growthFormatter.format(major.growth)}%
          </div>
        </div>
      </div>

      <p style={{ margin: 0, color: "rgba(226,232,240,0.82)", lineHeight: 1.6 }}>{major.description}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px"
        }}
      >
        <DetailStat
          icon={<ArrowUpRight size={18} color="#4ade80" />}
          label="Điểm nhu cầu"
          value={`${major.demandScore} / 100`}
        />
        <DetailStat
          icon={<Briefcase size={18} color="#facc15" />}
          label="Lương trung bình"
          value={currencyFormatter.format(major.averageSalary)}
        />
        <DetailStat
          icon={<Building2 size={18} color="#38bdf8" />}
          label="Số trường đào tạo"
          value={`${major.topUniversities.length} trường`}
        />
      </div>

      <div
        style={{
          background: "rgba(59,130,246,0.12)",
          border: "1px solid rgba(59,130,246,0.25)",
          borderRadius: 16,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Star size={18} color="#fbbf24" />
          <h3 style={{ margin: 0, fontSize: "1.05rem" }}>Cơ hội nghề nghiệp nổi bật</h3>
        </div>
        <p style={{ margin: 0, color: "rgba(226,232,240,0.82)", lineHeight: 1.6 }}>{major.opportunities}</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px"
        }}
      >
        <div
          style={{
            background: "rgba(15,23,42,0.5)",
            borderRadius: 16,
            border: "1px solid rgba(148,163,184,0.2)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 600 }}>
            <GraduationCap size={18} color="#38bdf8" />
            Kỹ năng trọng tâm
          </div>
          <ul style={{ margin: 0, paddingLeft: "18px", color: "rgba(226,232,240,0.8)", lineHeight: 1.6 }}>
            {major.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <div
          style={{
            background: "rgba(15,23,42,0.5)",
            borderRadius: 16,
            border: "1px solid rgba(148,163,184,0.2)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 600 }}>
            <Building2 size={18} color="#a855f7" />
            Trường đào tạo tiêu biểu
          </div>
          <ul style={{ margin: 0, paddingLeft: "18px", color: "rgba(226,232,240,0.8)", lineHeight: 1.6 }}>
            {major.topUniversities.map((university) => (
              <li key={university}>{university}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DetailStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(15,23,42,0.5)",
        borderRadius: 16,
        border: "1px solid rgba(148,163,184,0.22)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(226,232,240,0.75)", fontSize: "0.85rem" }}>
        {icon}
        {label}
      </span>
      <strong style={{ fontSize: "1.1rem" }}>{value}</strong>
    </div>
  );
}

function TrendingIcon({ direction }: { direction: TrendDirection }) {
  if (direction === "down") {
    return <TrendingUp size={20} color="#fca5a5" style={{ transform: "rotate(180deg)" }} />;
  }
  if (direction === "neutral") {
    return <TrendingUp size={20} color="#facc15" style={{ transform: "rotate(90deg)" }} />;
  }
  return <TrendingUp size={20} color="#4ade80" />;
}
