using JobsLedger.MODEL.Entities;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace JobsLedger.DATA.InitialData
{
    public static class JobsDBInitializer
    {
        public static void Initialize(JobsLedgerAPIContext context)
        {
            InitializeBasicSettings(context);
            InitializeRolesAndAdminUser(context);
        }

        private static void InitializeBasicSettings(JobsLedgerAPIContext context)
        {
            InitializeBrands(context);
            InitializeJobTypes(context);
            InitializeStatuses(context);
            InitializeJobVisitTypes(context);
            InitializeCompanyDetails(context);
            InitializeProgramCounters(context);
        }

        private static void InitializeRolesAndAdminUser(JobsLedgerAPIContext context)
        {
            InitializeRoles(context);
            IntialiseUsers(context);
        }

        // Private methods for IntitializeBasicSettings
        private static void InitializeBrands(JobsLedgerAPIContext context)
        {
            // Look for any brands.
            if (context.Brands.Any())
            {
                return;     //DB table data already created.
            }

            var brands = new Brand[]
            {
                new Brand { BrandName = "Beko", ContactName = "Sandro Senise", ContactPhNo = "0418182585", TechnicalPhNo = "1300850534", SparePartsPhNo = "-" },
                new Brand { BrandName = "Fisher & Paykel", ContactName = "Phil Beams", ContactPhNo = "0417614339", TechnicalPhNo = "1300850534", SparePartsPhNo = "1300650585" },
                new Brand { BrandName = "Home Appliances", ContactName = "Call Centre", ContactPhNo = "1800444357", TechnicalPhNo = "1800444357", SparePartsPhNo = "1300306973" },
                new Brand { BrandName = "Other", ContactName = "na", ContactPhNo = "na", TechnicalPhNo = "na", SparePartsPhNo = "na" }
            };
            foreach (Brand b in brands)
            {
                context.Brands.Add(b);
            }

            context.SaveChanges();
        }

        private static void InitializeJobTypes(JobsLedgerAPIContext context)
        {
            // Look for any JobTypes.
            if (context.JobTypes.Any())
            {
                return;     //DB table data already created.
            }

            var jobTypes = new JobType[]
            {
                new JobType { JobTypeName = "Oven-Domestic repair" },
                new JobType { JobTypeName = "Oven-Changeover" },
                new JobType { JobTypeName = "Stove-Domestic repair" },
                new JobType { JobTypeName = "Stove-Changeover" },
                new JobType { JobTypeName = "Rangehood-Domestic Repair" },
                new JobType { JobTypeName = "Fridge-Domestic Repair" },
                new JobType { JobTypeName = "Fridge-Changeover" },
                new JobType { JobTypeName = "WashingMachine-Domestic Repair" },
                new JobType { JobTypeName = "WashingMachine-Changeover" },
                new JobType { JobTypeName = "Dryer-Domestic Repair" },
                new JobType { JobTypeName = "Dryer-Changeover" },
                new JobType { JobTypeName = "Dishwasher-Domestic Repair" },
                new JobType { JobTypeName = "Dishwasher-Changeover" },
                new JobType { JobTypeName = "Commercial Ref-Repairs" },
                new JobType { JobTypeName = "Commercial Ref-Install" },
                new JobType { JobTypeName = "AC-Repairs" },
                new JobType { JobTypeName = "AC-New installation" },
                new JobType { JobTypeName = "Other" }
            };

            foreach (JobType j in jobTypes)
            {
                context.JobTypes.Add(j);
            }

            context.SaveChanges();
        }

        private static void InitializeStatuses(JobsLedgerAPIContext context)
        {
            // Look for any statuses.
            if (context.Statuses.Any())
            {
                return;     //DB table data already created.
            }

            var statuses = new Status[]
            {
                new Status { StatusName = "Intial Attend", Description = "Job booked but not yet attended to", Color = "#7FFFD4" },
                new Status { StatusName = "Parts Required", Description = "Parts to be ordered", Color = "#FFD700" },
                new Status { StatusName = "Parts Ordered", Description = "Parts now ordered", Color = "#DAA520" },
                new Status { StatusName = "Attend to fit Parts", Description = "Parts available now - require fitting", Color = "#1E90FF" },
                new Status { StatusName = "Attend on callback", Description = "Client request call back", Color = "#8B0000" },
                new Status { StatusName = "Ready to Invoice", Description = "Job Completed invoice required", Color = "#FF0000" },
                new Status { StatusName = "Awaiting payment", Description = "Invoiced - awaiting payment", Color = "#8B0000" },
                new Status { StatusName = "Job Completed", Description = "Job Completed and paid for", Color = "#32CD32" }
            };

            foreach (Status s in statuses)
            {
                context.Statuses.Add(s);
            }

            context.SaveChanges();
        }

        private static void InitializeJobVisitTypes(JobsLedgerAPIContext context)
        {
            // Look for any jobVisitTypes.
            if (context.JobVisitTypes.Any())
            {
                return;     //DB table data already created.
            }

            var jobVisitTypes = new JobVisitType[]
            {
                new JobVisitType { JobVisitTypeName = "Initial Visit" },
                new JobVisitType { JobVisitTypeName = "Fit Parts" },
                new JobVisitType { JobVisitTypeName = "Other" }
            };

            foreach (JobVisitType j in jobVisitTypes)
            {
                context.JobVisitTypes.Add(j);
            }

            context.SaveChanges();
        }

        private static void InitializeCompanyDetails(JobsLedgerAPIContext context)
        {
            // Look for any CompanyDetails.
            if (context.CompanyDetails.Any())
            {
                return;     //DB table data already created.
            }

            var companyDetails = new CompanyDetail[]
            {
                new CompanyDetail
                {
                    CompanyName = "My Company",
                    ContactFirstName = "Simon",
                    ContactLastName = "O'Farrell",
                    ContactEmail = "simonofarrell@optusnet.com.au",
                    MobilePhone = "0401 191975",
                    OfficePhone = "(03)5446-1374",
                    CompanyEmail = "test@test.com.au",
                    CompanyStreet1 = "42 Napier St",
                    CompanyStreet2 = "",
                    Suburb = context.Suburb.Single(a => a.SuburbName == "Eaglehawk"),
                    ABN = "56071540826",
                    BankName = "CBA",
                    BankBSB = "06-7102",
                    BankAccount = "00111111"
                }
            };
            foreach (CompanyDetail c in companyDetails)
            {
                context.CompanyDetails.Add(c);
            }

            context.SaveChanges();
        }

        private static void InitializeProgramCounters(JobsLedgerAPIContext context)
        {
            // Look for any programCounters.
            if (context.ProgramCounters.Any())
            {
                return;     //DB table data already created.
            }

            var programCounters = new ProgramCounter[]
            {
                new ProgramCounter { Name = "ClientNo", Value = 1000 },
                new ProgramCounter { Name = "UserNo", Value = 1000 },
                new ProgramCounter { Name = "JobNo", Value = 1500 }
            };

            foreach (ProgramCounter p in programCounters)
            {
                context.ProgramCounters.Add(p);
            }

            context.SaveChanges();
        }

        // Private methods for InitializeRolesAndAdminUsers
        private static void InitializeRoles(JobsLedgerAPIContext context)
        {
            // Look for any Rols.
            if (context.Roles.Any())
            {
                return;  //DB table data already created.
            }

            var roles = new Role[]
            {
                new Role { Name = "Admin" },
                new Role { Name = "Employee" }
            };

            foreach (Role r in roles)
            {
                context.Roles.Add(r);
            }

            context.SaveChanges();
        }

        private static void IntialiseUsers(JobsLedgerAPIContext context)
        {
            if (context.Users.Any())
            {
                return;    //DB table data already created.
            }

            var Salt = "GTtKxJA6xJuj3ifJtTXn9Q==";
            var Password = "password";
            var _HashedPassword = "";

            using (var sha256 = SHA256.Create())
            {
                var saltedPassword = string.Format("{0}{1}", Salt, Password);
                byte[] saltedPasswordAsBytes = Encoding.UTF8.GetBytes(saltedPassword);
                _HashedPassword = Convert.ToBase64String(sha256.ComputeHash(saltedPasswordAsBytes));
            }

            var _userCounter = context.ProgramCounters.Where(c => c.Name == "UserNo").FirstOrDefault<ProgramCounter>();

            _userCounter.Value = _userCounter.Value + 1;  // Update the UserCounter current value to reflect new client and start at 1000.

            context.Update(_userCounter);

            var _addressLocationId = context.Suburb.Where(a => a.SuburbName == "Eaglehawk").FirstOrDefault().Id;

            context.Users.Add(new User()
            {
                UserNo = _userCounter.Value,
                Email = "simonofarrell@optusnet.com.au",
                UserName = "admin",
                HashedPassword = _HashedPassword,
                Salt = "GTtKxJA6xJuj3ifJtTXn9Q==",
                IsLocked = false,
                DateCreated = DateTime.Now,
                SuburbId = context.Suburb.Where(a => a.SuburbName == "Eaglehawk").FirstOrDefault().Id
            });

            _userCounter.Value = _userCounter.Value + 1;  // We need to progress the counter to the next value.

            // create admin role for new admin user
            context.UserRoles.Add(new UserRole() { RoleId = 1, UserId = 1 });

            context.SaveChanges();
        }
    }
}