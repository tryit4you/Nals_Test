using back_end.DI.Interfaces;
using back_end.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using back_end.Libs;
using back_end.Utils;
using Newtonsoft.Json;

namespace back_end.DI.Services
{
    public class UserCurdService<T> : IUserCurdRepo<T> where T:BaseEntity
    {
        //private IUserCurdRepo<T> _repository;

        //this is repository for read/write file same insert file to database
        private IJsonUtils<T> jsonUtils;
        public UserCurdService(IJsonUtils<T> jsonUtils)
        {
            //this._repository = repository;
            this.jsonUtils = jsonUtils;
        }

        public bool delete(T entity)
        {
            return true;
        }

        public IEnumerable<T> getAll()
        {
            return jsonUtils.readAllJson();
        }

        public T getById(object id)
        {
            return jsonUtils.readSingle(id);

        }

        public T insert(T entity)
        {
            if (entity == null)
            {
                return null;
            }
            
          bool result= jsonUtils.writeSingle(entity);
            if (result)
                return entity;
            return null;
        }

        public T update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
