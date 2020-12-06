using IModelRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Models
{
    public class Question:IQuestion
    {
        public int Id { get; set; }
        public string QuestionTitle { get; set; }
        public List<string> Answers { get; set; }
        public List<int> RightAnswers { get; set; }
        public List<int> UserAnswers { get; set; }
        public int UserAnswerStatus { get; set; }
        public string AdminNotes { get; set; }

    }
}
