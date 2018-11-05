using System;
using System.Collections.Generic;
using System.Text;
using DSDoc3.BussinessObjects;
using Microsoft.Extensions.DependencyInjection;

namespace DSDoc3.Core
{
    public class DIConfig : IDiConfig
    {
        public void RegisterDepencies(IServiceCollection services)
        {
            services.AddScoped<VersionHelper>();
            services.AddScoped<ErrorHandler>();
        }
    }
}
