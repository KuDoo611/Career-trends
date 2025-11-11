using apixh.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ====== Database connection ======
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register application services
builder.Services.AddScoped<apixh.Services.IUserService, apixh.Services.UserService>();
builder.Services.AddScoped<apixh.Services.ITrendService, apixh.Services.TrendService>();

// ====== Add Swagger ======
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ====== Add Controllers ======
builder.Services.AddControllers();

// ====== CORS ======
var frontendOrigin = "http://localhost:5173";
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(frontendOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// ====== Middleware ======
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS before other middleware that might block requests
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
