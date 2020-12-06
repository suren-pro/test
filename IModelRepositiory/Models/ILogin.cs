using System;
using System.Collections.Generic;
using System.Text;

namespace IModelRepository
{
    public interface ILogin
    {
        string Email { get; set; }
        string Password { get; set; }
    }
}
