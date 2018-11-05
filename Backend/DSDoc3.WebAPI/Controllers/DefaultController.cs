using Microsoft.AspNetCore.Mvc;
using DSDoc3.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;

namespace DSDoc3.WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/")]
    public class DefaultController : Controller
    {
        
        protected readonly ErrorHandler errorHandler;
        public DefaultController()
        {
            errorHandler = new ErrorHandler();
        }
        
        
    }
}