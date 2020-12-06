using IModelRepository;
using IModelRepository.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Models
{
    public class User:IUser
    {
      
        
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; }
        public ILogin Login { get; set; }
        public string ProfilePic { get; set; }
        public  IEnumerable<Test> Tests { get; set; }
        
    }
}
