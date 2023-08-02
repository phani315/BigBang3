using System.ComponentModel.DataAnnotations;

namespace TourPackage.Models
{
    public class Exclusions
    {
        [Key]
        public  int ExclusionId { get; set; }
        [Required]
        public string? ExclusionDescriptionn { get; set; }
    }
}
