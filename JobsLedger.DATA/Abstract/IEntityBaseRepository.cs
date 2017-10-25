using JobsLedger.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace JobsLedger.DATA.Abstract
{
    public interface IEntityBaseRepository<T> where T : class, IEntityBase, new()
    {
        IQueryable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties);
        Task<IEnumerable<T>> AllIncludingAsync(params Expression<Func<T, object>>[] includeProperties);
        IQueryable<T> GetAll();
        int Count();
        Task<IEnumerable<T>> GetAllAsync();

        // Get an entity by int id
        T GetSingle(int id);

        T GetSingle(Expression<Func<T, bool>> predicate);

        T GetSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);

        Task<T> GetSingleAsync(int id);

        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);

        Task<IEnumerable<T>> FindByAsync(Expression<Func<T, bool>> predicate);

        // Marks an entity as new
        void Add(T entity);

        // Marks an entity to be removed
        void Delete(T entity);

        // Marks an entity as modified
        void Edit(T entity);

        void Commit();
    }
}
