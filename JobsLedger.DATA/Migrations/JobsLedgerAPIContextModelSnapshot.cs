﻿// <auto-generated />
using JobsLedger.DATA;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace JobsLedger.DATA.Migrations
{
    [DbContext(typeof(JobsLedgerAPIContext))]
    partial class JobsLedgerAPIContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("JobsLedger.MODEL.Entities.Brand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BrandName");

                    b.Property<string>("ContactName");

                    b.Property<string>("ContactPhNo");

                    b.Property<string>("SparePartsPhNo");

                    b.Property<string>("TechnicalPhNo");

                    b.HasKey("Id");

                    b.ToTable("Brand");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Abn")
                        .HasMaxLength(14);

                    b.Property<bool>("Active")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<bool>("Activity")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(false);

                    b.Property<string>("Address1")
                        .HasMaxLength(500);

                    b.Property<string>("Address2")
                        .HasMaxLength(500);

                    b.Property<string>("BankAccount")
                        .HasMaxLength(20);

                    b.Property<string>("BankBSB")
                        .HasMaxLength(7);

                    b.Property<string>("BankName")
                        .HasMaxLength(500);

                    b.Property<string>("ClientFirstName");

                    b.Property<string>("ClientLastName")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<int>("ClientNo")
                        .HasMaxLength(20);

                    b.Property<bool>("Company");

                    b.Property<string>("CompanyName")
                        .HasMaxLength(100);

                    b.Property<int>("CreatorId");

                    b.Property<DateTime>("DateCreated")
                        .HasMaxLength(500);

                    b.Property<DateTime?>("DateDeActivated");

                    b.Property<DateTime?>("DateUpdated")
                        .HasMaxLength(500);

                    b.Property<string>("Email")
                        .HasMaxLength(500);

                    b.Property<bool>("IsWarrantyCompany")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(false);

                    b.Property<string>("MobilePhone")
                        .HasMaxLength(20);

                    b.Property<string>("Notes")
                        .HasMaxLength(1000);

                    b.Property<string>("Phone")
                        .HasMaxLength(500);

                    b.Property<bool>("RequiresPartsPayment")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(false);

                    b.Property<int?>("SuburbId");

                    b.HasKey("Id");

                    b.HasIndex("CreatorId");

                    b.HasIndex("SuburbId");

                    b.ToTable("Client");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.CompanyDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ABN");

                    b.Property<string>("BankAccount");

                    b.Property<string>("BankBSB");

                    b.Property<string>("BankName");

                    b.Property<string>("CompanyEmail");

                    b.Property<string>("CompanyName");

                    b.Property<string>("CompanyStreet1");

                    b.Property<string>("CompanyStreet2");

                    b.Property<string>("ContactEmail");

                    b.Property<string>("ContactFirstName");

                    b.Property<string>("ContactLastName");

                    b.Property<string>("MobilePhone");

                    b.Property<string>("OfficePhone");

                    b.Property<int?>("SuburbId");

                    b.HasKey("Id");

                    b.HasIndex("SuburbId");

                    b.ToTable("CompanyDetail");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.Error", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Message");

                    b.Property<string>("StackTrace");

                    b.HasKey("Id");

                    b.ToTable("Error");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.Job", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AgentJobNo");

                    b.Property<int?>("BrandId");

                    b.Property<int?>("ClientId");

                    b.Property<int>("CreatorId");

                    b.Property<DateTime>("DateCreated")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(new DateTime(2017, 10, 25, 13, 15, 22, 263, DateTimeKind.Local));

                    b.Property<DateTime?>("DateUpdated");

                    b.Property<int>("JobNo");

                    b.Property<int?>("JobTypeId");

                    b.Property<string>("Model")
                        .HasMaxLength(100);

                    b.Property<string>("Notes")
                        .HasMaxLength(1000);

                    b.Property<string>("ProblemDetails")
                        .HasMaxLength(500);

                    b.Property<string>("Serial")
                        .HasMaxLength(100);

                    b.Property<string>("SolutionDetails")
                        .HasMaxLength(500);

                    b.Property<int?>("StatusId");

                    b.Property<string>("WarrantyCompany")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("BrandId");

                    b.HasIndex("ClientId");

                    b.HasIndex("CreatorId");

                    b.HasIndex("JobTypeId");

                    b.HasIndex("StatusId");

                    b.ToTable("Job");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.JobType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("JobTypeName");

                    b.HasKey("Id");

                    b.ToTable("JobType");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.JobVisit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("EndTime");

                    b.Property<int?>("JobId");

                    b.Property<int?>("JobVisitTypeId");

                    b.Property<string>("Notes");

                    b.Property<DateTime>("StartTime");

                    b.Property<DateTime>("VisitDate");

                    b.HasKey("Id");

                    b.HasIndex("JobId");

                    b.HasIndex("JobVisitTypeId");

                    b.ToTable("JobVisit");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.JobVisitType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("JobVisitTypeName");

                    b.HasKey("Id");

                    b.ToTable("JobVisitType");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.ProgramCounter", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("Value");

                    b.HasKey("Id");

                    b.ToTable("ProgramCounter");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.State", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CompanyStateId");

                    b.Property<string>("Name");

                    b.Property<string>("ShortName");

                    b.HasKey("Id");

                    b.HasIndex("CompanyStateId");

                    b.ToTable("State");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Color");

                    b.Property<string>("Description");

                    b.Property<string>("StatusName");

                    b.HasKey("Id");

                    b.ToTable("Status");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.Suburb", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Latitude");

                    b.Property<double>("Longditude");

                    b.Property<string>("PostCode");

                    b.Property<int>("StateId");

                    b.Property<string>("SuburbName");

                    b.HasKey("Id");

                    b.HasIndex("StateId");

                    b.ToTable("Suburb");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("HashedPassword")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<bool>("IsLocked");

                    b.Property<string>("Salt")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<int?>("SuburbId");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<int>("UserNo");

                    b.HasKey("Id");

                    b.HasIndex("SuburbId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.UserRole", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("RoleId");

                    b.Property<int>("Id");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRole");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.Client", b =>
                {
                    b.HasOne("JobsLedger.MODEL.Entities.User", "Creator")
                        .WithMany("ClientsCreated")
                        .HasForeignKey("CreatorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("JobsLedger.MODEL.Entities.Suburb", "Suburb")
                        .WithMany("Clients")
                        .HasForeignKey("SuburbId");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.CompanyDetail", b =>
                {
                    b.HasOne("JobsLedger.MODEL.Entities.Suburb", "Suburb")
                        .WithMany("CompanyDetails")
                        .HasForeignKey("SuburbId");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.Job", b =>
                {
                    b.HasOne("JobsLedger.MODEL.Entities.Brand", "Brand")
                        .WithMany("JobsWithABrand")
                        .HasForeignKey("BrandId");

                    b.HasOne("JobsLedger.MODEL.Entities.Client", "Client")
                        .WithMany("Jobs")
                        .HasForeignKey("ClientId");

                    b.HasOne("JobsLedger.MODEL.Entities.User", "Creator")
                        .WithMany("JobsCreated")
                        .HasForeignKey("CreatorId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("JobsLedger.MODEL.Entities.JobType", "JobType")
                        .WithMany("JobsWithJobType")
                        .HasForeignKey("JobTypeId");

                    b.HasOne("JobsLedger.MODEL.Entities.Status", "Status")
                        .WithMany("JobsWithStatus")
                        .HasForeignKey("StatusId");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.JobVisit", b =>
                {
                    b.HasOne("JobsLedger.MODEL.Entities.Job", "Job")
                        .WithMany("JobVisits")
                        .HasForeignKey("JobId");

                    b.HasOne("JobsLedger.MODEL.Entities.JobVisitType", "VisitType")
                        .WithMany("JobsVisitTypes")
                        .HasForeignKey("JobVisitTypeId");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.State", b =>
                {
                    b.HasOne("JobsLedger.MODEL.Entities.CompanyDetail", "CompanyState")
                        .WithMany()
                        .HasForeignKey("CompanyStateId");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.Suburb", b =>
                {
                    b.HasOne("JobsLedger.MODEL.Entities.State", "State")
                        .WithMany("AddressLocations")
                        .HasForeignKey("StateId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.User", b =>
                {
                    b.HasOne("JobsLedger.MODEL.Entities.Suburb", "Suburb")
                        .WithMany("Users")
                        .HasForeignKey("SuburbId");
                });

            modelBuilder.Entity("JobsLedger.MODEL.Entities.UserRole", b =>
                {
                    b.HasOne("JobsLedger.MODEL.Entities.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("JobsLedger.MODEL.Entities.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
