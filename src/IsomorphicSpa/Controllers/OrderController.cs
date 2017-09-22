using IsomorphicSpa.Models;
using Microsoft.AspNetCore.Mvc;

namespace IsomorphicSpa.Controllers
{
	[Route("api")]
	public class OrderController : Controller
	{
		[HttpGet("order/{orderId}")]
		public IActionResult Get(int orderId)
		{
			if (orderId < 1) {
				return BadRequest();
			}

			if (orderId > 11) {
				return NotFound();
			}

			return Ok(new Order {
				Id = orderId,
				
			});
		}
	}
}