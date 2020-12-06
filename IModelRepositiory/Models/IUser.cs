using System;
using System.Collections.Generic;
using System.Text;

namespace IModelRepository.Models
{
    public interface IUser
    {
        int Id { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string Phone { get; set; }
         string Position { get; set; }
        IDepartment Department { get; set; }
        ILogin Login { get; set; }
        IEnumerable<IUserTest> Tests { get; set; }
        string Role { get; set; }
    }
}
