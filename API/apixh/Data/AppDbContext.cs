using Microsoft.EntityFrameworkCore;
using apixh.Models;

namespace apixh.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<UniversityMajor> UniversityMajors { get; set; }
        public DbSet<Major> Majors { get; set; }
        public DbSet<AdmissionStats> AdmissionStats { get; set; }
        public DbSet<TrendStats> TrendStats { get; set; }
    public DbSet<MarketAnalysis> MarketAnalysis { get; set; }
    // plural alias for consistency
    public DbSet<MarketAnalysis> MarketAnalyses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Ensure table names match the actual DB tables and map FK column names
            modelBuilder.Entity<University>().ToTable("Universities");
            modelBuilder.Entity<Major>().ToTable("Majors");
            modelBuilder.Entity<UniversityMajor>().ToTable("UniversityMajors");
            modelBuilder.Entity<TrendStats>().ToTable("TrendStatistics");
            modelBuilder.Entity<MarketAnalysis>().ToTable("MarketAnalysis");

            // University additional columns mapping
            modelBuilder.Entity<University>()
                .Property(u => u.Ranking)
                .HasColumnName("Ranking");

            modelBuilder.Entity<University>()
                .Property(u => u.AdmissionScore)
                .HasColumnName("AdmissionScore")
                .HasColumnType("decimal(4,2)");

            modelBuilder.Entity<University>()
                .Property(u => u.TuitionFee)
                .HasColumnName("TuitionFee")
                .HasColumnType("decimal(10,2)");

            // UniversityMajor -> University
            modelBuilder.Entity<UniversityMajor>()
                .Property(um => um.UniversityCode)
                .HasColumnName("UniversityCode");

            modelBuilder.Entity<UniversityMajor>()
                .HasOne(um => um.University)
                .WithMany(u => u.UniversityMajors)
                .HasForeignKey(um => um.UniversityCode)
                .HasPrincipalKey(u => u.UniversityCode)
                .OnDelete(DeleteBehavior.Restrict);

            // UniversityMajor -> Major
            modelBuilder.Entity<UniversityMajor>()
                .Property(um => um.MajorCode)
                .HasColumnName("MajorCode");

            modelBuilder.Entity<UniversityMajor>()
                .HasOne(um => um.Major)
                .WithMany(m => m.UniversityMajors)
                .HasForeignKey(um => um.MajorCode)
                .HasPrincipalKey(m => m.MajorCode)
                .OnDelete(DeleteBehavior.Restrict);

            // TrendStats -> Major
            modelBuilder.Entity<TrendStats>()
                .Property(t => t.MajorCode)
                .HasColumnName("MajorCode");

            modelBuilder.Entity<TrendStats>()
                .HasOne(t => t.Major)
                .WithMany(m => m.TrendStatistics)
                .HasForeignKey(t => t.MajorCode)
                .HasPrincipalKey(m => m.MajorCode)
                .OnDelete(DeleteBehavior.Restrict);

            // MarketAnalysis -> Major
            modelBuilder.Entity<MarketAnalysis>()
                .Property(a => a.MajorCode)
                .HasColumnName("MajorCode");

            modelBuilder.Entity<MarketAnalysis>()
                .HasOne(a => a.Major)
                .WithMany(m => m.MarketAnalyses)
                .HasForeignKey(a => a.MajorCode)
                .HasPrincipalKey(m => m.MajorCode)
                .OnDelete(DeleteBehavior.Restrict);

            // MarketAnalysis.CreatedBy -> Users
            modelBuilder.Entity<MarketAnalysis>()
                .Property(a => a.CreatedBy)
                .HasColumnName("CreatedBy");

            modelBuilder.Entity<MarketAnalysis>()
                .HasOne(a => a.CreatedByUser)
                .WithMany()
                .HasForeignKey(a => a.CreatedBy)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            // Ignore non-persisted property
            modelBuilder.Entity<MarketAnalysis>()
                .Ignore(a => a.AnalysisContent);
        }
    }
}
