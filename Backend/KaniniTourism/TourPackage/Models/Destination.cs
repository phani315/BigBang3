using System.ComponentModel.DataAnnotations;

public class Destination
{
    [Key]
    public int DestinationId { get; set; }

    [Required]
    public string? DestinationName { get; set; }

    [Required]
    public string? Country { get; set; }

    [Required]
    public string? City { get; set; }

    [Required]
    public string? SpotDescription { get; set; }

}
