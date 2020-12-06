using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Models
{
    class TestQuestion
    {
        public int Id { get; set; }
        public Test Test { get; set; }
        public Question Question { get; set; }
    }
}
