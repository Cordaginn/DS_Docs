using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DSDoc3.BussinessObjects.ViewModels;
using DSDoc3.Core;
namespace DSDoc3.WebAPI.Controllers
{

    [Authorize(AuthenticationSchemes ="Bearer")]
    [Route("api/Version")]
    public class VersionController : DefaultController
    {
        private readonly VersionHelper _versionHelper;

        public VersionController(VersionHelper versionHelper)
        {
            _versionHelper = versionHelper;
        }
        [HttpGet]
        public AnswerModel GetVersion()
        {
            var result = _versionHelper.GetVersion();
            errorHandler.Handle(result);
            return errorHandler.GetAnswer();
        }
    }
}