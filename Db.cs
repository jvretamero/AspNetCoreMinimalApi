namespace PizzaStore.DB;

public record Pizza
{
    public int Id { get; set; }
    public string? Name { get; set; }
}

public class PizzaDB
{
    private static List<Pizza> _pizzas =
    [
        new() { Id = 1, Name = "Montemagno, Pizza shaped like a great mountain" },
        new() { Id = 2, Name = "The Galloway, Pizza shaped like a submarine, silent but deadly" },
        new() { Id = 3, Name = "The Noring, Pizza shaped like a Viking helmet, where's the mead" },
    ];

    public static List<Pizza> GetPizzas() => _pizzas;

    public static Pizza? GetPizza(int id) =>
        _pizzas.SingleOrDefault(p => p.Id == id);

    public static Pizza CreatePizza(Pizza pizza)
    {
        _pizzas.Add(pizza);
        return pizza;
    }

    public static Pizza? UpdatePizza(Pizza update)
    {
        var pizza = GetPizza(update.Id);

        if (pizza != null)
        {
            pizza.Name = update.Name;
        }

        return pizza;
    }

    public static void RemovePizza(int id)
    {
        _pizzas = _pizzas.FindAll(p => p.Id != id).ToList();
    }
}