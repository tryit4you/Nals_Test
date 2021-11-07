using back_end.DI.Interfaces;
using back_end.DI.Services;
using back_end.Entities;
using back_end.MiddleWare;
using back_end.Models;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace back_end.test.RepositoryTest
{
    [TestClass]
    public class UserRepositoryTest
    {
        private Mock<IUserRepository> _mockRepository;
        private Mock<IUserCurdRepo<User>> _mockCurdRepository;
        private Mock<IOptions<AppSettings>> _mockOptionsRepository;

        private UserService _userService;
        private SecureModel secureModel;
        private AuthRequest authRequest;
        [TestInitialize]
        public void Initialize()
        {
            _mockRepository = new Mock<IUserRepository>();
            _userService = new UserService(_mockOptionsRepository.Object, _mockCurdRepository.Object);
            authRequest = new AuthRequest()
            {
                Username = "hungvv",
                Password = "hungvv123"
            };
        }
        [TestMethod]
        public void user_service_auth()
        {
            _mockRepository.Setup(m => m.auth(authRequest)).Returns((SecureModel x)=> {
                x.user.Username = authRequest.Username;
                return x;
            });

            var result = _userService.auth(authRequest) as SecureModel;


            Assert.IsNotNull(result);

        }
    }
}
