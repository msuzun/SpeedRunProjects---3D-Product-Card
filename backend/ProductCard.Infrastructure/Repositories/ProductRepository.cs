using Microsoft.EntityFrameworkCore;
using ProductCard.Application.Interfaces;
using ProductCard.Domain.Entities;
using ProductCard.Infrastructure.Data;

namespace ProductCard.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Products.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<Product>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Products.ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Guid>> GetAllProductIdsAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Products.Select(p => p.Id).ToListAsync(cancellationToken);
    }
}
