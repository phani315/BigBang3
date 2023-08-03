namespace BookingService.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        public int TourId { get; set; }
        public int UserId { get; set; }
        public DateTime BookingDate { get; set; }
        public string? BookingStatus { get; set; }
        public ICollection<Passenger>? Passengers { get; set; }
    }
}
