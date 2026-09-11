import React from "react";
import { Link } from "react-router-dom";
import "../../styles/header/Navbar.css";

function Navbar() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand-row">
          <Link
            to="/new-application"
            className="site-header__brand"
            aria-label="Immigration New Zealand Admin Portal"
          >
            {/* Primary New Zealand Logo */}
            <div className="site-header__logo-container" title="Immigration New Zealand Logo">
              <img
                src="/Flag_of_NZ.png"
                alt="Immigration New Zealand Logo"
                className="site-header__logo-img"
              />
            </div>

            {/* Official INZ Branding Title */}
            <div className="site-header__title-group">
              <span className="site-header__title-main">Immigration New Zealand</span>
              <span className="site-header__title-sub">Admin Portal — Te Tāhuhu o Te Waihanga</span>
            </div>
          </Link>

          {/* Quick links */}
          <div className="site-header__quicklinks">
            <Link to="/new-application" className="site-header__quicklink">
              New Application
            </Link>
            <Link to="/edit-application" className="site-header__quicklink">
              Edit Application
            </Link>
            <Link to="/Admin-Login" className="site-header__login-btn">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
