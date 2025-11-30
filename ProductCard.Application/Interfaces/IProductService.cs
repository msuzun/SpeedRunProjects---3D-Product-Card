using ProductCard.Application.DTOs;

namespace ProductCard.Application.Interfaces;

public interface IProductService
{
    Task<ProductDto> GetProductByIdAsync(Guid id, CancellationToken cancellationToken = default);
}

