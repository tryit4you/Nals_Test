using back_end.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DI.Interfaces
{
    public interface IUserCurdRepo<T> where T:BaseEntity
    {
        IEnumerable<T> getAll();
        T getById(object id);
        T insert(T entity);
        bool delete(T entity);
        T update(T entity);
    }
}
