using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SuperHeroAPI.Data;
using SuperHeroAPI.Models;

namespace SuperHeroAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SuperHeroController : ControllerBase
	{
		private readonly DataContext _dbContext;

		public SuperHeroController(DataContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<SuperHero>))]
		public async Task<IActionResult> GetHeroes()
		{
			return Ok(await _dbContext.SuperHeroes.ToListAsync());
		}

		[HttpGet]
		[Route("{id:int}")]
		[ProducesResponseType(statusCode:StatusCodes.Status200OK, Type = typeof(SuperHero))]
		[ProducesResponseType(statusCode:StatusCodes.Status404NotFound)]
		public async Task<IActionResult> GetHeroById(int id)
		{
			var dbSuperHero = await FindSuperHeroById(id);
			return dbSuperHero is not null ? Ok(dbSuperHero) : NotFound();
		}

		[HttpPost]
		[Route("Add")]
		[ProducesResponseType(statusCode: StatusCodes.Status201Created)]
		[ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> CreateHero(SuperHero newHero)
		{
			var dbSuperHero = await _dbContext.SuperHeroes.FirstOrDefaultAsync(sh => sh.Name == newHero.Name);
			if (dbSuperHero is not null) return BadRequest(new BadHttpRequestException("This Hero is already exist"));

			var savedSuperHero = await _dbContext.SuperHeroes.AddAsync(newHero);
			await _dbContext.SaveChangesAsync();

			return CreatedAtAction("CreateHero", new {id=savedSuperHero.Entity.Id},  savedSuperHero.Entity);
		}

		[HttpPut]
		[Route("Update/{id:int}")]
		[ProducesResponseType(statusCode: StatusCodes.Status202Accepted, Type = typeof(SuperHero))]
		[ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateSuperHero(int id, SuperHero editedSuperHero)
		{
			var dbSuperHero = await FindSuperHeroById(id);
			if (dbSuperHero is null) return NotFound(new BadHttpRequestException($"There is no Hero with id:{id}"));

			dbSuperHero = EditSuperHero(dbSuperHero, editedSuperHero);
			await _dbContext.SaveChangesAsync();
			return Accepted(dbSuperHero);
		}

		[HttpDelete]
		[Route("Remove/{id:int}")]
		[ProducesResponseType(statusCode: StatusCodes.Status202Accepted, Type = typeof(SuperHero))]
		[ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
		public async Task<IActionResult> DeleteSuperHero(int id)
		{
			var dbSuperHero = await FindSuperHeroById(id);
			if (dbSuperHero is null) return NotFound(new BadHttpRequestException($"There is no Hero with id:{id}"));

			_dbContext.SuperHeroes.Remove(dbSuperHero);
			await _dbContext.SaveChangesAsync();
			return Accepted(dbSuperHero);
		}

		private async Task<SuperHero?> FindSuperHeroById(int id) =>
			await _dbContext.SuperHeroes.SingleOrDefaultAsync(sh => sh.Id == id);

		private static SuperHero EditSuperHero(SuperHero dbSuperHero, SuperHero editedSuperHero)
		{
			dbSuperHero.Name = editedSuperHero.Name ?? dbSuperHero.Name;
			dbSuperHero.FirstName = editedSuperHero.FirstName ?? dbSuperHero.FirstName;
			dbSuperHero.LastName = editedSuperHero.LastName ?? dbSuperHero.LastName;
			dbSuperHero.Place = editedSuperHero.Place ?? dbSuperHero.Place;
			return dbSuperHero;
		}

	}
}
