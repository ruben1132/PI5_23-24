using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mpt.Migrations
{
    /// <inheritdoc />
    public partial class ChangedIsApprovedMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "IsApproved",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "pending",
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IsApproved",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "pending",
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsApproved",
                table: "Users",
                type: "bit",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldDefaultValue: "pending");

            migrationBuilder.AlterColumn<bool>(
                name: "IsApproved",
                table: "Tasks",
                type: "bit",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldDefaultValue: "pending");
        }
    }
}
