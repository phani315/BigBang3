using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TourPackage.Models;

public class TourActivities
{
    [Key]
    public int ActivityId { get; set; }

    [Required(ErrorMessage = "Tour ID is required.")]
    public int TourId { get; set; }
    [ForeignKey("TourId")]
    [JsonIgnore]
    public TourDetails TourDetails { get; set; }

    [Required(ErrorMessage = "Day number is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Day number must be a positive integer.")]
    public int DayNumber { get; set; }

    [Required(ErrorMessage = "Activity description is required.")]
    [StringLength(500, ErrorMessage = "Activity description cannot exceed 500 characters.")]
    public string ActivityDescription { get; set; }


}
