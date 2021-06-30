using AngularCRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularCRUD.Controllers
{
    public class StudentController : Controller
    {
        SchoolDBEntities db = new SchoolDBEntities();

        // GET: Student
        public ActionResult Index()
        {
            return View();
        }

        //Get the details of a particular student  
        public JsonResult Get_AllStudent()
        {

            using (SchoolDBEntities db = new SchoolDBEntities())
            {
                var Students = (from student in db.Students
                                join standard in db.Standards
                                on student.standardID equals standard.standardID
                                select new
                                {
                                    student.studentID,
                                    student.firstName,
                                    student.lastName,
                                    student.dateOfbirth,
                                    student.standardID,
                                    standardName = standard.standardName
                                }).ToList();

                return Json(Students, JsonRequestBehavior.AllowGet);
            }
        }

        //Get Student with Id  
        public JsonResult Get_StudentById(string Id)
        {
            using (SchoolDBEntities db = new SchoolDBEntities())
            {
                int studID = int.Parse(Id);

                return Json(db.Students.Find(studID), JsonRequestBehavior.AllowGet);
            }
        }

        //To Insert new student record  
        public string Insert_Student(Student student)
        {
            if (student != null)
            {
                using (SchoolDBEntities db = new SchoolDBEntities())
                {
                    db.Students.Add(student);
                    db.SaveChanges();

                    return "Student Added Successfully";
                }
            }
            else
            {
                return "Student Not Inserted! Try Again";
            }
        }

        //To Delete the record of a particular student 
        public string Delete_Student(Student student)
        {
            if (student != null)
            {
                using (SchoolDBEntities db = new SchoolDBEntities())
                {
                    var stud = db.Entry(student);

                    if (stud.State == System.Data.Entity.EntityState.Detached)
                    {
                        db.Students.Attach(student);
                        db.Students.Remove(student);
                    }
                    db.SaveChanges();

                    return "Student Deleted Successfully";
                }
            }
            else
            {
                return "Student Not Deleted! Try Again";
            }
        }

        //To Update the records of a particluar student  
        public string Update_Student(Student student)
        {
            if (student != null)
            {
                using (SchoolDBEntities db = new SchoolDBEntities())
                {

                    var stud = db.Entry(student);

                    Student students = db.Students.Where(x => x.studentID == student.studentID).FirstOrDefault();

                    students.firstName = student.firstName;
                    students.lastName = student.lastName;
                    students.dateOfbirth = student.dateOfbirth;
                    students.standardID = student.standardID;

                    db.SaveChanges();

                    return "Student Updated Successfully";
                }

            }
            else
            {
                return "Student Not Updated! Try Again";
            }
        }

        //To Get the list of Standards
        [HttpGet]
        public JsonResult GetStandardList()
        {

            var standardList = db.Standards.Select(x => new { x.standardID, x.standardName }).ToList();

            return Json(standardList, JsonRequestBehavior.AllowGet);

        }
    }
}