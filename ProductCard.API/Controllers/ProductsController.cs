using Microsoft.AspNetCore.Mvc;
using ProductCard.Application.DTOs;
using ProductCard.Application.Interfaces;
using ProductCard.Application.Validators;

namespace ProductCard.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly GetProductByIdValidator _validator;

    public ProductsController(IProductService productService, GetProductByIdValidator validator)
    {
        _productService = productService;
        _validator = validator;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ProductDto>> GetProductById(Guid id, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(id, cancellationToken);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var product = await _productService.GetProductByIdAsync(id, cancellationToken);
        return Ok(product);
    }
}

