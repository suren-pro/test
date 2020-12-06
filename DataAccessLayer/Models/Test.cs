using IModelRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Models
{
    public class Test:ITest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Timer { get; set; }
        public IEnumerable<IQuestion> Questions { get; set; }
        public DateTime Date { get; set; }
        public string Deadline { get; set; }
        public int RequiredGrade { get; set; }
        public int CheckingType { get; set; }
        public string Result { get; set; }
        public int Status { get; set; }
        public int[] LeftTryes { get; set; }
        public int[] Tryes { get; set; }
        
    }
}
