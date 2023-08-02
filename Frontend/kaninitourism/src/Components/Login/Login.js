import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [registrationType, setRegistrationType] = useState("travel_agent");
  const [TravelAgent, setTravelAgent] = useState({
    "users": {
      "email": ""
    },
    "username": "",
    "agencyName": "",
    "contactNumber": "",
    "country": "",
    "address": "",
    "licenseNumber": "",
    "isActive": true,
    "yearsInBusiness": 0,
    "licenseExpiryDate": "",
    "passwordClear": ""
  });

  const [Traveller, setTraveller] = useState({
    "users": {
      "email": ""
    },
    "username": "",
    "phoneNumber": "",
    "gender": "",
    "passwordClear": ""
  });

  const [user, setUser] = useState({
    "userId": 0,
    "email": "",
    "password": "",
    "role": "",
    "token": ""
  });

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  const handleRegistrationTypeChange = () => {
    setRegistrationType(registrationType === "travel_agent" ? "traveller" : "travel_agent");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
    } else {
      if (registrationType === "travel_agent") {
    
      } else if (registrationType === "traveller") {
        
      }
    }
  };

  return (
    <div id="container" className={`container ${isSignIn ? "sign-in" : "sign-up"}`}>
      <div className="row">
        {/* SIGN UP */}
        <div className={`col  ${isSignIn ? "hidden" : ""}`}>
          <div className="form-wrapper align-items-center">
            <form className="form sign-up" onSubmit={handleSubmit}>
              <label className="switch">
                <input type="checkbox" checked={registrationType === "travel_agent"} onChange={handleRegistrationTypeChange} />
                <span className="slider round"></span>
              </label>
              <span className="toggle-label">
                {registrationType === "travel_agent" ? "Register as Travel Agent" : "Register as Traveller"}
              </span>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Username" value={registrationType === "travel_agent" ? TravelAgent.username : Traveller.username} onChange={(e) => registrationType === "travel_agent" ? setTravelAgent({ ...TravelAgent, username: e.target.value }) : setTraveller({ ...Traveller, username: e.target.value })} />
              </div>
              {registrationType === "traveller" && ( 
                <div className="input-group">
                  <i className="bx bx-phone"></i>
                  <input type="tel" placeholder="Phone Number" value={Traveller.phoneNumber} onChange={(e) => setTraveller({ ...Traveller, phoneNumber: e.target.value })} />
                </div>
              )}
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input type="email" placeholder="Email" value={registrationType === "travel_agent" ? TravelAgent.users.email : Traveller.users.email} onChange={(e) => registrationType === "travel_agent" ? setTravelAgent({ ...TravelAgent, users: { ...TravelAgent.users, email: e.target.value } }) : setTraveller({ ...Traveller, users: { ...Traveller.users, email: e.target.value } })} />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Password" value={registrationType === "travel_agent" ? TravelAgent.passwordClear : Traveller.passwordClear} onChange={(e) => registrationType === "travel_agent" ? setTravelAgent({ ...TravelAgent, passwordClear: e.target.value }) : setTraveller({ ...Traveller, passwordClear: e.target.value })} />
              </div>
              {registrationType === "travel_agent" && (
                <>
                  <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input type="text" placeholder="AgencyName" value={TravelAgent.agencyName} onChange={(e) => setTravelAgent({ ...TravelAgent, agencyName: e.target.value })} />
                  </div>
                  <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input type="text" placeholder="Country" value={TravelAgent.country} onChange={(e) => setTravelAgent({ ...TravelAgent, country: e.target.value })} />
                  </div>
                  <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input type="text" placeholder="Address" value={TravelAgent.address} onChange={(e) => setTravelAgent({ ...TravelAgent, address: e.target.value })} />
                  </div>
                  <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input type="text" placeholder="License Number" value={TravelAgent.licenseNumber} onChange={(e) => setTravelAgent({ ...TravelAgent, licenseNumber: e.target.value })} />
                  </div>
                  <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input type="text" placeholder="License Expiry Date" value={TravelAgent.licenseExpiryDate} onChange={(e) => setTravelAgent({ ...TravelAgent, licenseExpiryDate: e.target.value })} />
                  </div>
                  <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input type="number" placeholder="Years In Business" value={TravelAgent.yearsInBusiness} onChange={(e) => setTravelAgent({ ...TravelAgent, yearsInBusiness: e.target.value })} />
                  </div>
                </>
              )}
              <button type="submit">Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b onClick={handleToggle} className="pointer">
                  Sign in here
                </b>
              </p>
            </form>
          </div>
        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}
        <div className={`col align-items-center flex-col ${isSignIn ? "" : "hidden"}`}>
          <div className="form-wrapper align-items-center">
            <form className="form sign-in" onSubmit={handleSubmit}>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="email" value={user.email} onChange={(e) => setUser(e.target.value)} />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser(e.target.value)} />
              </div>
              <button type="submit">Sign in</button>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={handleToggle} className="pointer">
                  Sign up here
                </b>
              </p>
            </form>
          </div>
          <div className="form-wrapper"></div>
        </div>
        {/* END SIGN IN */}
      </div>
      {/* END FORM SECTION */}
      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* SIGN IN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UP CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
      {/* END CONTENT SECTION */}
    </div>
  );
}

export default Login;
