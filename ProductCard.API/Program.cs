using FluentValidation;
using FluentValidation.AspNetCore;
using ProductCard.API.Middleware;
using ProductCard.Application.Interfaces;
using ProductCard.Application.Options;
using ProductCard.Application.Services;
using ProductCard.Application.Validators;
using ProductCard.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Options Pattern
builder.Services.Configure<ProductSettings>(
    builder.Configuration.GetSection(ProductSettings.SectionName));

// Register FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddScoped<GetProductByIdValidator>();

// Register Application Services
builder.Services.AddScoped<IProductService, ProductService>();

// Register Infrastructure Services
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost5173", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowLocalhost5173");

// Use Exception Handling Middleware
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
