using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PizzaStore.DB;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
    {
        var apiVersion = "v1";

        c.SwaggerDoc(apiVersion, new OpenApiInfo
        {
            Title = "Pizza Store API",
            Description = "Making the Pizzas you love",
            Version = apiVersion
        });
    });

builder.Services.AddDbContext<PizzaDb>(options => options.UseInMemoryDatabase("items"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/pizzas", async (PizzaDb db) =>
{
    return await db.Pizzas.ToListAsync();
});

app.MapGet("/pizzas/{id}", async (PizzaDb db, int id) =>
{
    return await db.Pizzas.FindAsync(id);
});

app.MapPost("/pizzas", async (PizzaDb db, Pizza pizza) =>
{
    await db.Pizzas.AddAsync(pizza);
    await db.SaveChangesAsync();
    return Results.Created($"/pizza/{pizza.Id}", pizza);
});

app.MapPut("/pizzas", async (PizzaDb db, Pizza updatePizza) =>
{
    var pizza = await db.Pizzas.FindAsync(updatePizza.Id);

    if (pizza == null)
        return Results.NotFound();

    pizza.Name = updatePizza.Name;
    pizza.Description = updatePizza.Description;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/pizzas/{id}", async (PizzaDb db, int id) =>
{
    var pizza = await db.Pizzas.FindAsync(id);

    if (pizza == null)
        return Results.NotFound();

    db.Pizzas.Remove(pizza);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();
