using IModelRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Models
{
    class Answer:IAnswer
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool  IsRight { get; set; }
    }
}
