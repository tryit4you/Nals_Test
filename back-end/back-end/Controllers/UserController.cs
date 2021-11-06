using back_end.DI.Interfaces;
using back_end.Entities;
using back_end.MiddleWare;
using back_end.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserRepository _userService;
        private IUserCurdRepo<User> _userCurdService;
        public UserController(IUserRepository userService, IUserCurdRepo<User> userCurdRepo)
        {
            this._userService = userService;
            this._userCurdService = userCurdRepo;
        }
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthRequest model)
        {
            var response = _userService.auth(model);

            if (response == null)
                return BadRequest(new JsonResult( "Tài khoản hoặc mật khẩu không đúng" ) {
                   StatusCode= (int?)HttpStatusCode.BadRequest
                });
            return Ok(response);
        }
     
        [CustomAuthorize]
        [HttpGet("users")]
        public IActionResult GetUserInfo(String userid)
        {
            var users = _userService.getUserInfoById(userid);
            return Ok(users);
        }
    }
}
