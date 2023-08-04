import React, { useState, useEffect } from "react";
import "./TourPackages.css";
import Select from "react-select";
import Navbar from "../Navbar/Navbar";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";

function TourPackages() {
  const [Destinations, setDestinations] = useState([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [resultTourPackage, setResultTourPackage] = useState([]);
  const sortByPrice = () => {
    const sortedPackages = [...resultTourPackage];
    sortedPackages.sort((a, b) => a.tourPrice - b.tourPrice);
    setResultTourPackage(sortedPackages);
  };
  const sortByDuration = () => {
    const sortedPackages = [...resultTourPackage];
    sortedPackages.sort((a, b) => a.noofdays - b.noofdays);
    setResultTourPackage(sortedPackages);
  };
  useEffect(() => {
    fetch("http://localhost:5163/api/Destinations", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }
        const data = await response.json();
        setDestinations(data);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
      });
  }, []);

  const destinationOptions = Destinations.map((destination) => ({
    value: destination.destinationId,
    label: destination.destinationName,
  }));

  useEffect(() => {
    console.log("Updated resultTourPackage:", resultTourPackage);
  }, [resultTourPackage]);

  const handleSearchHolidays = () => {
    if (selectedDestinationId) {
      fetch(`http://localhost:5163/api/TourDetails?destinationId=${selectedDestinationId}`, {
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
          // Filter the tour packages based on the selectedDestinationId
          const filteredTourPackages = data.filter((tourPackage) =>
            tourPackage.tourDestination.some(
              (destination) => destination.destinationId === selectedDestinationId
            )
          );
          setResultTourPackage(filteredTourPackages);
        })
        .catch((error) => {
          console.error("Error fetching tour details:", error);
        });
    } else {
      console.log("No destination selected.");
    }
  };

  return (
    <div className="tourpackagesearch">
      <div>
        <Navbar></Navbar>
      </div>
      <div className="container">
        <div className="destinations-container">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Book Domestic and International Holidays</h5>
              <Select
                className="search"
                placeholder="Select a peer to compare"
                options={destinationOptions}
                value={destinationOptions.find((option) => option.value === selectedDestinationId)}
                onChange={(selectedOption) => setSelectedDestinationId(selectedOption.value)}
                isSearchable={true}
                autosize={true}
                menuPortalTarget={document.body} // Render the dropdown outside the component's container
              />
              <button onClick={handleSearchHolidays} className="btn btn-primary mt-2">
                Search Holidays
              </button>
            </div>
          </div>
        </div>
        <div className="tour-packages">
        <div className="sort-header">
            <button  onClick={sortByPrice}>
              Sort by Price
            </button>
            <button onClick={sortByDuration} >
              Sort by Duration
            </button>
          </div>

    
          {resultTourPackage.length === 0 ? (
            <p>No tour packages found.</p>
          ) : (
            resultTourPackage.map((tourPackage) => (
              <div key={tourPackage.id}>
                <div className="card mb-3">
                  <div className="row g-0">
                    {/* First Column: Image */}
                    <div className="col-md-4">
                      <img src={tourPackage.tourDescription}  className="img-fluid rounded-start" alt="..." />
                    </div>
                    {/* Second Column: Text */}
                    <div className="col-md-4">
                      <div className="card-body">
                        <h5 className="card-title">{tourPackage.tourName}</h5>
                        <p className="card-text">
                          {tourPackage.noofdays} Nights / {tourPackage.noofdays + 1} Days
                        </p>
                        <p className="card-text">
                          Destinations:
                          {tourPackage.tourDestination.map((destination,index) => {
                            const destinationData = Destinations.find(
                              (dest) => dest.destinationId === destination.destinationId
                            );
                            const isLastDestination = index === tourPackage.tourDestination.length - 1;

                            return (
                              <span key={destination.id}>
                                {destinationData && destinationData.destinationName}
                                {isLastDestination ? "" : " -> "}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                    </div>
                    {/* Third Column: Price */}
                    <div className="col-md-4">
                      <div className="card-body">
                        <p className="card-text">Price: ${tourPackage.tourPrice}</p>
                        <Link to={`/tour-details/${tourPackage.tourId}`}  className="viewdetails no-underline">View Details
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TourPackages;





