using back_end.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class SecureModel
    {
        public Guid id { get; set; }
        public User user { get; set; }
        public string token { get; set; }
        public SecureModel(User user,string token)
        {
            this.user = user;
            this.token = token;
        }
    }
}
