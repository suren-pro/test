using DataAccessLayer.Models;
using IModelRepository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace DataAccessLayer
{
    public class UserContext:IUserContext
    {
        MySqlConnection connection;
        public UserContext(MySqlConnection connection)
        {
            this.connection = connection;
           
        }
        public int UserExists(string username, string password)
        {
            int id;
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "checkUser";
                cmd.Parameters.AddWithValue("login", username);
                cmd.Parameters.AddWithValue("pass", password);
                cmd.Parameters.Add("result", MySqlDbType.Int32).Direction = ParameterDirection.ReturnValue;
                cmd.ExecuteNonQuery();
                try
                {
                    id = (int)cmd.Parameters["result"].Value;
                }
                catch
                {
                    return -1;
                }
                    return id;
            }
        }
        public  IUser GetUser(int id)
        {
            User user = new User();
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandText = @"SELECT * FROM users
                                    INNER JOIN departments
                                    ON department = departments.id 
                                    WHERE users.id =@userId";
                cmd.Parameters.AddWithValue("@userId", id);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        user = new User
                        {
                            Id = (int)reader["id"],
                            FirstName = reader["firstname"].ToString(),
                            LastName = reader["lastname"].ToString(),
                            Login = new Login
                            {
                                Email = reader["email"].ToString(),

                            },
                            Phone = reader["phone"].ToString(),
                         
                            Role =  reader["role"].ToString(),
                        };
                    }
                }
                
            }
            return user;
        }
        public IEnumerable<IUser> GetUsers()
        {
            List<User> users = new List<User>();
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandText = @"SELECT * FROM users
                                    INNER JOIN departments
                                    ON department = departments.id
                                   ";
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        User user  = new User
                        {
                            Id = (int)reader["id"],
                            FirstName = reader["firstname"].ToString(),
                            LastName = reader["lastname"].ToString(),
                            Login = new Login
                            {
                                Email = reader["email"].ToString(),
                            },
                            Phone = reader["phone"].ToString(),
                            Role = reader["role"].ToString(),
                            
                        };
                        users.Add(user);
                    }
                }

            }
            return users;
        }
        public void AddUser(IUser user)
        {
            
           
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandText = @"INSERT INTO users (firstname,lastname,phone,email,password,role)
                                    VALUES(@firstname,@lastname,@phone,@email,@password,@role)";
                cmd.Parameters.AddWithValue("@firstname", user.FirstName);
                cmd.Parameters.AddWithValue("@lastname", user.LastName);
                cmd.Parameters.AddWithValue("@phone", user.Phone);
                cmd.Parameters.AddWithValue("@email", user.Login.Email);
                cmd.Parameters.AddWithValue("@role", user.Role);
                cmd.Parameters.AddWithValue("@password", user.Login.Password);
                cmd.ExecuteNonQuery();

            }
        }
        public void RemoveUser(int id)
        {

        }

      
    }
}
