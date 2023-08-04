// TourPackagesCard.js

import React from "react";

function TourPackagesCard({ tourPackages }) {
  console.log("Tour Packages Received:", tourPackages);

  return (
    <div>
      <h2>Tour Packages</h2>
      {/* Display the tour package information here */}
      {tourPackages.map((tourPackage) => (
        <div key={tourPackage.id}>
          <h3>{tourPackage.tourId}</h3>
          {/* Display other tour package information */}
        </div>
      ))}
    </div>
  );
}

export default TourPackagesCard;
