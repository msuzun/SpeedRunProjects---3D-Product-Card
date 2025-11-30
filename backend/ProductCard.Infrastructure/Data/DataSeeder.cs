using ProductCard.Domain.Entities;

namespace ProductCard.Infrastructure.Data;

public class DataSeeder
{
    private readonly AppDbContext _context;

    public DataSeeder(AppDbContext context)
    {
        _context = context;
    }

    public void Seed()
    {
        if (_context.Products.Any())
        {
            return;
        }

        var products = new List<Product>
        {
            new Product
            {
                Id = Guid.Parse("12345678-1234-1234-1234-123456789012"),
                Name = "Nike Air Max 90",
                Description = "Classic sneaker with iconic design and superior comfort. Perfect for everyday wear.",
                Price = 129.99m,
                ModelUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
                BackgroundColor = "#FF6B6B"
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "Adidas Ultraboost 22",
                Description = "Premium running shoe with responsive cushioning and energy return technology.",
                Price = 179.99m,
                ModelUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
                BackgroundColor = "#4ECDC4"
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "Jordan 1 Retro High",
                Description = "Legendary basketball sneaker with timeless style and heritage design.",
                Price = 170.00m,
                ModelUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
                BackgroundColor = "#45B7D1"
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "New Balance 550",
                Description = "Vintage-inspired basketball sneaker with premium materials and retro aesthetics.",
                Price = 110.00m,
                ModelUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
                BackgroundColor = "#FFA07A"
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "Puma Suede Classic",
                Description = "Iconic suede sneaker with timeless design and versatile style.",
                Price = 65.00m,
                ModelUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
                BackgroundColor = "#98D8C8"
            }
        };

        _context.Products.AddRange(products);
        _context.SaveChanges();
    }
}
