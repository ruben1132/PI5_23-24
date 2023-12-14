﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Mpt.Infrastructure;

#nullable disable

namespace mpt.Migrations
{
    [DbContext(typeof(MptDbContext))]
    [Migration("20231214234834_ChangedTasksMappingMigration")]
    partial class ChangedTasksMappingMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Mpt.Domain.Plannings.Planning", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Cost")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Plannings");
                });

            modelBuilder.Entity("Mpt.Domain.Roles.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Mpt.Domain.Tasks.Task", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Destiny")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DestinyType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("IsApproved")
                        .HasColumnType("bit");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("bit");

                    b.Property<string>("Origin")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OriginType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RobotMovements")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Movements");

                    b.Property<string>("TaskType")
                        .IsRequired()
                        .HasMaxLength(21)
                        .HasColumnType("nvarchar(21)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Tasks");

                    b.HasDiscriminator<string>("TaskType").HasValue("Task");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Mpt.Domain.Users.User", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<bool?>("IsApproved")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PlanningTask", b =>
                {
                    b.Property<string>("PlanningId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("SequenceOrder")
                        .HasColumnType("int");

                    b.HasKey("PlanningId", "TaskId");

                    b.HasIndex("TaskId");

                    b.ToTable("PlanningTasks");
                });

            modelBuilder.Entity("Mpt.Domain.Tasks.PickupDeliveryTask", b =>
                {
                    b.HasBaseType("Mpt.Domain.Tasks.Task");

                    b.Property<string>("DeliveryPersonName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DeliveryPersonPhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PickupPersonName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PickupPersonPhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TaskDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("PickupDelivery");
                });

            modelBuilder.Entity("Mpt.Domain.Tasks.SurveillanceTask", b =>
                {
                    b.HasBaseType("Mpt.Domain.Tasks.Task");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Surveillance");
                });

            modelBuilder.Entity("Mpt.Domain.Plannings.Planning", b =>
                {
                    b.HasOne("Mpt.Domain.Users.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Mpt.Domain.Tasks.Task", b =>
                {
                    b.HasOne("Mpt.Domain.Users.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Mpt.Domain.Users.User", b =>
                {
                    b.HasOne("Mpt.Domain.Roles.Role", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.OwnsOne("Domain.Users.UserPassword", "Password", b1 =>
                        {
                            b1.Property<Guid>("UserId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("Mpt.Domain.Shared.PhoneNumber", "Phone", b1 =>
                        {
                            b1.Property<Guid>("UserId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("Mpt.Domain.Users.UserEmail", "Email", b1 =>
                        {
                            b1.Property<Guid>("UserId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("Mpt.Domain.Users.UserNif", "Nif", b1 =>
                        {
                            b1.Property<Guid>("UserId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.Navigation("Email")
                        .IsRequired();

                    b.Navigation("Nif")
                        .IsRequired();

                    b.Navigation("Password")
                        .IsRequired();

                    b.Navigation("Phone")
                        .IsRequired();
                });

            modelBuilder.Entity("PlanningTask", b =>
                {
                    b.HasOne("Mpt.Domain.Plannings.Planning", "Planning")
                        .WithMany("PlanningTasks")
                        .HasForeignKey("PlanningId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Mpt.Domain.Tasks.Task", "Task")
                        .WithMany("PlanningTasks")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Planning");

                    b.Navigation("Task");
                });

            modelBuilder.Entity("Mpt.Domain.Tasks.PickupDeliveryTask", b =>
                {
                    b.OwnsOne("Mpt.Domain.Users.TaskConfirmationCode", "ConfirmationCode", b1 =>
                        {
                            b1.Property<Guid>("PickupDeliveryTaskId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("PickupDeliveryTaskId");

                            b1.ToTable("Tasks");

                            b1.WithOwner()
                                .HasForeignKey("PickupDeliveryTaskId");
                        });

                    b.Navigation("ConfirmationCode")
                        .IsRequired();
                });

            modelBuilder.Entity("Mpt.Domain.Plannings.Planning", b =>
                {
                    b.Navigation("PlanningTasks");
                });

            modelBuilder.Entity("Mpt.Domain.Tasks.Task", b =>
                {
                    b.Navigation("PlanningTasks");
                });
#pragma warning restore 612, 618
        }
    }
}
