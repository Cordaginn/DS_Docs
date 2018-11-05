using DSDoc3.BussinessObjects.Identity;
using DSDoc3.BussinessObjects.ViewModels;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace DSDoc3.Core
{
    public class ErrorHandler
    {
        private AnswerModel answer;
        public ErrorHandler()
        {
        }
        public void Handle (IdentityResult error)
        {
            if (error.ToString() != "Succeeded")
            {
                answer = new AnswerModel(400, null, error.ToString());
            }
            else
            {
                answer = new AnswerModel(200, null, "Succeeded");
            }
        }
        public void Handle(SignInResult result)
        {
           if(!result.Succeeded)
            {
                answer = new AnswerModel(400, null, "Invalid Username or Password");
            }
           else
            {
                answer = new AnswerModel(200, null, "Succeeded");
            }
        }
        public void Handle(ClaimsIdentity result)
        {
            if (result == null)
            {
                answer = new AnswerModel(400, null, "Invalid Username or Password");
            }
            else
            {
                answer = new AnswerModel(200, null, "Succeeded");
            }
        }
        public void Handle(User result)
        {
            if (result == null)
            {
                answer = new AnswerModel(400, null, "This user doesn't have yet");
            }
            else
            {
                answer = new AnswerModel(200, null, "Succeeded");
            }
        }
        public void Handle(object result)
        {
            answer = new AnswerModel(200, result, "That is token");
        }
        public void Handle(VersionModel result)
        {
            answer = new AnswerModel(200, result, "Succeeded");
        }
        public AnswerModel GetAnswer()
        {
            return answer;
        }
    }
}
