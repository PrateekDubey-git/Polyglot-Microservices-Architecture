namespace CartService.DTOs
{
    

    public class AddToCartRequest
    {
        public string ProductType { get; set; } = null!;
        public string ProductRefId { get; set; } = null!;
        public string ConfigurationJson { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

}
