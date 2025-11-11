import { useState } from "react";
import { User, Lightbulb, Settings, Clipboard, Heart, BookOpen, Target, Brain, BarChart, LogOut, Save, Bell, Shield, Construction, GraduationCap, ArrowLeft } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Define interfaces for type safety
interface ProfileData {
  fullName: string;
  email: string;
  userCode: string;
  role: string;
  bio: string;
  interests: string[];
  careerGoals: string;
  preferredFields: string[];
}

interface NotificationSettings {
  trends: boolean;
  newMajors: boolean;
  admissions: boolean;
  recommendations: boolean;
}

interface PrivacySettings {
  profileVisible: boolean;
  showActivity: boolean;
  dataSharing: boolean;
}

interface Preferences {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: user?.fullName || "",
    email: user?.email || "",
    userCode: user?.userCode || "",
    role: user?.role || "",
    bio: "",
    interests: [] as string[],
    careerGoals: "",
    preferredFields: [] as string[]
  });

  const [preferences, setPreferences] = useState<Preferences>({
    notifications: {
      trends: true,
      newMajors: true,
      admissions: false,
      recommendations: true
    },
    privacy: {
      profileVisible: true,
      showActivity: false,
      dataSharing: false
    }
  });

  const handleProfileUpdate = (field: string, value: unknown) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceUpdate = (category: string, field: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSaveProfile = () => {
    // TODO: Implement API call to save profile
    console.log("Saving profile:", profileData);
    alert("Profile đã được cập nhật!");
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      padding: "20px",
      position: "relative"
    }}>
      {/* Back Button - Outside body */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
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
          zIndex: 1000,
          animation: "fadeIn 0.6s ease-out"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(42, 82, 152, 0.2)";
          e.currentTarget.style.transform = "translateX(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
          e.currentTarget.style.transform = "translateX(0)";
        }}
      >
        <ArrowLeft size={18} />
        Quay lại
      </button>

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{
          background: "rgba(42, 82, 152, 0.1)",
          borderRadius: 16,
          padding: 30,
          marginBottom: 30,
          border: "1px solid rgba(42, 82, 152, 0.2)",
          textAlign: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "hidden",
          animation: "fadeInUp 0.8s ease-out 0.2s both"
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
            borderRadius: "50%", 
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
            fontSize: "2rem",
            border: "2px solid rgba(255,255,255,0.2)",
            position: "relative",
            zIndex: 2,
            animation: "fadeInUp 0.8s ease-out 0.4s both"
          }}>
            <User size={40} />
          </div>
          <h1 style={{ 
            color: "white", 
            fontSize: "clamp(2.2rem, 4vw, 2.8rem)", 
            fontWeight: 700, 
            margin: "0 0 10px 0",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            position: "relative",
            zIndex: 2,
            animation: "fadeInUp 0.8s ease-out 0.6s both"
          }}>
            Xin chào, {user?.fullName || "User"}!
          </h1>
          <p style={{ 
            color: "rgba(255,255,255,0.85)", 
            fontSize: "clamp(1rem, 2vw, 1.2rem)", 
            margin: 0,
            position: "relative",
            zIndex: 2,
            animation: "fadeInUp 0.8s ease-out 0.8s both"
          }}>
            Quản lý thông tin cá nhân và tùy chỉnh trải nghiệm của bạn
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          background: "rgba(42, 82, 152, 0.1)",
          borderRadius: 12,
          padding: 20,
          marginBottom: 30,
          border: "1px solid rgba(42, 82, 152, 0.2)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          animation: "fadeInUp 0.8s ease-out 1s both"
        }}>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <TabButton
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
              icon={<User size={18} />}
              label="Thông tin cá nhân"
              index={0}
            />
            <TabButton
              active={activeTab === "interests"}
              onClick={() => setActiveTab("interests")}
              icon={<Lightbulb size={18} />}
              label="Sở thích & Mục tiêu"
              index={1}
            />
            <TabButton
              active={activeTab === "preferences"}
              onClick={() => setActiveTab("preferences")}
              icon={<Settings size={18} />}
              label="Tùy chọn"
              index={2}
            />
            <TabButton
              active={activeTab === "assessment"}
              onClick={() => setActiveTab("assessment")}
              icon={<Clipboard size={18} />}
              label="Đánh giá năng lực"
              index={3}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div style={{
          background: "rgba(42, 82, 152, 0.1)",
          borderRadius: 12,
          padding: 30,
          border: "1px solid rgba(42, 82, 152, 0.2)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "hidden",
          animation: "fadeIn 0.5s ease-out 1.6s both"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(120, 119, 198, 0.03) 0%, rgba(255, 119, 198, 0.03) 100%)",
            borderRadius: 12,
            pointerEvents: "none"
          }} />
          
          {activeTab === "profile" && (
            <div style={{ position: "relative", zIndex: 2, animation: "fadeIn 0.4s ease-out" }}>
              <ProfileTab 
                profileData={profileData}
                onUpdate={handleProfileUpdate}
                onSave={handleSaveProfile}
                onLogout={handleLogout}
              />
            </div>
          )}

          {activeTab === "interests" && (
            <div style={{ position: "relative", zIndex: 2, animation: "slideInRight 0.4s ease-out" }}>
              <InterestsTab 
                profileData={profileData}
                onUpdate={handleProfileUpdate}
              />
            </div>
          )}

          {activeTab === "preferences" && (
            <div style={{ position: "relative", zIndex: 2, animation: "slideInLeft 0.4s ease-out" }}>
              <PreferencesTab 
                preferences={preferences}
                onUpdate={handlePreferenceUpdate}
              />
            </div>
          )}

          {activeTab === "assessment" && (
            <div style={{ position: "relative", zIndex: 2, animation: "fadeIn 0.4s ease-out" }}>
              <AssessmentTab />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Tab Button Component
function TabButton({ active, onClick, icon, label, index }: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  index: number;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "rgba(255,255,255,0.15)" : "rgba(42, 82, 152, 0.1)",
        color: "white",
        border: active ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(42, 82, 152, 0.2)",
        padding: "14px 20px",
        borderRadius: 10,
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 600,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        minWidth: "120px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        animation: `fadeInUp 0.6s ease-out ${1.2 + index * 0.1}s both`
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "rgba(42, 82, 152, 0.2)";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "rgba(42, 82, 152, 0.1)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      <span style={{ fontSize: "18px" }}>{icon}</span>
      <span style={{ fontSize: "12px", opacity: 0.9 }}>{label}</span>
      {active && (
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "30px",
          height: "2px",
          background: "linear-gradient(90deg, rgba(120, 119, 198, 0.8), rgba(255, 119, 198, 0.8))",
          borderRadius: "1px",
          animation: "slideInLeft 0.3s ease-out"
        }} />
      )}
    </button>
  );
}

