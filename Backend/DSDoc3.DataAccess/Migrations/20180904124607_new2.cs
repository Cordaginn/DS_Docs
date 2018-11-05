using Microsoft.EntityFrameworkCore.Migrations;

namespace DSDoc3.DataAccess.Migrations
{
    public partial class new2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Permission",
                table: "UsersDocuments",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Permission",
                table: "UsersDocuments");
        }
    }
}
