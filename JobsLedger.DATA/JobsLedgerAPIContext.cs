using JobsLedger.MODEL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;

namespace JobsLedger.DATA
{
    public class JobsLedgerAPIContext : DbContext
    {
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<CompanyDetail> CompanyDetails { get; set; }
        public DbSet<Error> Errors { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobType> JobTypes { get; set; }
        public DbSet<JobVisit> JobVisits { get; set; }
        public DbSet<JobVisitType> JobVisitTypes { get; set; }
        public DbSet<ProgramCounter> ProgramCounters { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Suburb> Suburb { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }


        public JobsLedgerAPIContext(DbContextOptions options) : base(options) { }

        public JobsLedgerAPIContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                entity.Relational().TableName = entity.DisplayName();
            }

            // Brand

            // Client
            modelBuilder.Entity<Client>().Property(c => c.ClientNo).HasMaxLength(20);
            modelBuilder.Entity<Client>().Property(c => c.Company).IsRequired();
            modelBuilder.Entity<Client>().Property(c => c.CompanyName).HasMaxLength(100);
            modelBuilder.Entity<Client>().Property(c => c.Abn).HasMaxLength(14);
            modelBuilder.Entity<Client>().Property(c => c.IsWarrantyCompany).HasDefaultValue(false);
            modelBuilder.Entity<Client>().Property(c => c.RequiresPartsPayment).HasDefaultValue(false);
            modelBuilder.Entity<Client>().Property(c => c.ClientLastName).HasMaxLength(500).IsRequired();
            modelBuilder.Entity<Client>().Property(c => c.Email).HasMaxLength(500);
            modelBuilder.Entity<Client>().Property(c => c.MobilePhone).HasMaxLength(20);
            modelBuilder.Entity<Client>().Property(c => c.Phone).HasMaxLength(500);
            modelBuilder.Entity<Client>().Property(c => c.Notes).HasMaxLength(1000);
            modelBuilder.Entity<Client>().Property(c => c.Address1).HasMaxLength(500);
            modelBuilder.Entity<Client>().Property(c => c.Address2).HasMaxLength(500);
            modelBuilder.Entity<Client>().Property(c => c.BankName).HasMaxLength(500);
            modelBuilder.Entity<Client>().Property(c => c.BankBSB).HasMaxLength(7);
            modelBuilder.Entity<Client>().Property(c => c.BankAccount).HasMaxLength(20);
            modelBuilder.Entity<Client>().Property(c => c.Active).HasDefaultValue(true);
            modelBuilder.Entity<Client>().Property(c => c.Activity).HasDefaultValue(false);
            modelBuilder.Entity<Client>().Property(c => c.DateCreated).HasMaxLength(500);
            modelBuilder.Entity<Client>().Property(c => c.DateUpdated).HasMaxLength(500).IsRequired(false);


            modelBuilder.Entity<Client>()
                .HasOne(c => c.Suburb)
                .WithMany(s => s.Clients)
                .HasForeignKey(c => c.SuburbId)
                .IsRequired(false);

            modelBuilder.Entity<Client>()
                .HasOne(c => c.Creator)
                .WithMany(u => u.ClientsCreated)
                .HasForeignKey(c => c.CreatorId)
                .IsRequired();

            // CompanyDetails
            modelBuilder.Entity<CompanyDetail>()
                .HasOne(c => c.Suburb)
                .WithMany(s => s.CompanyDetails)
                .HasForeignKey(c => c.SuburbId)
                .IsRequired(false);

            // Job
            modelBuilder.Entity<Job>().Property(j => j.JobNo).IsRequired();
            modelBuilder.Entity<Job>().Property(j => j.WarrantyCompany).IsRequired();
            modelBuilder.Entity<Job>().Property(j => j.Model).HasMaxLength(100);
            modelBuilder.Entity<Job>().Property(j => j.Serial).HasMaxLength(100);
            modelBuilder.Entity<Job>().Property(j => j.ProblemDetails).HasMaxLength(500);
            modelBuilder.Entity<Job>().Property(j => j.SolutionDetails).HasMaxLength(500);
            modelBuilder.Entity<Job>().Property(j => j.DateCreated).HasDefaultValue(DateTime.Now);
            modelBuilder.Entity<Job>().Property(j => j.DateUpdated).IsRequired(false);
            modelBuilder.Entity<Job>().Property(j => j.Notes).HasMaxLength(1000);

            modelBuilder.Entity<Job>()
                .HasOne(j => j.Client)
                .WithMany(s => s.Jobs)
                .HasForeignKey(j => j.ClientId)
                .IsRequired(false);

            modelBuilder.Entity<Job>()
                .HasOne(j => j.Brand)
                .WithMany(b => b.JobsWithABrand)
                .HasForeignKey(j => j.BrandId)
                .IsRequired(false);

            modelBuilder.Entity<Job>()
                .HasOne(j => j.JobType)
                .WithMany(jt => jt.JobsWithJobType)
                .HasForeignKey(j => j.JobTypeId)
                .IsRequired(false);

            modelBuilder.Entity<Job>()
                .HasOne(j => j.Status)
                .WithMany(s => s.JobsWithStatus)
                .HasForeignKey(j => j.StatusId)
                .IsRequired(false);
            
            modelBuilder.Entity<Job>()
                .HasOne(c => c.Creator)
                .WithMany(u => u.JobsCreated)
                .HasForeignKey(c => c.CreatorId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();


            modelBuilder.Entity<Job>()
                .HasOne(j => j.Client)
                .WithMany(s => s.Jobs)
                .HasForeignKey(j => j.ClientId)
                .IsRequired(false);

            // JobVisit
            modelBuilder.Entity<JobVisit>()
                .HasOne(j => j.Job)
                .WithMany(s => s.JobVisits)
                .HasForeignKey(j => j.JobId)
                .IsRequired(false);

            modelBuilder.Entity<JobVisit>()
                .HasOne(j => j.VisitType)
                .WithMany(s => s.JobsVisitTypes)
                .HasForeignKey(j => j.JobVisitTypeId)
                .IsRequired(false);

            // JobType

            // ProgramCounter

            // Role

            // State

            // Status

            // AddressLocation
            modelBuilder.Entity<Suburb>()
                .HasOne(c => c.State)
                .WithMany(s => s.AddressLocations)
                .HasForeignKey(c => c.StateId)
                .IsRequired();

            // User
            modelBuilder.Entity<User>().Property(u => u.UserName).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<User>().Property(u => u.Email).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<User>().Property(u => u.HashedPassword).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<User>().Property(u => u.Salt).IsRequired().HasMaxLength(200);

            modelBuilder.Entity<User>()
               .HasOne(c => c.Suburb)
               .WithMany(s => s.Users)
               .HasForeignKey(c => c.SuburbId)
               .IsRequired(false);

            // UserRole
            modelBuilder.Entity<UserRole>()
                .HasKey(u => new { u.UserId, u.RoleId });

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            // Role
            modelBuilder.Entity<Role>().Property(r => r.Name).IsRequired().HasMaxLength(50);
        }
    }
}
