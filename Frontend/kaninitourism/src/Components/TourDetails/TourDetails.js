import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './TourDetails.css';

function TourDetails() {
  const { tourId } = useParams();
  const [tourDetails, setTourDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5163/api/TourDetails/${tourId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tour details");
        }
        const data = await response.json();
        setTourDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching tour details:", error);
      });
  }, [tourId]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="tourdetailspage">
      {tourDetails && (
        <div>
          <div className="tour-header">
            <h1>{tourDetails.tourName}</h1>
            <div>
            <Link to={`/booking/${tourId}`} className="book-now-link">Book Now</Link>
            <p>starting from <br/>{tourDetails.tourPrice}</p></div>
          </div>
          <div>
            <nav style={{ position: "fixed", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
              <ul style={{ display: "flex", justifyContent: "space-around", listStyle: "none" }}>
                <li>
                  <button className="navbtns" onClick={() => scrollToSection("overview")}>Overview</button>
                </li>
                <li>
                  <button className="navbtns" onClick={() => scrollToSection("itinerary")}>Day Wise Itinerary</button>
                </li>
                <li>
                  <button className="navbtns" onClick={() => scrollToSection("additionalInfo")}>Additional Info</button>
                </li>
              </ul>
            </nav>
          </div>
          <section id="overview">
            <div>
              {/* Render overview content */}
            </div>
            <img src={tourDetails.image} alt={tourDetails.name} />
          </section>

          <section id="itinerary">
            {/* Render itinerary content */}
          </section>

          <section id="additionalInfo">
            {/* Render additional info content */}
          </section>
        </div>
      )}
    </div>
  );
}

export default TourDetails;
