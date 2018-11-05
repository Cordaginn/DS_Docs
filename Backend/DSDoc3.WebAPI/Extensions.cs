using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using DSDoc3.DataAccess;

namespace DSDoc3.WebAPI
{
    public static class Extensions
    {

        public static void UpdateDatabase(this IApplicationBuilder app, ILogger<Startup> logger)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<AppDbContext>())
                {
                    try
                    {
                        context.Database.Migrate();
                    }
                    catch (Exception ex)
                    {
                        logger.LogError("Exception while database migration", ex);
                    }
                }
            }
        }
    }
}