import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Breadcrumbs.css";

function Breadcrumbs({ isAdminLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleProtectedClick = (e, path) => {
    if (!isAdminLoggedIn) {
      e.preventDefault();
      alert("Please log in as Admin to access this page.");
      navigate("/Admin-Login");
    }
  };

  return (
    <nav className="nz-breadcrumbs" aria-label="Breadcrumb navigation">
      <div className="nz-breadcrumbs__inner">
        <ul className="nz-breadcrumbs__list">
          <li>
            {location.pathname === "/Admin-Login" ? (
              <span className="nz-breadcrumbs__current">Admin Login</span>
            ) : (
              <Link to="/Admin-Login" className="nz-breadcrumbs__link">
                Admin Login
              </Link>
            )}
          </li>
          <li className="nz-breadcrumbs__sep">
            <svg className="nz-breadcrumbs__icon" viewBox="0 0 12 9" fill="currentColor">
              <path d="M4.5 9 3.4 7.9 6.3 5 3.4 2.1 4.5 1l4 4z" />
            </svg>
          </li>
          <li>
            {location.pathname === "/new-application" ? (
              <span className="nz-breadcrumbs__current">New Application</span>
            ) : (
              <Link
                to="/new-application"
                className={`nz-breadcrumbs__link ${!isAdminLoggedIn ? "disabled-link" : ""}`}
                onClick={(e) => handleProtectedClick(e, "/new-application")}
              >
                New Application {!isAdminLoggedIn && "🔒"}
              </Link>
            )}
          </li>
          <li className="nz-breadcrumbs__sep">
            <svg className="nz-breadcrumbs__icon" viewBox="0 0 12 9" fill="currentColor">
              <path d="M4.5 9 3.4 7.9 6.3 5 3.4 2.1 4.5 1l4 4z" />
            </svg>
          </li>
          <li>
            {location.pathname === "/edit-application" ? (
              <span className="nz-breadcrumbs__current">Edit Application</span>
            ) : (
              <Link
                to="/edit-application"
                className={`nz-breadcrumbs__link ${!isAdminLoggedIn ? "disabled-link" : ""}`}
                onClick={(e) => handleProtectedClick(e, "/edit-application")}
              >
                Edit Application {!isAdminLoggedIn && "🔒"}
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Breadcrumbs;
