using System;
using System.Collections.Generic;
using System.Text;

namespace IModelRepository
{
   public interface ITest
    {
        int Id { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        IEnumerable<IQuestion> Questions { get; set; }
        int TestType { get; set; }

        
    }
}
