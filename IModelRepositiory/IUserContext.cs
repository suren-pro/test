using IModelRepository.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IModelRepository
{
    public interface IUserContext
    {
       int UserExists(string login, string password);
        IUser GetUser(int id);
        IEnumerable<IUser> GetUsers();
        void AddUser(IUser user);
        void RemoveUser(int id);

    }
}
