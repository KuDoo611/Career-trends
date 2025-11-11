import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import useAuth from "../../hooks/useAuth";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	type ChartOptions
} from "chart.js";
import {
	LayoutDashboard,
	GraduationCap,
	// Building2,
	TrendingUp,
	BarChart3,
	Users,
	ArrowUpRight,
	ShieldCheck,
	LogOut,
	User
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface NavItem {
	id: string;
	label: string;
	description: string;
	icon: LucideIcon;
	path: string;
}

interface OverviewStat {
	label: string;
	value: string;
	change: string;
	trend: "up" | "down";
	helper: string;
}

interface InsightCard {
	title: string;
	description: string;
	icon: LucideIcon;
	accent: string;
}

const navItems: NavItem[] = [
	{
		id: "majors",
		label: "Quản lý ngành học",
		description: "Thiết lập và cập nhật thông tin cho từng ngành",
		icon: GraduationCap,
		path: "/admin/majors"
	},
	// {
	// 	id: "universities",
	// 	label: "Quản lý trường",
	// 	description: "Theo dõi các trường đại học và chỉ tiêu tuyển sinh",
	// 	icon: Building2,
	// 	path: "/admin/universities"
	// },
	{
		id: "market",
		label: "Phân tích thị trường",
		description: "Xem xu hướng ngành học và dự báo nhu cầu",
		icon: TrendingUp,
		path: "/admin/market-analysis"
	}
];

const overviewStats: OverviewStat[] = [
	{
		label: "Nhu cầu ứng tuyển",
		value: "2.480",
		change: "+12.4%",
		trend: "up",
		helper: "so với cùng kỳ năm trước"
	},
	{
		label: "Tỉ lệ cạnh tranh",
		value: "1 : 4.3",
		change: "+8.1%",
		trend: "up",
		helper: "thí sinh cho mỗi chỉ tiêu"
	},
	{
		label: "Tăng trưởng chỉ tiêu",
		value: "+320",
		change: "-3.2%",
		trend: "down",
		helper: "do điều chỉnh của các trường"
	}
];

const marketInsights: InsightCard[] = [
	{
		title: "Nhóm ngành công nghệ",
		description: "Tăng trưởng ổn định 15% mỗi kỳ, nhu cầu nhân lực cao ở các thành phố lớn.",
		icon: ArrowUpRight,
		accent: "rgba(34,211,238,0.2)"
	},
	{
		title: "Kỹ năng mềm & ngoại ngữ",
		description: "Các doanh nghiệp ưu tiên ứng viên có khả năng giao tiếp đa ngôn ngữ và tư duy số.",
		icon: Users,
		accent: "rgba(251,191,36,0.2)"
	},
	{
		title: "Bảo đảm đầu ra",
		description: "Những ngành có cam kết thực tập và việc làm tăng 27% số hồ sơ đăng ký.",
		icon: ShieldCheck,
		accent: "rgba(134,239,172,0.2)"
	}
];

export default function HomeAdmin() {
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const activeNavId = "market";

	const trendData = useMemo(() => ({
		labels: [
			"Q1 2023",
			"Q2 2023",
			"Q3 2023",
			"Q4 2023",
			"Q1 2024",
			"Q2 2024",
			"Q3 2024",
			"Q4 2024"
		],
		datasets: [
			{
				label: "Nhu cầu tuyển sinh",
				data: [1180, 1320, 1490, 1675, 1780, 1925, 2080, 2250],
				borderColor: "#38bdf8",
				pointBackgroundColor: "#0ea5e9",
				pointBorderColor: "#ffffff",
				pointRadius: 5,
				pointHoverRadius: 7,
				backgroundColor: "rgba(56,189,248,0.18)",
				borderWidth: 3,
				tension: 0.45,
				fill: true
			}
		]
	}), []);

	const chartOptions = useMemo<ChartOptions<'line'>>(() => ({
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				backgroundColor: "rgba(15,23,42,0.9)",
				padding: 12,
				borderRadius: 12,
				borderColor: "rgba(148,163,184,0.3)",
				borderWidth: 1,
				displayColors: false,
				callbacks: {
					title: (items) => items[0]?.label ?? "",
					label: (item) => `${item.dataset.label ?? ""}: ${item.parsed.y.toLocaleString()} hồ sơ`
				}
			}
		},
		scales: {
			x: {
				grid: {
					display: false
				},
				ticks: {
					color: "rgba(226,232,240,0.8)",
					font: {
						size: 12
					}
				}
			},
			y: {
				beginAtZero: true,
				grid: {
					color: "rgba(148,163,184,0.2)",
					drawBorder: false
				},
				ticks: {
					color: "rgba(226,232,240,0.8)",
					font: {
						size: 12
					},
					callback: (value) => Number(value).toLocaleString()
				},
				title: {
					display: true,
					text: "Số lượng hồ sơ",
					color: "rgba(226,232,240,0.9)",
					font: {
						size: 13,
						weight: "bold"
					}
				}
			}
		}
	}), []);

	const timeRanges = ["6 tháng", "12 tháng", "24 tháng"];

	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				background: "linear-gradient(135deg, #312e81 0%, #1f2937 60%, #0f172a 100%)",
				color: "white"
			}}
		>
			<aside
				style={{
					width: "270px",
					padding: "32px 24px",
					borderRight: "1px solid rgba(255,255,255,0.08)",
					background: "rgba(15,23,42,0.55)",
					backdropFilter: "blur(28px)",
					display: "flex",
					flexDirection: "column",
					gap: "32px"
				}}
			>
				<div>
					<div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
						<LayoutDashboard size={28} color="#38bdf8" />
						<div>
							<h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>Admin Dashboard</h1>
							<p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(226,232,240,0.7)" }}>
								Theo dõi xu hướng ngành & thị trường
							</p>
						</div>
					</div>
					<div
						style={{
							background: "rgba(56,189,248,0.08)",
							border: "1px solid rgba(56,189,248,0.2)",
							borderRadius: 16,
							padding: "16px",
							color: "rgba(226,232,240,0.9)",
							lineHeight: 1.5,
							fontSize: "0.9rem"
						}}
					>
						Quản trị toàn bộ dữ liệu tuyển sinh, xu hướng ngành học và hiệu quả chiến lược đào tạo.
					</div>
				</div>

				<nav style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = item.id === activeNavId;

						return (
							<button
								key={item.id}
								type="button"
								onClick={() => navigate(item.path)}
								style={{
									textAlign: "left",
									border: `1px solid ${isActive ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.1)"}`,
									borderRadius: 16,
									padding: "16px",
									background: isActive ? "rgba(56,189,248,0.15)" : "rgba(15,23,42,0.35)",
									color: "inherit",
									cursor: "pointer",
									display: "flex",
									flexDirection: "column",
									gap: "6px",
									transition: "all 0.25s ease",
									boxShadow: isActive ? "0 10px 25px rgba(56,189,248,0.18)" : "none"
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = "translateX(6px)";
									if (!isActive) {
										e.currentTarget.style.background = "rgba(30,41,59,0.55)";
									}
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = "translateX(0)";
									if (!isActive) {
										e.currentTarget.style.background = "rgba(15,23,42,0.35)";
									}
								}}
							>
								<span style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 600 }}>
									<Icon size={20} color={isActive ? "#38bdf8" : "#93c5fd"} />
									{item.label}
								</span>
								<span style={{ fontSize: "0.82rem", color: "rgba(226,232,240,0.7)", lineHeight: 1.5 }}>
									{item.description}
								</span>
							</button>
						);
					})}
				</nav>

				{/* User Profile Section */}
				<div
					style={{
						marginTop: "auto",
						marginBottom: "20px",
						padding: "16px",
						borderRadius: 16,
						border: "1px solid rgba(148,163,184,0.22)",
						background: "rgba(15,23,42,0.4)",
						display: "flex",
						flexDirection: "column",
						gap: "14px"
					}}
				>
					{/* User Info */}
					<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
						<div
							style={{
								width: "48px",
								height: "48px",
								borderRadius: "50%",
								background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
								display: "grid",
								placeItems: "center",
								border: "2px solid rgba(56,189,248,0.3)",
								flexShrink: 0
							}}
						>
							<User size={24} color="white" />
						</div>
						<div style={{ flex: 1, minWidth: 0 }}>
							<p style={{ 
								margin: 0, 
								fontSize: "0.8rem", 
								color: "rgba(226,232,240,0.7)",
								lineHeight: 1.3
							}}>
								Xin chào,
							</p>
							<p style={{ 
								margin: 0, 
								fontSize: "0.95rem", 
								fontWeight: 600,
								color: "white",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap"
							}}>
								{user?.fullName || "Admin"}
							</p>
						</div>
					</div>

					{/* Logout Button */}
					<button
						type="button"
						onClick={() => {
							logout();
							navigate("/login");
						}}
						style={{
							width: "100%",
							padding: "10px 16px",
							borderRadius: 12,
							border: "1px solid rgba(248,113,113,0.3)",
							background: "rgba(239,68,68,0.15)",
							color: "#fca5a5",
							cursor: "pointer",
							fontSize: "0.9rem",
							fontWeight: 600,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "8px",
							transition: "all 0.25s ease"
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = "rgba(239,68,68,0.25)";
							e.currentTarget.style.borderColor = "rgba(248,113,113,0.5)";
							e.currentTarget.style.transform = "translateY(-2px)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = "rgba(239,68,68,0.15)";
							e.currentTarget.style.borderColor = "rgba(248,113,113,0.3)";
							e.currentTarget.style.transform = "translateY(0)";
						}}
					>
						<LogOut size={18} />
						Đăng xuất
					</button>
				</div>
			</aside>

			<main style={{ flex: 1, padding: "36px 48px", overflowY: "auto" }}>
				<div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
					<header>
						<span style={{ fontSize: "0.85rem", color: "rgba(148,163,184,0.8)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
							Tổng quan thị trường ngành học
						</span>
						<div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
							<h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>Dashboard phân tích xu hướng</h2>
							<BarChart3 size={26} color="#38bdf8" />
						</div>
						<p style={{ margin: "10px 0 0 0", fontSize: "0.95rem", color: "rgba(203,213,225,0.85)", maxWidth: "680px" }}>
							Nắm bắt tốc độ tăng trưởng nhu cầu tuyển sinh, tỉ lệ cạnh tranh và các cơ hội đào tạo nổi bật để tối ưu kế hoạch tuyển sinh.
						</p>
					</header>

					<section
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
							gap: "18px"
						}}
					>
						{overviewStats.map((stat) => (
							<div
								key={stat.label}
								style={{
									background: "rgba(15,23,42,0.45)",
									borderRadius: 20,
									padding: "20px",
									border: "1px solid rgba(148,163,184,0.2)",
									boxShadow: "0 18px 35px rgba(15,23,42,0.25)",
									display: "flex",
									flexDirection: "column",
									gap: "14px"
								}}
							>
								<span style={{ fontSize: "0.85rem", color: "rgba(226,232,240,0.7)" }}>{stat.label}</span>
								<strong style={{ fontSize: "1.8rem", letterSpacing: "0.02em" }}>{stat.value}</strong>
								<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
									<span
										style={{
											padding: "6px 12px",
											borderRadius: 999,
											fontSize: "0.75rem",
											fontWeight: 600,
											background: stat.trend === "up" ? "rgba(34,197,94,0.15)" : "rgba(248,113,113,0.15)",
											color: stat.trend === "up" ? "#4ade80" : "#fca5a5"
										}}
									>
										{stat.change}
									</span>
									<span style={{ fontSize: "0.8rem", color: "rgba(203,213,225,0.75)" }}>{stat.helper}</span>
								</div>
							</div>
						))}
					</section>

					<section
						style={{
							background: "rgba(15,23,42,0.55)",
							borderRadius: 24,
							border: "1px solid rgba(56,189,248,0.18)",
							padding: "24px",
							boxShadow: "0 24px 45px rgba(15,23,42,0.35)",
							display: "flex",
							flexDirection: "column",
							gap: "20px"
						}}
					>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
							<div>
								<h3 style={{ margin: 0, fontSize: "1.4rem" }}>Biểu đồ xu hướng thị trường</h3>
								<p style={{ margin: "6px 0 0 0", fontSize: "0.9rem", color: "rgba(203,213,225,0.8)" }}>
									Theo dõi sự thay đổi nhu cầu ứng tuyển theo quý trong hai năm gần nhất.
								</p>
							</div>
							<div style={{ display: "flex", gap: "10px" }}>
								{timeRanges.map((range, index) => (
									<button
										key={range}
										type="button"
										style={{
											padding: "10px 16px",
											borderRadius: 999,
											border: index === 1 ? "1px solid rgba(56,189,248,0.45)" : "1px solid rgba(148,163,184,0.2)",
											background: index === 1 ? "rgba(56,189,248,0.18)" : "transparent",
											color: index === 1 ? "#38bdf8" : "rgba(226,232,240,0.75)",
											cursor: "pointer",
											fontSize: "0.85rem",
											fontWeight: 600,
											transition: "all 0.2s ease"
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = "translateY(-2px)";
											if (index !== 1) {
												e.currentTarget.style.background = "rgba(148,163,184,0.12)";
											}
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = "translateY(0)";
											if (index !== 1) {
												e.currentTarget.style.background = "transparent";
											}
										}}
									>
										{range}
									</button>
								))}
							</div>
						</div>

						<div style={{ height: "380px" }}>
							<Line data={trendData} options={chartOptions} />
						</div>
					</section>

					<section
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
							gap: "18px"
						}}
					>
						{marketInsights.map((insight) => {
							const Icon = insight.icon;
							return (
								<div
									key={insight.title}
									style={{
										background: "rgba(15,23,42,0.5)",
										border: "1px solid rgba(148,163,184,0.18)",
										borderRadius: 20,
										padding: "22px",
										display: "flex",
										flexDirection: "column",
										gap: "14px",
										boxShadow: "0 18px 35px rgba(15,23,42,0.3)"
									}}
								>
									<span
										style={{
											width: "52px",
											height: "52px",
											borderRadius: "18px",
											display: "grid",
											placeItems: "center",
											background: insight.accent,
											color: "#38bdf8"
										}}
									>
										<Icon size={24} />
									</span>
									<div>
										<h4 style={{ margin: "0 0 8px 0", fontSize: "1.1rem" }}>{insight.title}</h4>
										<p style={{ margin: 0, fontSize: "0.9rem", color: "rgba(203,213,225,0.8)", lineHeight: 1.6 }}>
											{insight.description}
										</p>
									</div>
								</div>
							);
						})}
					</section>
				</div>
			</main>
		</div>
	);
}
