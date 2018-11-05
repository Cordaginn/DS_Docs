using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using DSDoc3.BussinessObjects.Identity;
using Microsoft.EntityFrameworkCore;
using DSDoc3.BussinessObjects.DbModels;

namespace DSDoc3.DataAccess
{
    public class AppDbContext : IdentityDbContext<User,Role,int,Claim,UserRole,Login,RoleClaim,Token>
    {
        public DbSet<Document> Documents { get; set; }
        public DbSet<UserDocuments> UsersDocuments { get; set; } 
        public AppDbContext(DbContextOptions<AppDbContext> options)
             : base(options)
        {
        }

     
    }
}
