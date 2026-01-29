using CartService.Models;

namespace CartService.DTOs
{
    

    public class CartResponseDto
    {
        public Guid CartId { get; set; }
        public List<CartItemDto> Items { get; set; } = [];
        public decimal GrandTotal { get; set; }

        public static CartResponseDto Empty() => new();

        public static CartResponseDto FromEntity(Cart cart)
        {
            return new CartResponseDto
            {
                CartId = cart.Id,
                Items = cart.Items.Select(i => new CartItemDto
                {
                    CartItemId = i.Id,
                    ProductType = i.ProductType,
                    ProductRefId = i.ProductRefId,
                    ConfigurationJson = i.ConfigurationJson,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice,
                    TotalPrice = i.TotalPrice
                }).ToList(),
                GrandTotal = cart.Items.Sum(i => i.TotalPrice)
            };
        }
    }

    public class CartItemDto
    {
        public Guid CartItemId { get; set; }
        public string ProductType { get; set; } = null!;
        public string ProductRefId { get; set; } = null!;
        public string ConfigurationJson { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }

}
