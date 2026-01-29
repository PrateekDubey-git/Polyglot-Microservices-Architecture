using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CartService.Models;

public class CartItem
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public Guid CartId { get; set; }

    [ForeignKey(nameof(CartId))]
    public Cart Cart { get; set; } = null!;

    [Required]
    public string ProductType { get; set; } = null!;

    [Required]
    public string ProductRefId { get; set; } = null!;

    [Column(TypeName = "jsonb")]
    public string ConfigurationJson { get; set; } = null!;

    public int Quantity { get; set; }

    [Column(TypeName = "numeric(18,2)")]
    public decimal UnitPrice { get; set; }

    [Column(TypeName = "numeric(18,2)")]
    public decimal TotalPrice { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

