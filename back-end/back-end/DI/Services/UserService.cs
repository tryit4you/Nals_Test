using back_end.DI.Interfaces;
using back_end.Entities;
using back_end.MiddleWare;
using back_end.Models;
using back_end.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace back_end.DI.Services
{
    public class UserService : IUserRepository
    {
        private readonly AppSettings _appSettings;
        private readonly IUserCurdRepo<User> _userCurdRepo;
        public UserService(IOptions<AppSettings> appSetting,IUserCurdRepo<User> userCurdRepo)
        {
            this._appSettings = appSetting.Value;
            this._userCurdRepo = userCurdRepo;
        }

        public SecureModel auth(AuthRequest usermodel)
        {
            string passwordEncrypt = Encrypt.Base64Encode(usermodel.Password);
            User user = this._userCurdRepo.getAll().Where(x=>x.Username==usermodel.Username&&x.Password== passwordEncrypt).SingleOrDefault();
          

            if (user == null) return null;
            var token = generateJwtToken(user);
            return new SecureModel(user, token);
        }

        public User getUserInfoById(string id)
        {
            return this._userCurdRepo.getById(id);
        }

       
        private string generateJwtToken(User auth)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", auth.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }

    }
}
