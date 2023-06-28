using Microsoft.EntityFrameworkCore;
using SuperHeroAPI.Models;

namespace SuperHeroAPI.Data
{
	public class DataContext : DbContext
	{
		public DbSet<SuperHero> SuperHeroes { get; set; }

		public DataContext(DbContextOptions<DataContext> options)
			:base(options)
		{
			
		}
	}
}
