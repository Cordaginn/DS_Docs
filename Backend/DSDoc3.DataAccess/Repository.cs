using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using DSDoc3.BussinessObjects.DbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DSDoc3.DataAccess
{
    public class Repository<T> : IDisposable, IRepository<T> where T : class
    {
        protected DbContext Context { get; set; }
        protected DbSet<T> DbSet => Context.Set<T>();
        
      
        public Repository(DbContext context)
        {
            Context = context;
        }

        public virtual async Task<List<T>> GetFiltered(Expression<Func<T,bool>> predicate)
        {
            var result = await DbSet.Where(predicate).ToListAsync();
            return result;
        }


        public virtual async Task<List<T>> GetAllList()
        {
            var result = await DbSet.ToListAsync();
            return result;
        }

        public virtual async Task<T> GetItem(int id)
        {
            var result = await DbSet.FindAsync(id);
            return result;
        }

        public virtual async Task<T> Create(T item)
        {

            Context.Entry<T>(item).State = EntityState.Added;
            await Save();
            return item;
        }

        public virtual async Task<T> Update(T item)
        {
            Context.Entry<T>(item).State = EntityState.Modified;
            await Save();
            return item;
        }

        public virtual async Task Delete(T item)
        {
            var result = await DbSet.FindAsync(item);
            if (result != null)
                DbSet.Remove(result);
            Context.Entry<T>(result).State = EntityState.Deleted;
            await Save();
        }

        public virtual async Task DeleteById(int id)
        {
            var result = await DbSet.FindAsync(id);
            if (result != null)
                DbSet.Remove(result);
            Context.Entry<T>(result).State = EntityState.Deleted;
            await Save();
        }

        public virtual async Task<int> Save()
        {
           return await Context.SaveChangesAsync();
        }

        public virtual async Task<int> DeleteAll()
        {
            var entityToDelete = await DbSet.ToArrayAsync();
            foreach(var entity in entityToDelete)
            {
                Context.Entry<T>(entity).State = EntityState.Deleted;
            }

            return await Save();

        }

        public virtual async Task<int> DeleteFiltered(Expression<Func<T,bool>> predicate)
        {
            var entityToDelete = await DbSet.Where(predicate).ToArrayAsync();
            foreach(var entity in entityToDelete)
            {
                Context.Entry<T>(entity).State = EntityState.Deleted;
            }
            return await Save();

        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    Context.Dispose();
                }
            }
            this.disposed = true;
            
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
