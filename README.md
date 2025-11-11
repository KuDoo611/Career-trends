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

Hệ thống **Dự đoán và phân tích xu hướng ngành học** là trang website được xây dựng nhằm mô phỏng quá trình phân tích và dự đoán xu hướng ngàng học 1-3 năm để cho người dùng có xem và định hướng ngành học trong tương lai.  

**Mục tiêu chính:**
- Hiểu rõ cách hoạt động của giao thức TCP trong việc truyền dữ liệu.  
- Nắm vững cơ chế kết nối Client – Server.  
- Thực hành xử lý dữ liệu file (upload/download).  
- Xây dựng giao diện người dùng thân thiện với Java Swing.  

**Chức năng chính:**

**1.1 Client**  
- Giao diện Đăng nhập, Đăng ký.  
- Gửi file: Cho phép người dùng chọn file và gửi đến người nhận khác.  
- Quản lý lịch sử: Xem lịch sử file đã gửi và file đã nhận.  

**1.2 Server**  
- Lắng nghe kết nối: Chấp nhận kết nối từ client trên cổng `12345`.  
- Quản lý truyền file: Nhận và lưu trữ file từ client.  
- Hiển thị thông tin: Thông báo kết nối và lịch sử truyền file.  

**1.3 Database**  
- Quản lý người dùng: Đăng ký, đăng nhập, kiểm tra user.  
- Lưu trữ lịch sử: Ghi nhận các lần gửi/nhận file với trạng thái.  
- Kết nối MySQL qua JDBC.  

---

## 🔧 2. Công nghệ sử dụng  
