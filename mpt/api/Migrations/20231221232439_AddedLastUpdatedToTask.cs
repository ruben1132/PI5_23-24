using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mpt.Migrations
{
    /// <inheritdoc />
    public partial class AddedLastUpdatedToTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Tasks",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Tasks");
        }
    }
}
