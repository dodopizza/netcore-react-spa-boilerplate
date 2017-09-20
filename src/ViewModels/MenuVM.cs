using System.Collections.Generic;
using IsomorphicSpa.Models;

namespace IsomorphicSpa.ViewModels
{
	public class MenuVM
	{
		public int Id { get; set; }
		public string Type { get; set; } = "menu";
		public List<Product> Products { get; set; } = new List<Product>();
	}
}