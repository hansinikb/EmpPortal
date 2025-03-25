
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Library> Library { get; set; }
        public DbSet<Travel> Travel { get; set; }
        public DbSet<Canteen> Canteen { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .ToTable("Employee");
            modelBuilder.Entity<Attendance>()
                .ToTable("Attendance");
            modelBuilder.Entity<Library>()
                .ToTable("Library");
        }
    }
}
