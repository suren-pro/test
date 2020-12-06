using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace DataAccessLayer
{
    class PasswordConverter
    {
        public static string GetHashedValue(string password)
        {
            if (password == null)
                return password;

            string result;
            using (SHA512 shaM = new SHA512Managed())
            {
                result = Convert.ToBase64String(shaM.ComputeHash(Encoding.UTF8.GetBytes(password)));
            }

            return result;
        }
    }
}