// Profile Tab Component
function ProfileTab({ profileData, onUpdate, onSave, onLogout }: {
  profileData: ProfileData;
  onUpdate: (field: string, value: unknown) => void;
  onSave: () => void;
  onLogout: () => void;
}) {
  return (
    <div>
      <h2 style={{ color: "white", fontSize: "1.8rem", fontWeight: 600, marginBottom: 25 }}>
        <User size={24} style={{ marginRight: 10 }} />
        Thông tin cá nhân
      </h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 30 }}>
        
        <FormField
          label="Họ và tên"
          value={profileData.fullName}
          onChange={(value) => onUpdate("fullName", value)}
          placeholder="Nhập họ và tên"
        />
        
        <FormField
          label="Email"
          value={profileData.email}
          onChange={(value) => onUpdate("email", value)}
          placeholder="Nhập email"
          type="email"
        />
        
        <FormField
          label="Mã số"
          value={profileData.userCode}
          onChange={(value) => onUpdate("userCode", value)}
          placeholder="Mã sinh viên/giảng viên"
          readonly
        />
        
        <FormField
          label="Vai trò"
          value={profileData.role}
          onChange={(value) => onUpdate("role", value)}
          type="select"
          options={[
            { value: "User", label: "Người dùng" },
            { value: "Admin", label: "Quản trị viên" }
          ]}
          readonly
        />
        
      </div>

      <div style={{ marginBottom: 30 }}>
        <label style={{ 
          color: "white", 
          fontSize: "1rem", 
          fontWeight: 600, 
          display: "block", 
          marginBottom: 8 
        }}>
          Giới thiệu bản thân
        </label>
        <textarea
          value={profileData.bio}
          onChange={(e) => onUpdate("bio", e.target.value)}
          placeholder="Viết vài dòng về bản thân, kinh nghiệm và mục tiêu của bạn..."
          style={{
            width: "100%",
            height: 100,
            padding: "12px 15px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.1)",
            color: "#f8f9fa",
            fontSize: "1rem",
            outline: "none",
            boxSizing: "border-box",
            resize: "vertical"
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 15, justifyContent: "flex-end", marginTop: 20 }}>
        <button
          onClick={onLogout}
          style={{
            background: "rgba(255,99,99,0.2)",
            color: "#ffcccc",
            border: "1px solid rgba(255,99,99,0.3)",
            padding: "14px 28px",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 2px 8px rgba(255,99,99,0.1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,99,99,0.3)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,99,99,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,99,99,0.2)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(255,99,99,0.1)";
          }}
        >
          <LogOut size={16} />
          Đăng xuất
        </button>
        <button
          onClick={onSave}
          style={{
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(56, 142, 60, 0.3) 100%)",
            color: "white",
            border: "1px solid rgba(34, 197, 94, 0.4)",
            padding: "14px 28px",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 2px 8px rgba(34, 197, 94, 0.2)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(34, 197, 94, 0.4) 0%, rgba(56, 142, 60, 0.4) 100%)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(34, 197, 94, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(56, 142, 60, 0.3) 100%)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(34, 197, 94, 0.2)";
          }}
        >
          <Save size={16} />
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}

