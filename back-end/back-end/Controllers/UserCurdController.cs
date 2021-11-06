using back_end.DI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Entities;
using System.Net;
using System.Text;
using back_end.Utils;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCurdController : ControllerBase
    {

        private IUserCurdRepo<User> _userCurdService;
        public UserCurdController( IUserCurdRepo<User> userCurdRepo)
        {
            this._userCurdService = userCurdRepo;
        }
        [HttpPost("register")]
        public IActionResult register(User regiser)
        {
            regiser.Id = Guid.NewGuid();
            regiser.Password = Encrypt.Base64Encode(regiser.Password);
            User userReturn= this._userCurdService.insert(regiser);
            if (userReturn != null)
            {
                return Ok(new JsonResult("Đang ký tài khoản thành công",userReturn));
            }
            else
            {
                return BadRequest(new { message = "Tài khoản hoặc mật khẩu không đúng" });
            }
      
        }

        [HttpGet("getall")]
        public IActionResult getAll()
        {
            List<User> users = this._userCurdService.getAll().ToList();
            return Ok(new JsonResult(users));
        }

    }
}
