using IModelRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Models
{
    class UserTest:IUserTest
    {
        public int Id { get; set; }
        public string Title { get ; set ; }
        public int Status { get ; set ; }
        public string AdminNotes { get ; set ; }
        public ITestResult Result { get; set; }
    }
}
