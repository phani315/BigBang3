import React from "react";
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.png';

function Navbar() {
  const isHomePage = window.location.pathname === "/"; // Check if the current URL is the homepage

  return (
    <div className="navbar">
      <div className="header">
        <nav>
          <input type="checkbox" id="show-search" />
          <input type="checkbox" id="show-menu" />
          <label htmlFor="show-menu" className="menu-icon">
            <FontAwesomeIcon icon={faBars} />
          </label>

          <div className="content">
            <div className="logo">
              <a href="index.html">
                <img src={logo} alt="" />
              </a>
            </div>
            <ul className="links">
              <li><a href="/">Home</a></li>
              {isHomePage && (
                <>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#reviews">Reviews</a></li>
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="/TourPackage">Tour Packages</a></li>

                </>
              )}
            </ul>
          </div>
          <label htmlFor="show-search" className="search-icon"><i className="fas fa-search"></i></label>
          <form action="#" className="search-box">
          </form>
        </nav>
      </div>
    </div>
  )
}

export default Navbar;
