
namespace DSDoc3.BussinessObjects.ViewModels
{
    public class AnswerModel
    {
        public int StatusCode { get; }
        public object Payload { get; } 
        public string userMessage;
        public string systemMessage;
        public AnswerModel(int status,object payload,string _userMessage=null,string _systemMessage=null)
        {
            userMessage = _userMessage;
            systemMessage = _systemMessage;
            StatusCode = status;
            Payload = payload;
        }
    }
}
