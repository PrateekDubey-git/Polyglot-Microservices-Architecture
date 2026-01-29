using CartService.DTOs;

namespace CartService.Services
{


    public interface ICartService
    {
        Task<CartResponseDto> GetActiveCartAsync(string userId);

        Task AddItemAsync(string userId, AddToCartRequest request);

        Task UpdateItemQuantityAsync(string userId, Guid cartItemId, int quantity);

        Task RemoveItemAsync(string userId, Guid cartItemId);

        Task ClearCartAsync(string userId);
    }

}

