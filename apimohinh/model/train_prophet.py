# train_prophet.py
import pandas as pd
import os
import sys
from prophet import Prophet
import json
import re

# --- Cấu hình ---
file_path = "data/TongHop_30Truong_ToanQuoc_2025_XuHuong.xlsx"
output_dir = "output"
output_path = os.path.join(output_dir, "forecast_result.json")
forecast_years = 5  # số năm muốn dự báo thêm

# === 1. Đọc dữ liệu gốc ===
df = pd.read_excel(file_path)
print("Đã đọc file:", file_path)
print("Các cột trong file:")
print(list(df.columns))

# === 2. Tìm cột dạng Quota_YYYY hoặc cột Year/Y ===
quota_pattern = re.compile(r"Quota[_\s\-]?(\d{4})")  # bắt các cột Quota_2023, Quota-2023, Quota 2023
quota_cols = []
quota_years = []
for col in df.columns:
    m = quota_pattern.search(str(col))
    if m:
        quota_cols.append(col)
        quota_years.append(int(m.group(1)))

# Nếu có các cột Quota_YYYY -> ta melt/aggregate theo năm
if len(quota_cols) >= 2:
    print(f"Tìm thấy các cột Quota theo năm: {quota_cols}")
    # Chuyển dạng wide -> long: mỗi row: School/Major/... , Year, Quota
    df_quota = df[quota_cols].copy()
    # đảm bảo NaN -> 0 cho tổng hợp
    df_quota = df_quota.fillna(0)
    # rename columns để chứa năm rõ ràng (nếu tên chứa năm)
    rename_map = {}
    for col in quota_cols:
        y = quota_pattern.search(str(col)).group(1)
        rename_map[col] = f"Quota_{y}"
    df_quota = df_quota.rename(columns=rename_map)
    # melt toàn bộ bảng (nếu muốn tổng theo toàn bộ trường/major)
    long = df_quota.reset_index().melt(id_vars=["index"], value_vars=list(rename_map.values()),
                                       var_name="QuotaYear", value_name="QuotaValue")
    # tách năm từ QuotaYear
    long["year"] = long["QuotaYear"].str.extract(r"(\d{4})").astype(int)
    # aggregate (ví dụ tổng tuyển sinh theo năm)
    ts = long.groupby("year", as_index=False)["QuotaValue"].sum().rename(columns={"QuotaValue": "y"})
    ts["ds"] = pd.to_datetime(ts["year"].astype(str) + "-01-01")
    ts = ts[["ds", "y"]].sort_values("ds")
    print("Dữ liệu time series (tổng theo năm):")
    print(ts)
elif ("Year" in df.columns) and ("Total" in df.columns or "Total_Students" in df.columns or "Quota" in df.columns):
    # Nếu file có cột Year và cột chứa giá trị
    print("Phát hiện cột Year và cột Total/Quota -> sử dụng trực tiếp")
    value_col = None
    for candidate in ["Total_Students", "Total", "Quota", "TotalStudents", "Enrollment"]:
        if candidate in df.columns:
            value_col = candidate
            break
    if value_col is None:
        # thử cột thứ 2 nếu cấu trúc đơn giản Year + value
        cols = list(df.columns)
        idx = cols.index("Year")
        if idx + 1 < len(cols):
            value_col = cols[idx + 1]
        else:
            print("Không tìm được cột giá trị tương ứng với 'Year'.")
            sys.exit(1)
    ts = df[["Year", value_col]].dropna().rename(columns={"Year": "year", value_col: "y"})
    ts["ds"] = pd.to_datetime(ts["year"].astype(str) + "-01-01")
    ts = ts[["ds", "y"]].sort_values("ds")
    print("Dữ liệu time series từ cột Year:")
    print(ts)
else:
    # Không tìm thấy cột phù hợp để tạo time series
    print("\n--- LỖI: Không tìm thấy đủ cột thời gian để tạo time-series ---")
    print("Script tìm các cột dạng: Quota_YYYY (ví dụ Quota_2023, Quota_2024 ...) hoặc cặp Year + Value.")
    print("Hiện file của bạn có các cột:", list(df.columns))
    print("Nếu file chỉ có 1 cột Quota_2025 thì không đủ mốc thời gian để train Prophet.")
    print("Yêu cầu: cần ít nhất 2 mốc thời gian (năm) — tốt nhất >=5 năm để dự báo có ý nghĩa.")
    sys.exit(1)

# Kiểm tra số điểm thời gian
if ts.shape[0] < 2:
    print("Không đủ điểm thời gian để train Prophet (cần >=2). Dừng.")
    sys.exit(1)

# === 3. Train Prophet ===
print("\nBắt đầu train Prophet...")
model = Prophet()
model.fit(ts)

# === 4. Dự báo future ===
future = model.make_future_dataframe(periods=forecast_years, freq="Y")
forecast = model.predict(future)

# === 5. Lấy cột cần thiết và xuất JSON ===
result = forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]]
os.makedirs(output_dir, exist_ok=True)
result.to_json(output_path, orient="records", date_format="iso")
print(f"\n✅ Đã tạo file dự báo: {output_path}")
print("Một vài dòng đầu của kết quả:")
print(result.head())
