using System;
using System.Collections.Generic;
using System.Text;

namespace IModelRepository
{
   public interface IQuestion
    {
        int Id { get; set; }
        string QuestionTitle { get; set; }
        List<string> Answers { get; set; }
        List<int>  RightAnswers { get; set; }
        List<int> UserAnswers { get; set; }
        List<int> Departments { get; set; }
        int QuestionType { get; set; }
        int UserAnswerStatus { get; set; }
    }
}
