import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './TourDetails.css';
import Navbar from '../Navbar/Navbar';


function TourDetails() {
  const { tourId } = useParams();
  const [tourDetails, setTourDetails] = useState(null);
  const [inclusionDetails, setInclusionDetails] = useState([]);
  const [exclusionDetails, setExclusionDetails] = useState([]);
  const [destinationDetails, setDestinationDetails] = useState([]);

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

  useEffect(() => {
    if (tourDetails) {
      fetchInclusionDetailsForDebug(tourDetails.tourInclusion);
      fetchExclusionDetailsForDebug(tourDetails.tourExclusion);

      // Fetch and update destination details
      const destinationPromises = tourDetails.tourDestination.map((destination) => {
        return fetchDestinationDetails(destination.destinationId);
      });

      Promise.all(destinationPromises)
        .then((destinationDataArray) => {
          // Update the tour destination details with the fetched destination names
          const updatedTourDestinations = destinationDataArray.map((destinationData, index) => {
            return {
              ...tourDetails.tourDestination[index],
              destinationName: destinationData.destinationName,
              country: destinationData.country,
              city: destinationData.city,
              spotDescription: destinationData.spotDescription,
            };
          });
          setTourDetails({
            ...tourDetails,
            tourDestination: updatedTourDestinations,
          });
        })
        .catch((error) => {
          console.error("Error fetching destination details:", error);
        });
    }
  }, [tourDetails]);
  

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchInclusionDetailsForDebug = (inclusions) => {
    const inclusionPromises = inclusions.map((inclusion) => {
      return fetchInclusionDetails(inclusion.inclusionId);
    });

    Promise.all(inclusionPromises)
      .then((inclusionDataArray) => {
        setInclusionDetails(inclusionDataArray);
      })
      .catch((error) => {
        console.error("Error fetching inclusion details:", error);
      });
  };

  const fetchExclusionDetailsForDebug = (exclusions) => {
    const exclusionPromises = exclusions.map((exclusion) => {
      return fetchExclusionDetails(exclusion.exclusionId);
    });

    Promise.all(exclusionPromises)
      .then((exclusionDataArray) => {
        setExclusionDetails(exclusionDataArray);
      })
      .catch((error) => {
        console.error("Error fetching exclusion details:", error);
      });
  };

  const fetchInclusionDetails = async (inclusionId) => {
    try {
      const response = await fetch(`http://localhost:5163/api/Inclusions/${inclusionId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch inclusion details");
      }
      const data = await response.json();
      return data.inclusionDescriptionn;
    } catch (error) {
      console.error("Error fetching inclusion details:", error);
      return "Error fetching inclusion details";
    }
  };

  const fetchExclusionDetails = async (exclusionId) => {
    try {
      const response = await fetch(`http://localhost:5163/api/Exclusions/${exclusionId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch exclusion details");
      }
      const data = await response.json();
      return data.exclusionDescription;
    } catch (error) {
      console.error("Error fetching exclusion details:", error);
      return "Error fetching exclusion details";
    }
  };
  const fetchDestinationDetails = async (destinationId) => {
    try {
      const response = await fetch(`http://localhost:5163/api/Destinations/${destinationId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch destination details");
      }
      const data = await response.json();
      return {
        destinationId,
        destinationName: data.destinationName,
        country: data.country,
        city: data.city,
        spotDescription: data.spotDescription,
      };
    } catch (error) {
      console.error("Error fetching destination details:", error);
      return {
        destinationId,
        destinationName: "Error fetching destination details",
        country: "Error",
        city: "Error",
        spotDescription: "Error",
      };
    }
  };
  

  return (
    <div className="tourdetailspage">
            <div className="tourdetails-flex-container">

      <div className="tourdetail-navbar">      <Navbar></Navbar>
</div>
      {tourDetails && (
        <div className="tour-flex">
          <div className="tourtitlebar">
            <div className="tour-header">
              <h1>{tourDetails.tourName}</h1>
              <div className="booknowbtn">
              <Link to={`/booking/${tourId}`} className="book-now-link">Book Now</Link>
              <p className="startingfrom">starting from <br/><p className="price">{tourDetails.tourPrice}</p></p></div>
            </div>
            <div >
              <nav style={{ position: "sticky", width: "70%", backgroundColor: "#fff" }}>
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
          </div>
          <section id="overview">
            <div className="tourdescription">
           <div> <img src={tourDetails.tourImage} alt="tourimage" /></div>
           <div> <p className="packageoverviewtext">Package Overview </p>{tourDetails.tourDescription}</div>
            </div>
          <div className="inclusions-exclusions">
            <div className="info-card">
              <h2>Inclusions</h2>
              <ul>
                {inclusionDetails.length > 0 ? (
                  inclusionDetails.map((inclusion, index) => (
                    <li key={index}>{inclusion}</li>
                  ))
                ) : (
                  <li>Loading inclusion details...</li>
                )}
              </ul>
            </div>
            <div className="info-card">
              <h2>Exclusions</h2>
              <ul>
                {exclusionDetails.length > 0 ? (
                  exclusionDetails.map((exclusion, index) => (
                    <li key={index}>{exclusion}</li>
                  ))
                ) : (
                  <li>Loading exclusion details...</li>
                )}
              </ul>
            </div>
          </div></section>
          <section id="itinerary">
  <h2>Day Wise Itinerary</h2>
  {tourDetails && tourDetails.tourDestination.length > 0 ? (
    tourDetails.tourDestination.map((destination, index) => (
      <div key={index} className="itinerary-day">
        <h3>Day {index + 1}</h3>
        <p>{destination.destinationName}</p>
        <p>{destination.country}</p>
        <p>{destination.city}</p>

        <p>{destination.spotDescription}</p>


        {/* Render more details about the destination here */}
      </div>
    ))
  ) : (
    <p>No itinerary details available.</p>
  )}
</section>

          <section id="additionalInfo">
            {/* Render additional info content */}
          </section>        </div>
      )}
    </div>
    </div>
  );
}

export default TourDetails;

