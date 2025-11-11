using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apixh.Models
{
    public class AdmissionStats
    {
        [Key]
        public string StatCode { get; set; } = Guid.NewGuid().ToString();

        [ForeignKey("Major")]
        public string MajorCode { get; set; } = string.Empty;
        public Major? Major { get; set; }

        public int Year { get; set; }
        public int Quota { get; set; } // Chỉ tiêu tuyển sinh
    }
}
