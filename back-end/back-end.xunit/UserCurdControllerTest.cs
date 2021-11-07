using back_end.Controllers;
using back_end.DI.Interfaces;
using back_end.Entities;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace back_end.xunit
{
    public class UserCurdControllerTest
    {
        [Fact]
        public void get_all_count_user_controller_test()
        {
            //items =2
            int count = 2;
            var dataStore = A.Fake<IUserCurdRepo<User>>();
            var dataRecived = A.CollectionOfDummy<User>(count);
            A.CallTo(() => dataStore.getAll()).Returns(dataRecived);

            var controller = new UserCurdController(dataStore);


            var actionResult = controller.getAll();

            //assert
            var result = actionResult.Result as OkObjectResult;

            var returnUsers = result.Value as IEnumerable<User>;

            Assert.NotNull(returnUsers);
        }
        [Fact]
        public void register_user_test_success()
        {
            User userInput = new User();
            userInput.Id = Guid.NewGuid();
            userInput.FirstName = "Tran Van";
            userInput.LastName = "Son";
            userInput.Username = "sontv";
            userInput.Password = "123456";

            var dataStore = A.Fake<IUserCurdRepo<User>>();

            var statusRegister = A.Dummy<User>();

            A.CallTo(() => dataStore.insert(userInput));

            var controller = new UserCurdController(dataStore);

            var actionResult = controller.register(userInput);

            //assert Result

            var statusCodeResult = actionResult as ObjectResult;

            var returnUsers = statusCodeResult.StatusCode;

            Assert.Equal(returnUsers,200);
        }
    }
}
