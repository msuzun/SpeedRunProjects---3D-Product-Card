namespace ProductCard.Application.DTOs;

public class ProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ModelUrl { get; set; } = string.Empty;
    public string BackgroundColor { get; set; } = string.Empty;
}

