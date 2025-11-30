namespace ProductCard.Application.Options;

public class ProductSettings
{
    public const string SectionName = "ProductSettings";
    
    public int MaxProductsPerPage { get; set; } = 50;
    public bool EnableCaching { get; set; } = true;
    public string DefaultBackgroundColor { get; set; } = "#FFFFFF";
}

