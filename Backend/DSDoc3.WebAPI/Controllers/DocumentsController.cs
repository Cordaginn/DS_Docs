using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DSDoc3.DataAccess;
using DSDoc3.BussinessObjects.DbModels;
using System.Threading.Tasks;

namespace DSDoc3.WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/Documents")]
    public class DocumentsController : DefaultController
    {
        AppDbContext appDb;
       public DocumentsController(AppDbContext context)
        {
            appDb = context;
        }
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("Save")]
        public async Task SaveDocument([FromBody]Document document)
        {
            if (ModelState.IsValid && document != null)
            {
                appDb.Documents.Add(document);
                await appDb.SaveChangesAsync();
            }
        }
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("Open")]
        public object OpenDocument()
        {
            if (ModelState.IsValid)
            {
                return appDb.Documents;
            }
            return errorHandler.GetAnswer();
        }
        [Authorize(AuthenticationSchemes="Bearer")]
        [HttpPost("Delete")]
        public async Task<object> DeleteDocument([FromBody]int index)
        {
            appDb.Remove(appDb.Documents.Find(index));
            await appDb.SaveChangesAsync();
            return appDb.Documents;
        }
        [Authorize(AuthenticationSchemes="Bearer")]
        [HttpPost("Update")]
        public async Task UpdateDocument([FromBody]Document document)
        {
            if(ModelState.IsValid && document != null)
            {
                appDb.Documents.Update(document);
                await appDb.SaveChangesAsync();
            }
        }
}
}