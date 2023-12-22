using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mpt.Migrations
{
    /// <inheritdoc />
    public partial class ChangedTasksMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryPlace",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "FloorIds",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "PickupPlace",
                table: "Tasks");

            migrationBuilder.AddColumn<string>(
                name: "Destiny",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DestinyType",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Origin",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OriginType",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Destiny",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "DestinyType",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Origin",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "OriginType",
                table: "Tasks");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryPlace",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FloorIds",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PickupPlace",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
