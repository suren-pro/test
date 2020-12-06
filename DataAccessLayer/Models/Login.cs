using IModelRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Models
{
   public class Login:ILogin
    {
        string password;
        public string Email { get; set; }
        public string Password
        {
            get { return password; }
            set { password = PasswordConverter.GetHashedValue(value); }
        }
    }
}
