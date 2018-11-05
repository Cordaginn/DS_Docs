using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
namespace DSDoc3.DataAccess
{
    public interface IRepository<T>
       where T : class
    {
        Task<List<T>> GetAllList();
        Task<T> GetItem(int id);
        Task<T> Create(T item);
        Task<T> Update(T item);
        Task Delete(T item);
        Task<int> Save();
    }
}
