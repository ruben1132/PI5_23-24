using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mpt.Migrations
{
    /// <inheritdoc />
    public partial class AddedCascadeOnPlanningTaskMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanningTasks_Tasks_TaskId",
                table: "PlanningTasks");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanningTasks_Tasks_TaskId",
                table: "PlanningTasks",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanningTasks_Tasks_TaskId",
                table: "PlanningTasks");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanningTasks_Tasks_TaskId",
                table: "PlanningTasks",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
