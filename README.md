<h2 align="center">
    <a href="https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin">
    🎓 Faculty of Information Technology (DaiNam University)
    </a>
</h2>

<h2 align="center">
   DỰ ĐOÁN VÀ PHÂN TÍCH XU HƯỚNG NGÀNH HỌC
</h2>

<div align="center">
    <p align="center">
        <img src="docs/aiotlab_logo.png" alt="AIoTLab Logo" width="170"/>
        <img src="docs/fitdnu_logo.png" alt="FIT DNU Logo" width="180"/>
        <img src="docs/dnu_logo.png" alt="DaiNam University Logo" width="200"/>
    </p>

[![AIoTLab](https://img.shields.io/badge/AIoTLab-green?style=for-the-badge)](https://www.facebook.com/DNUAIoTLab)
[![Faculty of Information Technology](https://img.shields.io/badge/Faculty%20of%20Information%20Technology-blue?style=for-the-badge)](https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin)
[![DaiNam University](https://img.shields.io/badge/DaiNam%20University-orange?style=for-the-badge)](https://dainam.edu.vn)

</div>

---
## 📖 1. Giới thiệu  

Hệ thống **Dự đoán và phân tích xu hướng ngành học** là một website được xây dựng nhằm hỗ trợ người dùng, đặc biệt là học sinh – sinh viên, trong việc phân tích, theo dõi và dự đoán xu hướng lựa chọn ngành học trong tương lai.
Thông qua hệ thống giúp người dùng nắm bắt được xu hướng ngành học nổi bật trong 1–3 năm tới, từ đó có thể định hướng nghề nghiệp và ra quyết định học tập phù hợp hơn với nhu cầu thị trường lao động.

**Mục tiêu chính:**
- Ứng dụng các thuật toán học máy (Machine Learning), sử dụng model Prophet để dự đoán xu hướng ngành học dựa trên dữ liệu thực tế. 
- Phân tích dữ liệu tuyển sinh,trường học và nhu cầu nhân lực của các ngành trong nhiều năm.  
- Xây dựng hệ thống website trực quan, thân thiện với người dùng. 
- Hỗ trợ người dùng tìm kiếm, lọc và xem báo cáo xu hướng ngành học theo từng lĩnh vực.

**Chức năng chính:**

**1.1 Forntend**  
    **Giao diện người dùng**
- Trang chủ: Giao diện dễ nhìn, đầy đủ nội dung của hệ thống.
- Trang tìm kiếm ngàng học: Tình kiếm và tìm hiểu về xu hướng của ngành học.
- Trang xu hướng: Phân tích xu hướng của ngàng học,dự đoán từ 3-5 năm tới.
- Trang trường đại học: Danh sách các trường đại học gồm có học phí và địa điểm để người dùng có thể so sách để đưa ra lưa chọn đúng.
- Trang Doashboard: Phân tích top 5 xu hướng tăng và giảm ngành học.
  
  **Giao diện quản lý**
- Trang chính: Biển đồ phân tích xu hướng thị trường và các dữ liệu liên quan.
- Trang quản lý ngàng học: Để quản lý các ngành và cập nhật theo từ quy.
- Trang phân tích thị trường: Đưa ra các mức lương, kỹ năng cần phải có theo các ngành để phân tích xu hướng theo thị trường việc làm.

**1.2 Backend**  
- Swagger API: Cung cấp api kết nối cho fontend.  
- Quản lý dữ liệu :Tiếp nhận và xử lý dữ liệu đầu vào từ người dùng.
- Hiển thị thông tin: Kết nối với mô hình Prophet đã train xong dữ liệu từ các nguồn dữ liệu đã tổng hợp.  

**1.3 Database**  
- Quản lý người dùng: Đăng ký, đăng nhập, kiểm tra user.  
- Lưu trữ lịch sử: Ghi nhận các dữ liệu được thay đổi hoặc chỉnh sửa dữ liệu.  
- Cung cấp các trường dữ liệu của từng bảng để làm Swager api phần Backend.  

---

## 🔧 2. Công nghệ sử dụng  
- **Ngôn ngữ lập trình:** 
- **Fontend:** React, Typescript, VIte 
- **Xử lý dữ liệu:** `prophet`, Python 
- **Backend:** Dotket NET 8

📚 **Thư viện sử dụng**  
- `pandas`   
- `prophet` 
- `react` 
- `react-dom` 
- `react-router-dom` 
- `typescript` 
- `chart.js`
- `react-chartjs-2`
- `fetchData`

🗄️ **Cơ sở dữ liệu**  
- Hệ quản trị: SQL Server 
- Tables:  
  - `Users` – Quản lý người dùng  
  - `Majors` – Danh sách ngành học
  - `Trend` – Xu hướng ngành học
  - `Universities` – Danh sách trường học

---

## ✨ Tính năng chính  

- Tìm kiếm và xem xu hướng các ngàng học để đưa ra lực chọn tốt.  
- Tham khảo các trường đại học theo ngành để đưa ra lựa chọn.  
- Phân tích thị trường việc làm theo ngành học theo quí.  
- Dự báo xu hướng top ngành học hot.  
- Giao diện quản lý trực quan.  

---

## 🖥️ Công cụ & Môi trường phát triển  

- Công cụ phát triển: **Visual Studio Code**  
- Phiên bản JDK: **Dotket NET 8+ (khuyến nghị NET 9+)**  
- Database: **SQL Server Management Studio 19**  
- Hệ điều hành: **Windows 10/11** (đa nền tảng: Linux, macOS)  

---

## 🚀 3. Một số hình ảnh hệ thống  

- **Giao diện Đăng nhập**
  
  <p align="center"><img width="536" height="625" alt="image" src="https://github.com/user-attachments/assets/4e95d732-662f-41f1-84b3-ceba2f946b41" /><br/>


  <p align="center"><i>Hình 1: Giao diện Đăng nhập</i>
</p>
<br/>

- **Giao diện Đăng ký**
  
<p align="center"><img width="482" height="600" alt="image" src="https://github.com/user-attachments/assets/0e3e15b3-1043-4175-829e-fe9b513ff0d3" /><br/>


  <p align="center"><i>Hình 2: Giao diện Đăng ký</i>
</p>
<br/>

- **Giao diện người dùng**
  
<img width="1847" height="963" alt="image" src="https://github.com/user-attachments/assets/8be59e1c-6060-49de-ad58-ba0fb6e710f4" /><br/>


  <p align="center"><i>Hình 3: Giao diện người dùng</i>
</p>
<br/>

- **Giao diện trang phân tích xu hướng ngành học**
  
<img width="1476" height="898" alt="image" src="https://github.com/user-attachments/assets/ab87b8e3-ae6c-4983-8315-0402d7809868" /><br/>


  <p align="center"><i>Hình 4: Giao diện phân tích xu hướng và dự báo từ 3-5 năm tới</i></p><br/>

## 📝 4. Các bước cài đặt  
#### Bước 1: Chuẩn bị môi trường
1. **Kiểm tra Node.js & npm**: Mở PowerShell và chạy:
   ```powershell
   node -v
   npm -v
   ```
   Đảm bảo Node.js >= 16 (hoặc phiên bản phù hợp với `vite`/`package.json`).

2. **Kiểm tra .NET SDK**: (Backend dùng .NET 8.0 theo project `bin/Debug/net8.0`)
   ```powershell
   dotnet --version
   ```
   Đảm bảo hiển thị `8.x` hoặc phiên bản tương thích (nếu backend yêu cầu .NET 8).

3. **Kiểm tra Python & pip**: (Model Prophet yêu cầu Python 3.8+)
   ```powershell
   python --version
   python -m pip --version
   ```

4. **IDE / Editor**: Mở Visual Studio Code hoặc IDE bạn chọn. (Mở thư mục workspace: `d:\CDS2\Career-trends`).

5. **(Windows only)** Nếu cài đặt `prophet` gặp lỗi biên dịch, cần cài thêm Build Tools (Visual C++ Build Tools) hoặc sử dụng `cmdstanpy` theo hướng dẫn của `prophet`.

---

####  Bước 2: Setup và cài dependencies cho từng phần
Phần A — Frontend (Vite + React + TypeScript)

1. **Chuyển vào thư mục frontend**:
   ```powershell
   cd .\Fontend\webapp
   ```

2. **Cài node modules**:
   ```powershell
   npm install
   ```
   Hoặc nếu dùng Yarn/PNPM, thay `npm install` bằng `yarn` hoặc `pnpm install`.

3. **Chạy dev server (với Vite)**:
   ```powershell
   npm run dev
   ```
   Kết quả mong đợi: server Vite sẽ hiển thị URL (mặc định `http://localhost:5173` hoặc port khác). Truy cập trong trình duyệt.

4. **Build production** (nếu cần):
   ```powershell
   npm run build
   npm run preview
   ```

Lưu ý:
- Nếu gặp lỗi CORS khi frontend gọi backend, xem file `Fontend/webapp/public/CORS_SETUP_GUIDE.md` hoặc đảm bảo backend cho phép origin của Vite.
- Kiểm tra `package.json` để biết scripts chính xác (dev/build/preview).


Phần B — Backend (.NET API `apixh`)

1. **Chuyển vào thư mục backend** (chứa `apixh.csproj`):
   ```powershell
   cd ..\..\API\apixh
   ```

2. **Restore và build**:
   ```powershell
   dotnet restore
   dotnet build -c Debug
   ```

3. **Chạy ứng dụng**:
   ```powershell
   dotnet run --project .\apixh.csproj
   ```
   Kết quả mong đợi: Kestrel/Host sẽ khởi động và in ra URL (ví dụ `https://localhost:5001` và `http://localhost:5000`) hoặc theo cấu hình `Properties/launchSettings.json`.

4. **(Tùy chọn) Publish cho production**:
   ```powershell
   dotnet publish -c Release -o ..\publish
   ```

Lưu ý:
- Nếu backend cần connection string (DB), cấu hình trong `appsettings.json` / `appsettings.Development.json`. Kiểm tra và chỉnh trước khi chạy.
- Nếu backend bị lỗi port hoặc binding, xem `Properties/launchSettings.json` để biết port mặc định.


Phần C — Model Python (apimohinh/model)

1. **Chuyển vào thư mục model**:
   ```powershell
   cd ..\..\apimohinh\model
   ```

2. **Tạo và kích hoạt virtual environment (PowerShell)**:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. **Cài dependencies**:
   - Tạo file `requirements.txt` (nếu chưa có) với tối thiểu:
     ```text
     pandas
     prophet
     openpyxl
     ```
   - Cài:
     ```powershell
     pip install --upgrade pip
     pip install -r requirements.txt
     ```

   Lưu ý về `prophet` trên Windows: đôi khi cần `cmdstanpy` hoặc Visual C++ Build Tools; nếu `pip install prophet` báo lỗi, đọc thông báo lỗi và cân nhắc cài `cmdstanpy` theo tài liệu `prophet`.

4. **Chuẩn bị dữ liệu**:
   - Đặt file Excel theo cấu trúc script mong đợi trong `data/` (đường dẫn mặc định trong script: `data/TongHop_30Truong_ToanQuoc_2025_XuHuong.xlsx`).

5. **Chạy script**:
   ```powershell
   python .\train_prophet.py
   ```
   Kết quả mong đợi: file JSON dự báo được ghi tại `output/forecast_result.json` (theo biến `output_dir` trong script).

6. **Deactive venv**:
   ```powershell
   deactivate
   ```

Lưu ý:
- Script `train_prophet.py` yêu cầu ít nhất 2 mốc thời gian; nếu dữ liệu chỉ có 1 cột năm (ví dụ chỉ 2025) script sẽ abort.
- Nếu cần cài đặt cụ thể cho `prophet`, cân nhắc dùng `pip install prophet==<phiên-bản-đã-kiểm-chứng>` hoặc tham khảo tài liệu của prophet.

---
#### Bước 3: Copy mã nguồn
1. **Tạo project theo cấu trúc** (nếu bạn đang bắt đầu từ scratch): sao chép toàn bộ cây thư mục repo `Career-trends` vào workspace.

2. **Kiểm tra các file cấu hình**:
   - Frontend: `Fontend/webapp/package.json`, `vite.config.ts`, `tsconfig.json`.
   - Backend: `API/apixh/apixh.csproj`, `appsettings.json`, `Properties/launchSettings.json` — chỉnh connection string và ports nếu cần.
   - Model: `apimohinh/model/train_prophet.py` và file dữ liệu trong `apimohinh/model/data/`.

3. **Thiết lập biến môi trường (nếu cần)**:
   - Ví dụ cho backend: `ASPNETCORE_ENVIRONMENT=Development` (PowerShell):
     ```powershell
     $env:ASPNETCORE_ENVIRONMENT = "Development"
     dotnet run --project .\apixh.csproj
     ```

---
#### Bước 4: Chạy ứng dụng

**Khởi chạy Backend (.NET)**
1. `cd API\apixh`
2. `dotnet run --project .\apixh.csproj`
3. Console sẽ hiển thị URL hosting (ví dụ):
   ```text
   Now listening on: https://localhost:5001
   Now listening on: http://localhost:5000
   Application started. Press Ctrl+C to shut down.
   ```

**Khởi chạy Frontend (Vite)**
1. `cd Fontend\webapp`
2. `npm run dev`
3. Console Vite hiển thị URL dev (ví dụ): `Local: http://localhost:5173` — mở trình duyệt truy cập.

**Chạy Model Python (dự báo)**
1. `cd apimohinh\model`
2. `./.venv/Scripts/Activate.ps1`
3. `python train_prophet.py`
4. Script tạo `output/forecast_result.json` nếu thành công.

---


## 📌 5. Liên hệ 
- **Sinh viên thực hiện:** **Nguyễn Xuân Thuận**, **Lê Đức Mạnh**
 - 🌐 Website: [FIT DNU](https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin)
 - 📧 Email: [xuanthuan611@gmail.com](mailto:xuanthuan611@gmail.com)
 - 📱 Fanpage: [AIoTLab - FIT DNU](https://www.facebook.com/DNUAIoTLab)
