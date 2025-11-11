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
  
  <p align="center"><img width="428" height="392" alt="image" src="https://github.com/user-attachments/assets/2c479f08-73ee-403a-83d8-b83fa760ea00" /><br/>

  <p align="center"><i>Hình 1: Giao diện Đăng nhập</i>
</p>
<br/>

- **Giao diện Đăng ký**
  
<p align="center"><img width="429" height="394" alt="image" src="https://github.com/user-attachments/assets/6747bac6-ac32-431c-899b-86efdf8dcc23" /><br/>

  <p align="center"><i>Hình 2: Giao diện Đăng ký</i>
</p>
<br/>

- **Giao diện người dùng**
  
<img width="881" height="687" alt="image" src="https://github.com/user-attachments/assets/4528a17c-1386-4450-8902-40c0803474a7" /><br/>


  <p align="center"><i>Hình 3: Giao diện người dùng</i>
</p>
<br/>

- **Giao diện người dùng truyền file**
  
<img width="1757" height="688" alt="image" src="https://github.com/user-attachments/assets/9640e776-90cc-4c02-8f48-feedfa072090" /><br/>


  <p align="center"><i>Hình 4: Giao diện người dùng truyền file giữa các client và lưu lại thông báo</i>
</p>
<br/>

## 📝 4. Các bước cài đặt  
#### Bước 1: Chuẩn bị môi trường
1. **Kiểm tra Java**: Mở terminal/command prompt và chạy:
   ```bash
   java -version
   javac -version
   ```
   Đảm bảo cả hai lệnh đều hiển thị phiên bản Java 8 trở lên.

2. **Chuẩn bị IDE**: Khởi động Eclipse IDE và chọn workspace là thư mục vừa tạo.

#### Bước 2: Tạo project và cấu trúc
1. **Tạo Java Project**:
   - **File** → **New** → **Java Project**
   - **Project name**: `TCPFileTransfer`
   - **JRE**: Sử dụng default JRE (*Java 21*)
   - Bỏ check **"Create module-info.java file"**
   - Click **Finish**

2. **Tạo cấu trúc package**: Trong thư mục `src`, tạo các package:
   ```
   src/
   ├── server/
   ├── client/
   ├── common/
   └── utils/
   ```
   *Cách tạo: Right-click `src` → **New** → **Package** → Nhập tên package → **Finish***

3. **Tạo các file Java**:
   - `server/TCPFileServer.java` (*với main method*)
   - `server/ClientHandler.java` (*implement Runnable*)
   - `client/TCPFileClient.java`
   - `client/ClientGUI.java` (*extends JFrame, với main method*)
   - `common/FileInfo.java`
   - `utils/FileUtils.java`

#### Bước 3: Copy mã nguồn
1. **Copy source code**: Sao chép nội dung code vào từng file tương ứng đã tạo.

2. **Organize imports**: Sử dụng **Ctrl+Shift+O** để tự động import các thư viện cần thiết.

3. **Kiểm tra lỗi**: Đảm bảo không có lỗi compile trong Project Explorer.

#### Bước 4: Chạy ứng dụng

**Khởi động Server:**
1. **Right-click** file `TCPFileServer.java`
2. **Run As** → **Java Application**
3. Server sẽ khởi động trên port **12345** mặc định
4. Console hiển thị:
   ```
   Server đã khởi động trên port 12345
   Đang chờ client kết nối...
   ```

**Khởi động Client:**
1. **Right-click** file `ClientGUI.java`
2. **Run As** → **Java Application**  
3. Giao diện GUI sẽ xuất hiện
4. Click nút **"Kết Nối"** để kết nối đến Server
5. Status sẽ chuyển thành **"Đã kết nối"** (*màu xanh*)
6. Server console sẽ hiển thị: `Client đã kết nối: /127.0.0.1`

---


## 📌 5. Liên hệ 
- **Sinh viên thực hiện:** **Nguyễn Xuân Thuận**
 - 🌐 Website: [FIT DNU](https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin)
 - 📧 Email: [xuanthuan611@gmail.com](mailto:xuanthuan611@gmail.com)
 - 📱 Fanpage: [AIoTLab - FIT DNU](https://www.facebook.com/DNUAIoTLab)
