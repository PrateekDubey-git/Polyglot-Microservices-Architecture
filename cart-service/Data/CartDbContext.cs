using CartService.Models;
using Microsoft.EntityFrameworkCore;


namespace CartService.Data
{
    public class CartDbContext : DbContext
    {
        public CartDbContext(DbContextOptions<CartDbContext> options)
            : base(options)
        {
        }

        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.Property(e => e.UnitPrice)
                      .HasPrecision(18, 2);

                entity.Property(e => e.TotalPrice)
                      .HasPrecision(18, 2);
            });

        }
    }
}
