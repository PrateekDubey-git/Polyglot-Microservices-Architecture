using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace CartService.Middleware
{
    public class JwtUserMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _config;

        public JwtUserMiddleware(RequestDelegate next, IConfiguration config)
        {
            _next = next;
            _config = config;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();

            if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Missing Authorization header");
                return;
            }

            var token = authHeader.Replace("Bearer ", "");

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_config["Jwt:Secret"]);

                var validationParams = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),

                    ValidateIssuer = false,    // gateway aane ke baad true
                    ValidateAudience = false,  // gateway aane ke baad true

                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(
                    token,
                    validationParams,
                    out SecurityToken validatedToken
                );

                var jwt = (JwtSecurityToken)validatedToken;

                // 🔑 EXACT Java claims
                var userId = jwt.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
                var role = jwt.Claims.FirstOrDefault(c => c.Type == "role")?.Value;
                var onBoard = jwt.Claims.FirstOrDefault(c => c.Type == "onBoard")?.Value;
                var email = jwt.Subject;

                if (string.IsNullOrEmpty(userId))
                    throw new Exception("Invalid token");

                context.Items["UserId"] = userId;
                context.Items["Role"] = role;
                context.Items["OnBoard"] = onBoard;
                context.Items["Email"] = email;

                await _next(context);
            }
            catch
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Invalid or expired token");
            }
        }
    }
}
