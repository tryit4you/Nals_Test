using back_end.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Utils
{
    public interface IJsonUtils<T> where T:BaseEntity
    {
        public string file { get; }
        IEnumerable<T> readAllJson();
        bool writeAll(IEnumerable<T> obj);
        bool writeSingle(T obj);
        T readSingle(object id);
    }
}
