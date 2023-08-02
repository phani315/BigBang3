using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TourPackage.Models;

public class TourDate
{
    [Key]
    public int DateId { get; set; }

    [Required]
    public int TourId { get; set; }
    [ForeignKey("TourId")]
    [JsonIgnore]
    public TourDetails? Tour { get; set; }

    [Required]
    public DateTime DepartureDate { get; set; }

    [Required]
    public DateTime ReturnDate { get; set; }


    }

