using AngularCRUD.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularCRUD.Controllers.api
{
    public class StudentController : ApiController
    {
        private SchoolDBEntities db = new SchoolDBEntities();

        //Returns all student details with standards.
        public IHttpActionResult GetAllStudents()
        {
            IList<StudentsModel> students = null;

            using (var db = new SchoolDBEntities())
            {
                students = db.Students.Include("Students")
                            .Select(s => new StudentsModel()
                            {
                                studentID = s.studentID,
                                firstName = s.firstName,
                                lastName = s.lastName,
                                gender = s.gender,
                                dateOfbirth = s.dateOfbirth,
                                Standard = s.Standard == null ? null : new StandardsModel()
                                {
                                    standardID = s.standardID,
                                    standardName = s.Standard.standardName
                                }
                            }).ToList<StudentsModel>();
            }

            if (students.Count == 0)
            {
                return NotFound();
            }

            return Ok(students);
        }

        //Returns student details with specified id
        public IHttpActionResult GetStudentById(int id)
        {
            StudentsModel students = null;

            using (var db = new SchoolDBEntities())
            {
                students = db.Students.Include("Students").Where(s => s.studentID == id).Select(s => new StudentsModel()
                {
                    studentID = s.studentID,
                    firstName = s.firstName,
                    lastName = s.lastName,
                    gender = s.gender,
                    dateOfbirth = s.dateOfbirth,
                    Standard = s.Standard == null ? null : new StandardsModel()
                    {
                        standardID = s.standardID,
                        standardName = s.Standard.standardName
                    }
                }).FirstOrDefault<StudentsModel>();
            }

            if (students == null)
            {
                return NotFound();
            }

            return Ok(students);
        }

        //Returns all students whose name is john.
        public IHttpActionResult GetAllStudents(string name)
        {
            IList<StudentsModel> students = null;

            using (var db = new SchoolDBEntities())
            {
                students = db.Students.Include("Students").Where(s => s.firstName.ToLower() == name.ToLower()).Select(s => new StudentsModel()
                {
                    studentID = s.studentID,
                    firstName = s.firstName,
                    lastName = s.lastName,
                    gender = s.gender,
                    dateOfbirth = s.dateOfbirth,
                    Standard = s.Standard == null ? null : new StandardsModel()
                    {
                        standardID = Convert.ToInt32(s.standardID),
                        standardName = s.Standard.standardName
                    }
                }).ToList<StudentsModel>();
            }

            if (students.Count == 0)
            {
                return NotFound();
            }

            return Ok(students);
        }

        //Create a new student record 
        public IHttpActionResult PostNewStudent(StudentsModel students)
        {

            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (var db = new SchoolDBEntities())
            {
                db.Students.Add(new Student()
                {

                    studentID = students.studentID,
                    firstName = students.firstName,
                    lastName = students.lastName,
                    gender = students.gender,
                    dateOfbirth = students.dateOfbirth,
                    standardID = students.standardID,

                });

                db.SaveChanges();
            }


            return Ok();
        }

        //Update an existing student record
        public IHttpActionResult Put(StudentsModel students)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var db = new SchoolDBEntities())
            {
                var existingStudent = db.Students.Where(s => s.studentID == students.studentID).FirstOrDefault<Student>();

                if (existingStudent != null)
                {
                    existingStudent.firstName = students.firstName;
                    existingStudent.lastName = students.lastName;
                    existingStudent.gender = students.gender;
                    existingStudent.dateOfbirth = students.dateOfbirth;
                    existingStudent.standardID = students.Standard.standardID;

                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        //Delete an existing student record
        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid student id");

            using (var db = new SchoolDBEntities())
            {
                var student = db.Students.Where(s => s.studentID == id).FirstOrDefault();

                db.Entry(student).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
            }

            return Ok();
        }

    }
}


