using back_end.Entities;
using back_end.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DI.Interfaces
{
    public interface IUserRepository
    {
        //! authentication method
        SecureModel auth(AuthRequest usermodel);
        User getUserInfoById(string id);
    }
}
