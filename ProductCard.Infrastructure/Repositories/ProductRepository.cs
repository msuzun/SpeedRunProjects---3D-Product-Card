using ProductCard.Application.Interfaces;
using ProductCard.Domain.Entities;

namespace ProductCard.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly List<Product> _products;

    public ProductRepository()
    {
        _products = new List<Product>
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
                Id = Guid.Parse("22345678-1234-1234-1234-123456789012"),
                Name = "Adidas Ultraboost 22",
                Description = "Premium running shoe with responsive cushioning and energy return technology.",
                Price = 179.99m,
                ModelUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
                BackgroundColor = "#4ECDC4"
            },
            new Product
            {
                Id = Guid.Parse("32345678-1234-1234-1234-123456789012"),
                Name = "Jordan 1 Retro High",
                Description = "Legendary basketball sneaker with timeless style and heritage design.",
                Price = 170.00m,
                ModelUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
                BackgroundColor = "#45B7D1"
            },
            new Product
            {
                Id = Guid.Parse("42345678-1234-1234-1234-123456789012"),
                Name = "New Balance 550",
                Description = "Vintage-inspired basketball sneaker with premium materials and retro aesthetics.",
                Price = 110.00m,
                ModelUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
                BackgroundColor = "#FFA07A"
            },
            new Product
            {
                Id = Guid.Parse("52345678-1234-1234-1234-123456789012"),
                Name = "Puma Suede Classic",
                Description = "Iconic suede sneaker with timeless design and versatile style.",
                Price = 65.00m,
                ModelUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
                BackgroundColor = "#98D8C8"
            }
        };
    }

    public Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        return Task.FromResult(product);
    }

    public Task<IEnumerable<Product>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult(_products.AsEnumerable());
    }
}

