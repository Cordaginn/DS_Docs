using DSDoc3.BussinessObjects;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DSDoc3.BussinessObjects.Identity;
namespace DSDoc3.DataAccess
{
    public class DIConfig : IDiConfig
    {
        public void RegisterDepencies(IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<AppDbContext>();
            services.AddScoped<AuthOptions>();
        }

    }
}
