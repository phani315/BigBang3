using System.ComponentModel.DataAnnotations;

namespace TourPackage.Models
{
    public class Inclusions
    {

        [Key]
        public int InclusionId { get; set; }
        [Required]
        public string? InclusionDescriptionn { get; set; }
    }
}
