using System;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using DSDoc3.BussinessObjects.Identity;
using DSDoc3.BussinessObjects.ViewModels;
using DSDoc3.DataAccess;
using Microsoft.AspNetCore.Authorization;

namespace DSDoc3.WebAPI.Controllers
{
    [Route("api/Account")]
    public class AccountController : DefaultController
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _userManager.Options.Password.RequireDigit = false;
            _userManager.Options.Password.RequireLowercase = false;
            _userManager.Options.Password.RequireUppercase = false;
            _userManager.Options.Password.RequireNonAlphanumeric = false;
            _signInManager.Options.Password.RequireDigit = false;
            _signInManager.Options.Password.RequireLowercase = false;
            _signInManager.Options.Password.RequireUppercase = false;
            _signInManager.Options.Password.RequireNonAlphanumeric = false;
        }
        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<AnswerModel> RegisterAsync([FromBody] RegistrationModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new User { UserName = model.Login };
                var result = await _userManager.CreateAsync(user, model.Password);
                LoginModel loginModel = new LoginModel()
                {
                    Login = model.Login,
                    Password = model.Password
                };
                errorHandler.Handle(result);
                return errorHandler.GetAnswer();
                
            }
            return errorHandler.GetAnswer();
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<AnswerModel> Login([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.Login);
                if (user != null)
                {
                    //var result = await _userManager.CheckPasswordAsync(user, model.Password);
                    var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
                    errorHandler.Handle(result);
                    if (errorHandler.GetAnswer().StatusCode == 200)
                    {
                        var response = new
                        {
                            access_token = GetToken(model.Login),
                            UserId = user.Id,
                        };
                        if(response.access_token==null || errorHandler.GetAnswer().StatusCode!=200)
                        {
                            return errorHandler.GetAnswer();
                        }
                        else
                        {
                            errorHandler.Handle(response);
                            errorHandler.GetAnswer();
                        }
                    }
                }
                else
                {
                    errorHandler.Handle(user);
                    return errorHandler.GetAnswer();
                }
            }

            return errorHandler.GetAnswer();
        }
        private string GetToken(string username)
        {
            var identity = GetIdentity(username);
            errorHandler.Handle(identity);
            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            if(errorHandler.GetAnswer().StatusCode==200)
            {
                return encodedJwt;
            }
            else
            {
                return null;
            }
            // сериализация ответа
            //Response.ContentType = "application/json";
            //await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));

        }
        private ClaimsIdentity GetIdentity(string username)
        {
            User person = _userManager.FindByNameAsync(username).Result;
            if (person != null)
            {
                var claims = new List<System.Security.Claims.Claim>
                {
                    new System.Security.Claims.Claim(ClaimsIdentity.DefaultNameClaimType, person.UserName)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }


    }
}