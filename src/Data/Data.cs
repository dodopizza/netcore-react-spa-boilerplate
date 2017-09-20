using System.Collections.Generic;
using IsomorphicSpa.Models;

namespace IsomorphicSpa.Data
{
	public class All
	{
		public static Order Order = new Order();

		public static readonly Dictionary<int, Order> Orders = new Dictionary<int, Order>();

		public static readonly Menu Menu = new Menu {
			Id = 1,
			Products = new List<int> {
				1, 2, 3, 4, 5, 6, 7
			}
		};

		public static readonly Dictionary<int, Product> Products = new Dictionary<int, Product> {
			{ 1, new Product { Id = 1, Name = "Продукт 1", Description = "Описание продукта 1" } },
			{ 2, new Product { Id = 2, Name = "Продукт 2", Description = "Описание продукта 2" } },
			{ 3, new Product { Id = 3, Name = "Продукт 3", Description = "Описание продукта 3" } },
			{ 4, new Product { Id = 4, Name = "Продукт 4", Description = "Описание продукта 4" } },
			{ 5, new Product { Id = 5, Name = "Продукт 5", Description = "Описание продукта 5" } },
			{ 6, new Product { Id = 6, Name = "Продукт 6", Description = "Описание продукта 6" } },
			{ 7, new Product { Id = 7, Name = "Продукт 7", Description = "Описание продукта 7" } },
		};
	}
}