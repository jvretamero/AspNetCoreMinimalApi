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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/pizzas", () => PizzaDB.GetPizzas());
app.MapGet("/pizzas/{id}", (int id) => PizzaDB.GetPizza(id));
app.MapPost("/pizzas", (Pizza pizza) => PizzaDB.CreatePizza(pizza));
app.MapPut("/pizzas", (Pizza pizza) => PizzaDB.UpdatePizza(pizza));
app.MapDelete("/pizzas/{id}", (int id) => PizzaDB.RemovePizza(id));

app.Run();
