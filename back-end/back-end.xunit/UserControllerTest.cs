using back_end.Controllers;
using back_end.DI.Interfaces;
using back_end.Entities;
using back_end.Models;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace back_end.xunit
{
    public class UserControllerTest
    {
        [Fact]
        public void login_with_correct_username_and_password()
        {
            AuthRequest auth = new AuthRequest();
            auth.Username = "hungvv";
            auth.Password = "123456";
            
            var dataStore = A.Fake<IUserRepository>();
            var dataRecived = A.Dummy<SecureModel>();
            A.CallTo(() => dataStore.auth(auth)).Returns(dataRecived);

            var controller = new UserController(dataStore);


            var actionResult = controller.Authenticate(auth);

            //assert
            var result = actionResult.Result as OkObjectResult;

            var secure = result.Value as SecureModel;

            Assert.NotNull(secure);
        }
   
       
    }
}
