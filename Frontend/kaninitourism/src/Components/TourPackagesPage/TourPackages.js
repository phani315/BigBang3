import React, { useState, useEffect } from "react";
import "./TourPackages.css";
import Select from "react-select";

function TourPackages() {
  const [Destinations, setDestinations] = useState([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [resultTourPackage, setResultTourPackage] = useState([]);

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
          throw new Error("Failed to fetch company title");
        }
        const data = await response.json();
        setDestinations(data);
      });
  }, []);

  const destinationOptions = Destinations.map((destination) => ({
    value: destination.destinationId,
    label: destination.destinationName,
  }));

  const handleSearchHolidays = () => {
    if (selectedDestinationId) {
      fetch("http://localhost:5163/api/TourDetails", {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch company title");
          }
          const data = await response.json();
        //   console.log(data)
        //   console.log(data[0].tourDestination)
          // Filter the tour packages based on the selectedDestinationId
          const filteredTourPackages = data.filter((tourPackage) =>
          tourPackage.tourDestination.some(
            (destination) => destination.destinationId === selectedDestinationId
          )
        );
          setResultTourPackage(filteredTourPackages);
          console.log(resultTourPackage)
        });
      console.log("Selected Destination ID:", selectedDestinationId);
    } else {
      console.log("No destination selected.");
    }
  };
  return (
    <div className="container">
      <div className="destinations-container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Book Domestic and International Holidays</h5>
            <Select
              className="search"
              placeholder="Select a peer to compare"
              options={destinationOptions}
              value={destinationOptions.find(
                (option) => option.value === selectedDestinationId
              )}
              onChange={(selectedOption) =>
                setSelectedDestinationId(selectedOption.value)
              }
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
      <div className="tour-packages"></div>
    </div>
  );
}

export default TourPackages;
