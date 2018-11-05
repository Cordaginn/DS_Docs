using Microsoft.Extensions.DependencyInjection;

namespace DSDoc3.BussinessObjects
{
    public interface IDiConfig
    {
        void RegisterDepencies(IServiceCollection services);
    }
}
