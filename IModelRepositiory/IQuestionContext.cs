using System;
using System.Collections.Generic;
using System.Text;

namespace IModelRepository
{
   public interface IQuestionContext
    {
        void AddQuestion(IQuestion question);
        IQuestion GetQuestion(int id);
        void RemoveQuestion(int id);
        void GetQuestions(ITest test);
        void UpdateQuestion(IQuestion question);
    }
}
