using System.Collections.Generic;

namespace IsomorphicSpa.Models
{
	public class Menu
	{
		public int Id { get; set; }
		public List<int> Products { get; set; } = new List<int>();
	}
}