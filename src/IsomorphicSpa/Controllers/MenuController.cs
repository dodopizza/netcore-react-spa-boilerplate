using System.Collections.Generic;
using System.Linq;
using IsomorphicSpa.Models;
using IsomorphicSpa.ViewModels;
using JsonApiSerializer;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace IsomorphicSpa.Controllers
{
	[Route("api")]
	public class MenuController : Controller
	{
		[HttpGet("menu")]
		public IActionResult Get()
		{
			// Map to VM
			var menu = new MenuVM {
				Id = Data.All.Menu.Id,
				Products = Data.All.Menu.Products.Select(x => Data.All.Products[x]).ToList()
			};

			//Serialize into JSON:API format
			var json = JsonConvert.SerializeObject(menu, new JsonApiSerializerSettings());

			return Ok(json);
		}
	}
}