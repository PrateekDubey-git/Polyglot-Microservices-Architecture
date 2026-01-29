using CartService.Data;
using CartService.Middleware;
using CartService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Database Configuration (PostgreSQL)
builder.Services.AddDbContext<CartDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Dependency Injection
builder.Services.AddScoped<ICartService, CartService.Services.CartService>();

// 3. Permissive CORS for Gateway Architecture
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll", policy =>
//    {
//        policy.AllowAnyOrigin()
//              .AllowAnyMethod()
//              .AllowAnyHeader();
//    });
//});

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

// 4. Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// IMPORTANT: CORS must come before Routing and Auth
//app.UseCors("AllowAll");

// IMPORTANT: Remove app.UseHttpsRedirection() when running behind a Gateway/Docker 
// to avoid 301 redirect loops inside the container.

app.UseRouting();

// Custom Middleware for JWT 
app.UseMiddleware<JwtUserMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();