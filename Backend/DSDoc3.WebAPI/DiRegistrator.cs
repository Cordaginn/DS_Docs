using DSDoc3.BussinessObjects;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace DSDoc3.WebAPI
{
    public static class DiRegistrator
    {
        public static IServiceCollection RegisterDependencies(this IServiceCollection services)
        {
            var diConfigBase = typeof(IDiConfig);

            var assemblies = new List<Assembly>();

            string[] files = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory, "*.dll", SearchOption.TopDirectoryOnly);

            foreach (var file in files)
            {
                AssemblyName assemblyName = AssemblyName.GetAssemblyName(file);
                Assembly.Load(assemblyName);
            }

            var configs = AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetTypes())
                .Where(x => diConfigBase.IsAssignableFrom(x) && x.IsClass)
                .ToArray();
            
            foreach(var config in configs)
            {
                var instance = Activator.CreateInstance(config) as IDiConfig;
                instance.RegisterDepencies(services);
            }

            return services;
        }
    }
}
