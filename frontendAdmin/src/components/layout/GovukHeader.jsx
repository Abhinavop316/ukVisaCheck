import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function GovukHeader({ serviceName = "UK Visas and Immigration – Admin Portal", serviceUrl = "/Admin-Login", isAdminLoggedIn = false, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/edit-application?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="govuk-header" role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <Link to="/" className="govuk-header__homepage-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }} aria-label="UKVI Portal Homepage">
            <svg
              viewBox="0 0 32 32"
              height="28"
              width="28"
              fill="currentColor"
              style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
            >
              <path d="M16 3L5 7v9c0 7.2 4.7 13.9 11 15.6 6.3-1.7 11-8.4 11-15.6V7l-11-4zm0 3.2l8 2.9v6.9c0 5.4-3.5 10.5-8 12-4.5-1.5-8-6.6-8-12V9.1l8-2.9z" fill="#ffffff" />
              <path d="M14.2 18.3l-3.2-3.2 1.4-1.4 1.8 1.8 4.8-4.8 1.4 1.4-6.2 6.2z" fill="#ffffff" />
            </svg>
            <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.3px', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
              UKVI
            </span>
          </Link>
          <Link to={serviceUrl} className="govuk-header__service-name">
            {serviceName}
          </Link>
        </div>

        <div className="govuk-header__actions">
          {isAdminLoggedIn ? (
            <div className="govuk-header__nav-links">
              <Link
                to="/new-application"
                className={`govuk-header__nav-link ${location.pathname === '/new-application' ? 'govuk-header__nav-link--active' : ''}`}
              >
                + New Application
              </Link>
              <Link
                to="/edit-application"
                className={`govuk-header__nav-link ${location.pathname === '/edit-application' ? 'govuk-header__nav-link--active' : ''}`}
              >
                Manage Applications
              </Link>
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="govuk-header__menu-btn"
                  style={{ marginLeft: '6px' }}
                >
                  Log out
                </button>
              )}
            </div>
          ) : (
            <div className="govuk-header__nav-links">
              <Link
                to="/Admin-Login"
                className={`govuk-header__nav-link ${location.pathname === '/Admin-Login' ? 'govuk-header__nav-link--active' : ''}`}
              >
                Admin Login
              </Link>
            </div>
          )}

          <button
            type="button"
            className="govuk-header__menu-btn"
            aria-expanded={isSearchOpen}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            title="Search applications"
          >
            🔍 Search
          </button>
        </div>
      </div>

      {/* Search dropdown for caseworker quick search */}
      {isSearchOpen && (
        <div className="govuk-header__search-bar">
          <div className="govuk-width-container">
            <form className="govuk-header__search-form" onSubmit={handleSearchSubmit}>
              <input
                type="search"
                className="govuk-header__search-input"
                placeholder="Search by Passport or Email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="govuk-header__search-button" aria-label="Search">
                🔍
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
