# HƯỚNG DẪN SỬA LỖI CORS CHO .NET API

## 🚨 VẤN ĐỀ
Frontend React (port 5173) không thể gọi API .NET (port 5263) vì lỗi CORS.

## 🛠️ GIẢI PHÁP CHO BACKEND .NET API

### 1. Cấu hình CORS trong Program.cs (hoặc Startup.cs)

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// ✅ THÊM CORS CONFIGURATION
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",  // React dev server default
                "http://localhost:5173",  // Vite dev server default
                "http://127.0.0.1:3000",
                "http://127.0.0.1:5173"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials(); // Nếu cần gửi cookies
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ SỬ DỤNG CORS (PHẢI ĐẶT TRƯỚC UseAuthorization)
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### 2. Kiểm tra Controller Users

Đảm bảo bạn có controller xử lý POST request:

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    // GET: api/Users (đã hoạt động)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        // Your existing code
    }

    // ✅ THÊM POST METHOD CHO LOGIN
    [HttpPost]
    public async Task<ActionResult<User>> Login([FromBody] LoginRequest request)
    {
        try
        {
            // Validate email and password
            var user = await _userService.ValidateUser(request.Email, request.Password);
            
            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}

// ✅ THÊM DTO CHO LOGIN REQUEST
public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
```

### 3. Kiểm tra launchSettings.json

Đảm bảo API chạy đúng port:

```json
{
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "http://localhost:5263",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

## 🧪 KIỂM TRA

### 1. Test CORS với Browser
Mở F12 Console và chạy:
```javascript
fetch('http://localhost:5263/api/Users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: '123456' })
})
.then(r => console.log('Success:', r))
.catch(e => console.error('Error:', e));
```

### 2. Test với Postman/curl
```bash
curl -X POST http://localhost:5263/api/Users \
  -H "Content-Type: application/json" \
  -d '{"email":"an@gmail.com","password":"123456"}'
```

## 🔧 NẾUVẪN LỖI

### Options 1: Tạm thời cho phép tất cả origins (chỉ dùng cho development)
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

app.UseCors("AllowAll");
```

### Options 2: Kiểm tra Firewall/Antivirus
- Tắt tạm thời Windows Firewall
- Tắt tạm thời Antivirus
- Chạy Visual Studio as Administrator

## 📝 DEBUGGING STEPS

1. Khởi động lại API server
2. Mở https://localhost:5263/api/Users trong browser
3. Kiểm tra Response Headers có chứa:
   - `Access-Control-Allow-Origin: http://localhost:5173`
   - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE`
   - `Access-Control-Allow-Headers: Content-Type`

Sau khi cấu hình backend, thử đăng nhập lại từ frontend!