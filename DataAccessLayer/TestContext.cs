using DataAccessLayer.Enums;
using DataAccessLayer.Models;
using IModelRepository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccessLayer
{
    public class TestContext:ITestContext
    {
        private MySqlConnection connection;
        public TestContext(MySqlConnection connection)
        {
            this.connection = connection;
        }



        public ITest GetTest(int id)
        {
            Test test = new Test();
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandText = @"SELECT * FROM tests WHERE id =@id";

                cmd.Parameters.AddWithValue("@id", id);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        test = new Test
                        {
                            Id = id,
                            Title = reader["title"].ToString(),
                            Description = reader["description"].ToString(),
                            TestType = (int)reader["type"]
                        };
                    }
                }
                return test;
            }
        }
        public IEnumerable<Test> GetTestsProfile(int id)
        {
            List<UserTest> tests = new List<UserTest>();
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandText = @"SELECT distinctrow tests.* FROM tests
                                     INNER JOIN test_departments
                                    ON  tests.id = test_department_test
                                    INNER JOIN user_tests
                                    ON test_department_test = test_id
                                    WHERE 
                                     user_id = @userId
                                    AND  NOT test_finished
                                ";
                cmd.Parameters.AddWithValue("@userId", id);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        UserTest test = new UserTest
                        {
                            Id = (int)reader["id"],
                            Title = reader["title"].ToString(),
                            Status = (int)ResultStatus.WaitingToBePassed,
                        };
                        tests.Add(test);
                    }
                }
            }
            return tests;
        }

        public void CheckTest(ITestResult test)
        {
            foreach (Question question in test.Questions)
            {
                using (MySqlCommand cmd = new MySqlCommand())
                {
                    cmd.Connection = connection;
                    List<Answer> answers = new List<Answer>();
                    cmd.CommandText = @"SELECT answers.* FROM answers
                                        INNER JOIN question_answers
                                        ON answer = answers.id
                                        WHERE question= @q;";
                    cmd.Parameters.AddWithValue("@q", question.Id);
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Answer answer = new Answer
                            {
                                Title = reader["title"].ToString(),
                                Id = (int)reader["id"],
                                IsRight = Convert.ToBoolean((sbyte)reader["is_right"])
                            };
                            answers.Add(answer);
                            
                        }
                       
                    }
                    int c = 0;
                    foreach (Answer answer in answers )
                    {
                        if (answer.IsRight)
                        {
                            question.RightAnswers.Add(c);
                        }
                        c++;
                    }
                    int rightAnswerCount = 0;
                    for (int i = 0; i < question.UserAnswers.Count; i++)
                    {
                        if (question.UserAnswers[i] == question.RightAnswers[i])
                        {
                            rightAnswerCount++;
                           
                        }
                        
                    }
                    if (rightAnswerCount == question.RightAnswers.Count)
                    {
                        question.UserAnswerStatus = 1;
                    }
                   
                   
                }
                using (MySqlCommand cmd = new MySqlCommand())
                {
                    cmd.Connection = connection;
                    foreach ( int item in question.UserAnswers)
                    {
                           
                    }
                    cmd.CommandText = @"INSERT INTO user_test_answers (user_answer,answer,question,user_test)
                                        VALUES()";

                }

            }
        }
        public void AddTest(ITest test)
        {
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandText = @"INSERT INTO tests (title,description,type)
                                    VALUES(@title,@description,@type)";
                cmd.Parameters.AddWithValue("@title", test.Title);
                cmd.Parameters.AddWithValue("@description", test.Description);
                cmd.Parameters.AddWithValue("@type", test.TestType);
                cmd.ExecuteNonQuery();
            }
            test.Id = GetLastTestId();
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.Parameters.AddWithValue("@test", test.Id);
                cmd.Parameters.Add("@department", MySqlDbType.Int32);
                foreach (int item in test.Departments)
                {
                    cmd.CommandText = @"INSERT INTO test_departments (test_department_test,test_department_department)
                                  VALUES(@test,@department)";
                    cmd.Parameters["@department"].Value = item;
                    cmd.ExecuteNonQuery();

                }
            }
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.Parameters.AddWithValue("@test", test.Id);
                cmd.Parameters.Add("@question", MySqlDbType.Int32);
                foreach (Question item in test.Questions)
                {
                    cmd.CommandText = @"INSERT INTO test_questions (test,test_question)
                                  VALUES(@test,@question)";
                    cmd.Parameters["@question"].Value = item.Id;
                    cmd.ExecuteNonQuery();

                }

            }
        }
        private int GetLastTestId()
        {
            using (MySqlCommand cmd = new MySqlCommand())
            {
                int id = 0;
                cmd.Connection = connection;
                cmd.CommandText = @"SELECT id FROM tests
                                     ORDER BY id  desc
                                     LIMIT 1";
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        id = (int)reader["id"];
                    }
                }
                return id;
            }
        }
    }
}
