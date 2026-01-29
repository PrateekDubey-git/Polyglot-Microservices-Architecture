using CartService.Data;
using CartService.DTOs;
using CartService.Models;
using Microsoft.EntityFrameworkCore;

namespace CartService.Services;

public class CartService : ICartService
{
    private readonly CartDbContext _context;

    public CartService(CartDbContext context)
    {
        _context = context;
    }

    public async Task<CartResponseDto> GetActiveCartAsync(string userId)
    {
        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId && c.IsActive);

        if (cart == null)
            return CartResponseDto.Empty();

        return CartResponseDto.FromEntity(cart);
    }

    public async Task AddItemAsync(string userId, AddToCartRequest request)
    {
        if (request.Quantity <= 0)
            throw new ArgumentException("Quantity must be greater than zero");

        var cart = await GetOrCreateCart(userId);

        var existingItem = await _context.CartItems.FirstOrDefaultAsync(i =>
            i.CartId == cart.Id &&
            i.ProductType == request.ProductType &&
            i.ProductRefId == request.ProductRefId &&
            i.ConfigurationJson == request.ConfigurationJson
        );

        if (existingItem != null)
        {
            existingItem.Quantity += request.Quantity;
            existingItem.TotalPrice = existingItem.UnitPrice * existingItem.Quantity;
        }
        else
        {
            _context.CartItems.Add(new CartItem
            {
                Id = Guid.NewGuid(),
                CartId = cart.Id,
                ProductType = request.ProductType,
                ProductRefId = request.ProductRefId,
                ConfigurationJson = request.ConfigurationJson,
                Quantity = request.Quantity,
                UnitPrice = request.UnitPrice,
                TotalPrice = request.UnitPrice * request.Quantity,
                CreatedAt = DateTime.UtcNow
            });
        }

        cart.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
    }


    public async Task UpdateItemQuantityAsync(string userId, Guid cartItemId, int quantity)
    {
        var item = await _context.CartItems
            .Include(i => i.Cart)
            .FirstOrDefaultAsync(i => i.Id == cartItemId && i.Cart.UserId == userId);

        if (item == null)
            throw new Exception("Cart item not found");

        item.Quantity = quantity;
        item.TotalPrice = item.UnitPrice * quantity;

        item.Cart.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
    }

    public async Task RemoveItemAsync(string userId, Guid cartItemId)
    {
        var item = await _context.CartItems
            .Include(i => i.Cart)
            .FirstOrDefaultAsync(i => i.Id == cartItemId && i.Cart.UserId == userId);

        if (item == null)
            return;

        _context.CartItems.Remove(item);

        item.Cart.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
    }

    public async Task ClearCartAsync(string userId)
    {
        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId && c.IsActive);

        if (cart == null) return;

        _context.CartItems.RemoveRange(cart.Items);

        cart.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
    }

    // 🔹 helper
    private async Task<Cart> GetOrCreateCart(string userId)
    {
        var cart = await _context.Carts
            .FirstOrDefaultAsync(c => c.UserId == userId && c.IsActive);

        if (cart != null) return cart;

        cart = new Cart
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            IsActive = true
        };

        _context.Carts.Add(cart);
        await _context.SaveChangesAsync();

        return cart;
    }
}
