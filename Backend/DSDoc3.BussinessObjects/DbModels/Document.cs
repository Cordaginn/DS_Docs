using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
namespace DSDoc3.BussinessObjects.DbModels
{
    public class Document
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        public string Data { get; set; }
    }
}
