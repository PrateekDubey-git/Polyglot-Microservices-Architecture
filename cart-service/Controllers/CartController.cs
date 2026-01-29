using CartService.DTOs;
using CartService.Services;
using Microsoft.AspNetCore.Mvc;

namespace CartService.Controllers
{


    [ApiController]
    [Route("api/cart")]
    public class CartController : BaseController
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            return Ok(await _cartService.GetActiveCartAsync(UserId));
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddItem(AddToCartRequest request)
        {
            await _cartService.AddItemAsync(UserId, request);
            return Ok(new { message = "Item added to cart" });
        }

        [HttpPut("item/{cartItemId}")]
        public async Task<IActionResult> UpdateItem(Guid cartItemId, UpdateCartItemRequest request)
        {
            await _cartService.UpdateItemQuantityAsync(UserId, cartItemId, request.Quantity);
            return Ok(new { message = "Cart item updated" });
        }

        [HttpDelete("item/{cartItemId}")]
        public async Task<IActionResult> RemoveItem(Guid cartItemId)
        {
            await _cartService.RemoveItemAsync(UserId, cartItemId);
            return Ok(new { message = "Item removed from cart" });
        }

        [HttpDelete("clear")]
        public async Task<IActionResult> ClearCart()
        {
            await _cartService.ClearCartAsync(UserId);
            return Ok(new { message = "Cart cleared" });
        }
    }


}
