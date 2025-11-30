using FluentValidation;

namespace ProductCard.Application.Validators;

public class GetProductByIdValidator : AbstractValidator<Guid>
{
    public GetProductByIdValidator()
    {
        RuleFor(x => x)
            .NotEmpty()
            .WithMessage("Product ID cannot be empty.")
            .Must(BeValidGuid)
            .WithMessage("Product ID must be a valid GUID format.");
    }

    private static bool BeValidGuid(Guid id)
    {
        return id != Guid.Empty;
    }
}

