using Microsoft.AspNetCore.Mvc;

namespace CartService.Controllers
{
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        protected string UserId =>
            HttpContext.Items["UserId"]?.ToString();

        protected string Email =>
            HttpContext.Items["Email"]?.ToString();

        protected string Role =>
            HttpContext.Items["Role"]?.ToString();
    }
}
