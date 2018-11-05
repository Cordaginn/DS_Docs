using System.ComponentModel.DataAnnotations;

namespace DSDoc3.BussinessObjects.DbModels
{
    public class UserDocuments
    {
        [Key]
        public int UserId { get; set; }
        public int DocumentId { get; set; }
        public int Permission { get; set; }
    }
}
