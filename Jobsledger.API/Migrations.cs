using JobsLedger.DATA;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace JobsLedger.API
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<JobsLedgerAPIContext>
    {
        public JobsLedgerAPIContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var builder = new DbContextOptionsBuilder<JobsLedgerAPIContext>();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            builder.UseSqlServer(connectionString);

            return new JobsLedgerAPIContext(builder.Options);
        }
    }
}