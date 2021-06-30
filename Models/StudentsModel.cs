using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AngularCRUD.Models
{
    public class StudentsModel
    {

        public int studentID { get; set; }
        [Required(ErrorMessage = "This field is required")]
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string gender { get; set; }
        public string dateOfbirth { get; set; }
        public int standardID { get; set; }

        public StandardsModel Standard { get; set; }
       
    }
}