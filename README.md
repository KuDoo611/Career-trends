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

