# ASPNET-CORE-2-Aurelia-JobsLedger
Project that uses ASPNET CORE as the server with Aurelia as the front end with webpack.

You will obviously need VISUAL STUDIO and it does need to have entity framework and all extras.. (tick all the options of you are unsure)

Also, ignore the OTHER FILES directory.. these are files that were used for questions on Stackoverflow etc and have nothing to do with the running project.

<h1>Setting up the database</h1>
1). To create a migrations.cs file using Enitiy Framework Core 2 you have to do the following - From the project directory where your context resides - in this case JobsLedger.DATA - you have to....

create the following migrations.cs file (just need to do this once AND ITS NOT THE SAME FILE AS THE ONE Entity Framework Core 2 creates - I just named it the same and placed it in the web project -Jobsledger.api (NOTE THAT THE FILE IS ALREADY CREATED BUT IT STILL NEEDS TO BE MENTIONED) - Entity Framework Core 2 uses it). This has to be in the API project - Thats JobsLedger.API

using JobsLedger.DATA;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace JobsLedger.API
{
public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory
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

2.) (THIS DOES NEED TO BE DONE!!)
navigate to the same directory as the dbcontext file resides. In the case its the JobsLedger.DATA folder and in a command line you do the following. (open cmd in the JobsLedger.DATA folder)

 RUN THE FOLLOWING: 

dotnet ef migrations add InitialMigration -s ../JobsLedger.API

dotnet ef database update -s ../JobsLedger.API

"-s" is the startup project.

<h2>The Aurelia Front End</h2>
This is definitely a work in progress. It works but I am still learning this framework with quite a bit to go. This is how far I have got in a few months part time.

h2>Running this</h2>
The Aurelia front end is split into two seperate sections - public and app. public is for your "public website" with a login option... and "app is your "application" although I have a long way to go.

To get to your "app" you have log in. username = "admin" and password = "password". It will load dummy data on the first load.
