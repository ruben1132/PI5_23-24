using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mpt.Migrations
{
    /// <inheritdoc />
    public partial class ChangedTasksMappingMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PickupPersonPhoneNumber_Value",
                table: "Tasks",
                newName: "PickupPersonPhoneNumber");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber_Value",
                table: "Tasks",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "DeliveryPersonPhoneNumber_Value",
                table: "Tasks",
                newName: "DeliveryPersonPhoneNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PickupPersonPhoneNumber",
                table: "Tasks",
                newName: "PickupPersonPhoneNumber_Value");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Tasks",
                newName: "PhoneNumber_Value");

            migrationBuilder.RenameColumn(
                name: "DeliveryPersonPhoneNumber",
                table: "Tasks",
                newName: "DeliveryPersonPhoneNumber_Value");
        }
    }
}
