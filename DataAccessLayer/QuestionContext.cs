using DataAccessLayer.Models;
using IModelRepository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;

namespace DataAccessLayer
{
    class QuestionContext : IQuestionContext
    {
        MySqlConnection connection;
        public QuestionContext(MySqlConnection connection)
        {
            this.connection = connection;
        }
        public void AddQuestion(IQuestion question)
        {
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandText = @"INSERT INTO questions (title,question_type)
                                VALUES(@title,@question_type)";
                cmd.Parameters.AddWithValue("@title",question.QuestionTitle);
                cmd.Parameters.AddWithValue("@question_type", question.QuestionType);
                cmd.ExecuteNonQuery();
            }
            question.Id = GetLastQuestionId();
            List<Answer> answers = new List<Answer>();
            foreach (var item in question.Answers)
            {
                answers.Add(new Answer { Title = item });
            }
            SetRightAnswers(answers, question.RightAnswers);
            using (MySqlCommand cmd = new MySqlCommand())
            {
                
                cmd.Connection = connection;
                cmd.Parameters.Add("@title",MySqlDbType.VarChar);
                cmd.Parameters.Add("@is_right",MySqlDbType.Bit);
                foreach (Answer answer in answers)
                {
                    cmd.CommandText = @"INSERT INTO answers (title,is_right)
                                        VALUES(@title,@is_right)";
                    cmd.Parameters["@title"].Value = answer.Title;
                    cmd.Parameters["@is_right"].Value = answer.IsRight;
                    cmd.ExecuteNonQuery();
                    answer.Id = GetLastAnswerId();
                    
                }

            }
            using (MySqlCommand cmd = new MySqlCommand())
            {

                cmd.Connection = connection;
                cmd.Parameters.AddWithValue("@question_department_question", question.Id);
                cmd.Parameters.Add("@question_department", MySqlDbType.Int32);
                foreach (int department in question.Departments)
                {
                    cmd.CommandText = @"INSERT INTO question_departments (question_department_question, question_department)
                                        VALUES(@question_department_question,@question_department)";
                    cmd.Parameters["@question_department"].Value = department;
                    cmd.ExecuteNonQuery();
                    
                }

            }
            
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.Parameters.Add("@qId", MySqlDbType.Int32);
                cmd.Parameters.Add("@answer",MySqlDbType.Int32);
                foreach (var answer in answers)
                {
                  cmd.CommandText = @"INSERT INTO question_answers (question,answer) 
                                        VALUES(@qId,@answer)";
                    cmd.Parameters["@qId"].Value = question.Id;
                    cmd.Parameters["@answer"].Value = answer.Id;
                    cmd.ExecuteNonQuery();

                }
            }
        }
        private void SetRightAnswers(List<Answer> answers,List<int> rightAnswers)
        {
            foreach (int index in rightAnswers)
            {
                answers[index].IsRight = true;

            }
        }
        private int GetLastQuestionId()
        {
            using (MySqlCommand cmd = new MySqlCommand())
            {
                int id = 0;
                cmd.Connection = connection;
                cmd.CommandText = @"SELECT id FROM questions
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
        private int GetLastAnswerId()
        {
            using (MySqlCommand cmd = new MySqlCommand())
            {
                int id = 0;
                cmd.Connection = connection;
                cmd.CommandText = @"SELECT id FROM answers
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

        public void RemoveQuestion(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateQuestion(IQuestion question)
        {
            throw new NotImplementedException();
        }

        public IQuestion GetQuestion(int id)
        {
            Question question = new Question();
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandText = @"SELECT * FROM questions WHERE id = @id";
                cmd.Parameters.AddWithValue("@id", id);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        question.Id = (int)reader["id"];
                        question.QuestionTitle = reader["title"].ToString();
                        question.QuestionType = (int)reader["question_type"];

                    }
                }
            }
           
            question.Answers = new List<string>();
            using (MySqlCommand cmd =  new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandText = @"SELECT answers.* FROM question_answers
                                    INNER JOIN answers
                                    ON answer = answers.id
                                    WHERE question = @question";
                cmd.Parameters.AddWithValue("@question", question.Id);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        string answer = reader["title"].ToString();
                        question.Answers.Add(answer);
                    }
                }
                
            }
            return question;
        }
        public void GetQuestions(ITest test)
        {
            List<int> indexes =new List<int>();
            using (MySqlCommand cmd = new MySqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandText = @"SELECT * FROM test_questions 
                                    WHERE test = @id";
                cmd.Parameters.AddWithValue("@id", test.Id);
                using(MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int questionId = (int)reader["test_question"];
                        indexes.Add(questionId);
                    }
                }
                test.Questions = new List<IQuestion>();
                foreach (var index in indexes)
                {
                    IQuestion question = GetQuestion(index);
                    test.Questions.Add(question);
                }
            }
        }
    }
}
