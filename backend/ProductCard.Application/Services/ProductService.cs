using ProductCard.Application.DTOs;
using ProductCard.Application.Interfaces;
using ProductCard.Domain.Entities;
using ProductCard.Domain.Exceptions;

namespace ProductCard.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<ProductDto?> GetProductByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);

        if (product == null)
        {
            return null;
        }

        return MapToDto(product);
    }

    public async Task<IEnumerable<Guid>> GetAllProductIdsAsync(CancellationToken cancellationToken = default)
    {
        return await _productRepository.GetAllProductIdsAsync(cancellationToken);
    }

    private static ProductDto MapToDto(Product product)
    {
        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            ModelUrl = product.ModelUrl,
            BackgroundColor = product.BackgroundColor
        };
    }
}
