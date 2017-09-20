using Microsoft.AspNetCore.Mvc;

namespace IsomorphicSpa.Controllers
{
	public class PageController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}