import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, CheckCircle2 } from "lucide-react";
import fetchData from "../../api/fetchData";
import type { Major } from "../../model/MajorModel";

const gradientBackground = "linear-gradient(135deg, #1f2937 0%, #312e81 50%, #1e1b4b 100%)";

export default function CreateMajor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Major>>({
    majorCode: "",
    majorName: "",
    field: "",
    description: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: keyof Major, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.majorCode?.trim()) {
      newErrors.majorCode = "Mã ngành là bắt buộc";
    } else if (formData.majorCode.trim().length < 3) {
      newErrors.majorCode = "Mã ngành phải có ít nhất 3 ký tự";
    }

    if (!formData.majorName?.trim()) {
      newErrors.majorName = "Tên ngành là bắt buộc";
    }

    if (!formData.field?.trim()) {
      newErrors.field = "Lĩnh vực là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const payload: Major = {
        majorCode: formData.majorCode!.trim(),
        majorName: formData.majorName?.trim(),
        field: formData.field?.trim(),
        description: formData.description?.trim()
      };

      await fetchData("/api/majors/create", {
        method: "POST",
        body: payload
      });

      setSuccessMessage(`Ngành "${payload.majorName}" đã được tạo thành công!`);
      
      // Reset form after 2 seconds and navigate back
      setTimeout(() => {
        navigate("/admin/majors");
      }, 2000);
    } catch (error: unknown) {
      console.error("Error creating major:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message || "Có lỗi xảy ra khi tạo ngành học.");
      } else {
        setErrorMessage("Có lỗi xảy ra khi tạo ngành học.");
      }
    } finally {
      setLoading(false);
    }
  };

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
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "28px"
        }}
      >
        {/* Header */}
        <header style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <button
            type="button"
            onClick={() => navigate("/admin/majors")}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(15,23,42,0.55)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(15,23,42,0.35)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <ArrowLeft size={18} />
            Quay lại danh sách
          </button>

          <div>
            <h1 style={{ margin: 0, fontSize: "2.2rem", fontWeight: 700 }}>
              Tạo ngành học mới
            </h1>
            <p style={{ margin: "8px 0 0", color: "rgba(226,232,240,0.7)", fontSize: "1rem" }}>
              Nhập thông tin chi tiết để thêm ngành học vào hệ thống
            </p>
          </div>
        </header>

        {/* Success Message */}
        {successMessage && (
          <div
            style={{
              background: "rgba(34,197,94,0.15)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              animation: "slideIn 0.3s ease-out"
            }}
          >
            <CheckCircle2 size={24} color="#22c55e" />
            <p style={{ margin: 0, color: "#86efac", fontWeight: 500 }}>
              {successMessage}
            </p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <AlertCircle size={24} color="#ef4444" />
            <p style={{ margin: 0, color: "#fca5a5", fontWeight: 500 }}>
              {errorMessage}
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(15,23,42,0.6)",
            borderRadius: 22,
            border: "1px solid rgba(148,163,184,0.22)",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            boxShadow: "0 25px 50px rgba(15,23,42,0.4)"
          }}
        >
          {/* Major Code */}
          <FormField
            label="Mã ngành"
            required
            error={errors.majorCode}
            helper="Mã định danh duy nhất (ví dụ: CNTT01, BUS01)"
          >
            <input
              type="text"
              value={formData.majorCode || ""}
              onChange={(e) => handleChange("majorCode", e.target.value)}
              placeholder="Nhập mã ngành..."
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 12,
                border: errors.majorCode
                  ? "1px solid rgba(239,68,68,0.5)"
                  : "1px solid rgba(148,163,184,0.25)",
                background: "rgba(15,23,42,0.5)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.2s ease"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.majorCode
                  ? "rgba(239,68,68,0.5)"
                  : "rgba(148,163,184,0.25)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </FormField>

          {/* Major Name */}
          <FormField
            label="Tên ngành"
            required
            error={errors.majorName}
            helper="Tên đầy đủ của ngành học"
          >
            <input
              type="text"
              value={formData.majorName || ""}
              onChange={(e) => handleChange("majorName", e.target.value)}
              placeholder="Nhập tên ngành..."
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 12,
                border: errors.majorName
                  ? "1px solid rgba(239,68,68,0.5)"
                  : "1px solid rgba(148,163,184,0.25)",
                background: "rgba(15,23,42,0.5)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.2s ease"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.majorName
                  ? "rgba(239,68,68,0.5)"
                  : "rgba(148,163,184,0.25)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </FormField>

          {/* Field */}
          <FormField
            label="Lĩnh vực"
            required
            error={errors.field}
            helper="Lĩnh vực chuyên ngành (ví dụ: Công nghệ thông tin, Kinh tế & Quản lý)"
          >
            <input
              type="text"
              value={formData.field || ""}
              onChange={(e) => handleChange("field", e.target.value)}
              placeholder="Nhập lĩnh vực..."
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 12,
                border: errors.field
                  ? "1px solid rgba(239,68,68,0.5)"
                  : "1px solid rgba(148,163,184,0.25)",
                background: "rgba(15,23,42,0.5)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.2s ease"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.field
                  ? "rgba(239,68,68,0.5)"
                  : "rgba(148,163,184,0.25)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </FormField>

          {/* Description */}
          <FormField
            label="Mô tả"
            error={errors.description}
            helper="Mô tả chi tiết về ngành học (tùy chọn)"
          >
            <textarea
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Nhập mô tả ngành học..."
              rows={5}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 12,
                border: errors.description
                  ? "1px solid rgba(239,68,68,0.5)"
                  : "1px solid rgba(148,163,184,0.25)",
                background: "rgba(15,23,42,0.5)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.2s ease",
                resize: "vertical",
                fontFamily: "inherit"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.description
                  ? "rgba(239,68,68,0.5)"
                  : "rgba(148,163,184,0.25)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </FormField>

          {/* Submit Button */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "8px" }}>
            <button
              type="button"
              onClick={() => navigate("/admin/majors")}
              disabled={loading}
              style={{
                padding: "14px 24px",
                borderRadius: 12,
                border: "1px solid rgba(148,163,184,0.3)",
                background: "rgba(15,23,42,0.5)",
                color: "rgba(226,232,240,0.9)",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1,
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "rgba(15,23,42,0.7)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(15,23,42,0.5)";
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px 24px",
                borderRadius: 12,
                border: "1px solid rgba(59,130,246,0.4)",
                background: loading
                  ? "rgba(59,130,246,0.3)"
                  : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.2s ease",
                boxShadow: loading ? "none" : "0 8px 16px rgba(59,130,246,0.3)"
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(59,130,246,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(59,130,246,0.3)";
              }}
            >
              <Save size={18} />
              {loading ? "Đang tạo..." : "Tạo ngành học"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  required,
  error,
  helper,
  children
}: {
  label: string;
  required?: boolean;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{ fontSize: "0.95rem", fontWeight: 600, color: "rgba(226,232,240,0.9)" }}>
        {label}
        {required && <span style={{ color: "#f87171", marginLeft: "4px" }}>*</span>}
      </label>
      {children}
      {helper && !error && (
        <span style={{ fontSize: "0.85rem", color: "rgba(148,163,184,0.7)" }}>
          {helper}
        </span>
      )}
      {error && (
        <span style={{ fontSize: "0.85rem", color: "#fca5a5", display: "flex", alignItems: "center", gap: "6px" }}>
          <AlertCircle size={14} />
          {error}
        </span>
      )}
    </div>
  );
}