// Interests Tab Component
function InterestsTab({ profileData, onUpdate }: {
  profileData: ProfileData;
  onUpdate: (field: string, value: unknown) => void;
}) {
  const interestOptions = [
    "Khoa học & Công nghệ", "Kinh doanh & Quản lý", "Nghệ thuật & Thiết kế",
    "Y tế & Sức khỏe", "Luật & Chính trị", "Giáo dục", "Môi trường",
    "Phân tích dữ liệu", "Marketing", "Kỹ thuật"
  ];

  const fieldOptions = [
    "Công nghệ thông tin", "Kỹ thuật", "Kinh tế", "Y học", "Luật", 
    "Giáo dục", "Nghệ thuật", "Khoa học tự nhiên", "Khoa học xã hội"
  ];

  const toggleInterest = (interest: string) => {
    const current = profileData.interests || [];
    const updated = current.includes(interest)
      ? current.filter((i: string) => i !== interest)
      : [...current, interest];
    onUpdate("interests", updated);
  };

  const toggleField = (field: string) => {
    const current = profileData.preferredFields || [];
    const updated = current.includes(field)
      ? current.filter((f: string) => f !== field)
      : [...current, field];
    onUpdate("preferredFields", updated);
  };

  return (
    <div>
      <h2 style={{ color: "white", fontSize: "1.8rem", fontWeight: 600, marginBottom: 25 }}>
        <Lightbulb size={24} style={{ marginRight: 10 }} />
        Sở thích & Mục tiêu nghề nghiệp
      </h2>
      
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ color: "white", fontSize: "1.3rem", fontWeight: 600, marginBottom: 15 }}>
          <Target size={20} style={{ marginRight: 8 }} />
          Mục tiêu nghề nghiệp
        </h3>
        <textarea
          value={profileData.careerGoals}
          onChange={(e) => onUpdate("careerGoals", e.target.value)}
          placeholder="Mô tả mục tiêu nghề nghiệp của bạn trong 3-5 năm tới..."
          style={{
            width: "100%",
            height: 80,
            padding: "12px 15px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.1)",
            color: "#f8f9fa",
            fontSize: "1rem",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
      </div>

      <div style={{ marginBottom: 30 }}>
        <h3 style={{ color: "white", fontSize: "1.3rem", fontWeight: 600, marginBottom: 15 }}>
          <Heart size={20} style={{ marginRight: 8 }} />
          Sở thích cá nhân
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
          {interestOptions.map(interest => (
            <CheckboxItem
              key={interest}
              label={interest}
              checked={(profileData.interests || []).includes(interest)}
              onChange={() => toggleInterest(interest)}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 30 }}>
        <h3 style={{ color: "white", fontSize: "1.3rem", fontWeight: 600, marginBottom: 15 }}>
          <BookOpen size={20} style={{ marginRight: 8 }} />
          Lĩnh vực quan tâm
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          {fieldOptions.map(field => (
            <CheckboxItem
              key={field}
              label={field}
              checked={(profileData.preferredFields || []).includes(field)}
              onChange={() => toggleField(field)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Preferences Tab Component
function PreferencesTab({ preferences, onUpdate }: {
  preferences: Preferences;
  onUpdate: (category: string, field: string, value: boolean) => void;
}) {
  return (
    <div>
      <h2 style={{ color: "white", fontSize: "1.8rem", fontWeight: 600, marginBottom: 25 }}>
        <Settings size={24} style={{ marginRight: 10 }} />
        Tùy chọn hệ thống
      </h2>
      
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ color: "white", fontSize: "1.3rem", fontWeight: 600, marginBottom: 15 }}>
          <Bell size={20} style={{ marginRight: 8 }} />
          Thông báo
        </h3>
        <div style={{ display: "grid", gap: 10 }}>
          <SwitchItem
            label="Xu hướng ngành học mới"
            description="Nhận thông báo về các xu hướng và phân tích mới"
            checked={preferences.notifications.trends}
            onChange={(value) => onUpdate("notifications", "trends", value)}
          />
          <SwitchItem
            label="Ngành học mới"
            description="Thông báo khi có ngành học mới được thêm vào hệ thống"
            checked={preferences.notifications.newMajors}
            onChange={(value) => onUpdate("notifications", "newMajors", value)}
          />
          <SwitchItem
            label="Thông tin tuyển sinh"
            description="Cập nhật về chỉ tiêu và thông tin tuyển sinh"
            checked={preferences.notifications.admissions}
            onChange={(value) => onUpdate("notifications", "admissions", value)}
          />
          <SwitchItem
            label="Gợi ý cá nhân"
            description="Nhận gợi ý ngành học phù hợp với profile của bạn"
            checked={preferences.notifications.recommendations}
            onChange={(value) => onUpdate("notifications", "recommendations", value)}
          />
        </div>
      </div>

      <div style={{ marginBottom: 30 }}>
        <h3 style={{ color: "white", fontSize: "1.3rem", fontWeight: 600, marginBottom: 15 }}>
          <Shield size={20} style={{ marginRight: 8 }} />
          Quyền riêng tư
        </h3>
        <div style={{ display: "grid", gap: 10 }}>
          <SwitchItem
            label="Hiển thị profile công khai"
            description="Cho phép người khác xem thông tin cơ bản của bạn"
            checked={preferences.privacy.profileVisible}
            onChange={(value) => onUpdate("privacy", "profileVisible", value)}
          />
          <SwitchItem
            label="Hiển thị hoạt động"
            description="Cho phép theo dõi các ngành học bạn quan tâm"
            checked={preferences.privacy.showActivity}
            onChange={(value) => onUpdate("privacy", "showActivity", value)}
          />
          <SwitchItem
            label="Chia sẻ dữ liệu"
            description="Đồng ý chia sẻ dữ liệu ẩn danh để cải thiện hệ thống"
            checked={preferences.privacy.dataSharing}
            onChange={(value) => onUpdate("privacy", "dataSharing", value)}
          />
        </div>
      </div>
    </div>
  );
}

// Assessment Tab Component
function AssessmentTab() {
  return (
    <div>
      <h2 style={{ color: "white", fontSize: "1.8rem", fontWeight: 600, marginBottom: 25 }}>
        <Clipboard size={24} style={{ marginRight: 10 }} />
        Đánh giá năng lực & Gợi ý
      </h2>
      
      <div style={{ textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: "4rem", marginBottom: 20 }}>
          <Construction size={64} />
        </div>
        <h3 style={{ color: "white", fontSize: "1.5rem", marginBottom: 15 }}>
          Tính năng đang phát triển
        </h3>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", marginBottom: 25 }}>
          Bài test đánh giá năng lực và hệ thống gợi ý ngành học thông minh sẽ sớm ra mắt!
        </p>
        <div style={{ 
          background: "rgba(42, 82, 152, 0.1)", 
          borderRadius: 10, 
          padding: 20, 
          marginBottom: 20,
          border: "1px solid rgba(42, 82, 152, 0.2)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
          <h4 style={{ color: "white", marginBottom: 10 }}>Tính năng sắp có:</h4>
          <ul style={{ color: "rgba(255,255,255,0.8)", textAlign: "left", maxWidth: 400, margin: "0 auto" }}>
            <li style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <Brain size={16} />
              Test IQ và EQ
            </li>
            <li style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <Target size={16} />
              Đánh giá năng lực chuyên môn
            </li>
            <li style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <Lightbulb size={16} />
              Gợi ý ngành học phù hợp
            </li>
            <li style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <BarChart size={16} />
              Lộ trình phát triển cá nhân
            </li>
            <li style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <GraduationCap size={16} />
              Theo dõi tiến độ học tập
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function FormField({ label, value, onChange, placeholder, type = "text", options, readonly = false }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  options?: { value: string; label: string }[];
  readonly?: boolean;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        color: "white",
        fontSize: "clamp(14px, 2vw, 16px)",
        fontWeight: 600,
        display: "block",
        marginBottom: 10,
        opacity: readonly ? 0.7 : 1
      }}>
        {label}
      </label>
      {type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={readonly}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 12,
            border: readonly ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.3)",
            background: readonly ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)",
            color: "#f8f9fa",
            fontSize: "clamp(14px, 2vw, 16px)",
            outline: "none",
            boxSizing: "border-box",
            opacity: readonly ? 0.6 : 1,
            cursor: readonly ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}
          onFocus={(e) => {
            if (!readonly) {
              e.currentTarget.style.border = "1px solid rgba(34, 197, 94, 0.5)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
            }
          }}
          onBlur={(e) => {
            if (!readonly) {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.3)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            }
          }}
        >
          {options?.map(option => (
            <option key={option.value} value={option.value} style={{ background: "#764ba2", color: "white" }}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readonly}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 12,
            border: readonly ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.3)",
            background: readonly ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)",
            color: "#f8f9fa",
            fontSize: "clamp(14px, 2vw, 16px)",
            outline: "none",
            boxSizing: "border-box",
            opacity: readonly ? 0.6 : 1,
            cursor: readonly ? "not-allowed" : "text",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}
          onFocus={(e) => {
            if (!readonly) {
              e.currentTarget.style.border = "1px solid rgba(34, 197, 94, 0.5)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
            }
          }}
          onBlur={(e) => {
            if (!readonly) {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.3)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            }
          }}
        />
      )}
    </div>
  );
}

