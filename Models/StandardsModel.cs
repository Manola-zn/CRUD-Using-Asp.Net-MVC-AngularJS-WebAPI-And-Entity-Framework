using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularCRUD.Models
{
    public class StandardsModel
    {
        public int standardID { get; set; }
        public string standardName { get; set; }
        public string description { get; set; }

        public virtual ICollection<StudentsModel> Students { get; set; }
    }
}