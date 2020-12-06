using System;

namespace IModelRepository
{
    public interface IDBContext:IDisposable
    {
        ITestContext  TestContext { get; set; }
        IUserContext UserContext { get; set; }
        IQuestionContext QuestionContext { get; set; }
    }
}
