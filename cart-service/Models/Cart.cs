using System.ComponentModel.DataAnnotations;

namespace CartService.Models;

public class Cart
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string UserId { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public bool IsActive { get; set; } = true;

    public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
}

