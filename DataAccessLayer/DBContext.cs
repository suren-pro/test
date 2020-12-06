using DataAccessLayer.Models;
using IModelRepository;
using MySql.Data.MySqlClient;
using MySql.Data.MySqlClient.Memcached;
using Renci.SshNet.Security.Cryptography;
using System;

namespace DataAccessLayer
{
    public class DBContext : IDBContext
    {
        private MySqlConnection connection;
        public DBContext(string connectionString)
        {
            connection = new MySqlConnection(connectionString);
            connection.Open();
            
            SetupConnections();

        }
        public ITestContext TestContext { get; set; }
        public IUserContext UserContext { get; set; }
        public IQuestionContext QuestionContext { get; set; }

        public void Dispose()
        {
            connection.Close();
        }
        public void SetupConnections()
        {
            TestContext = new TestContext(connection);
            UserContext = new UserContext(connection);
            QuestionContext = new QuestionContext(connection);
        }
    }
}
