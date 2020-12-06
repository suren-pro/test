using IModelRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Models
{
    public class TestResult:ITestResult
    {
        public int TestId { get; set; }
        public List<IQuestion> Questions { get; set; }
    }
}
