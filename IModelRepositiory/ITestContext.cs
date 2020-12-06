using System;
using System.Collections.Generic;
using System.Text;

namespace IModelRepository
{
   public interface ITestContext
    {
        ITest GetTest(int id);
        IEnumerable<IUserTest> GetTestsProfile(int id);
        void CheckTest(ITestResult test);
        void AddTest(ITest test);


    }
}