function CheckboxItem({ label, checked, onChange }: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      color: "white",
      cursor: "pointer",
      padding: "12px 16px",
      borderRadius: 12,
      background: checked ? "rgba(34, 197, 94, 0.2)" : "rgba(42, 82, 152, 0.1)",
      border: checked ? "1px solid rgba(34, 197, 94, 0.4)" : "1px solid rgba(42, 82, 152, 0.2)",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      fontSize: "14px",
      fontWeight: 500
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = checked ? "rgba(34, 197, 94, 0.3)" : "rgba(255,255,255,0.12)";
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = checked ? "rgba(34, 197, 94, 0.2)" : "rgba(255,255,255,0.08)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
    }}
    >
      <div style={{
        width: 20,
        height: 20,
        border: checked ? "2px solid #22c55e" : "2px solid rgba(255,255,255,0.3)",
        borderRadius: 6,
        background: checked ? "rgba(34, 197, 94, 0.2)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        cursor: "pointer"
      }}>
        {checked && (
          <div style={{
            width: 10,
            height: 10,
            background: "#22c55e",
            borderRadius: 2,
            animation: "checkIn 0.2s ease-out"
          }} />
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <span>{label}</span>
    </label>
  );
}

function SwitchItem({ label, description, checked, onChange }: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div style={{
      background: "rgba(42, 82, 152, 0.1)",
      borderRadius: 12,
      padding: 20,
      border: "1px solid rgba(42, 82, 152, 0.2)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      transition: "all 0.3s ease",
      cursor: "pointer"
    }}
    onClick={() => onChange(!checked)}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "rgba(255,255,255,0.12)";
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
    }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: "white", fontSize: "16px", fontWeight: 600, margin: "0 0 6px 0" }}>
            {label}
          </h4>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: 0, lineHeight: 1.4 }}>
            {description}
          </p>
        </div>
        <div style={{
          position: "relative",
          width: 50,
          height: 26,
          background: checked ? "rgba(34, 197, 94, 0.3)" : "rgba(255,255,255,0.2)",
          border: checked ? "1px solid rgba(34, 197, 94, 0.5)" : "1px solid rgba(255,255,255,0.3)",
          borderRadius: 13,
          transition: "all 0.3s ease",
          cursor: "pointer"
        }}>
          <div style={{
            position: "absolute",
            top: 2,
            left: checked ? 24 : 2,
            width: 20,
            height: 20,
            background: "white",
            borderRadius: "50%",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
          }} />
        </div>
      </div>
    </div>
  );
}

// CSS Animations
const styles = `
  @keyframes fadeInUp {
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

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes checkIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .fadeInUp {
    animation: fadeInUp 0.6s ease-out;
  }

  .slideInLeft {
    animation: slideInLeft 0.6s ease-out;
  }

  .slideInRight {
    animation: slideInRight 0.6s ease-out;
  }

  .fadeIn {
    animation: fadeIn 0.4s ease-out;
  }

  /* Placeholder styling */
  input::placeholder,
  textarea::placeholder,
  select::placeholder {
    color: rgba(248, 249, 250, 0.6) !important;
    opacity: 1;
  }

  /* Option styling for select */
  option {
    background: rgba(30, 41, 59, 0.95) !important;
    color: #f8f9fa !important;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}