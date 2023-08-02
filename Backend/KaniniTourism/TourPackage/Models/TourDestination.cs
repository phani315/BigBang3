using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TourPackage.Models;

public class TourDestination
{
    public int Id { get; set; }

    public int TourId { get; set; }
    [ForeignKey("TourId")]
    [JsonIgnore]
    public TourDetails? Tour { get; set; }

    public int DestinationId { get; set; }
    [ForeignKey("DestinationId")]
    [JsonIgnore]
    public Destination? Destination { get; set; }

    public string? Destinationimage { get; set; }

}
