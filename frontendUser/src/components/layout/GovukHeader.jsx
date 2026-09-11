import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function GovukHeader({ serviceName, serviceUrl }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
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
          {serviceName && (
            <Link to={serviceUrl || "/status"} className="govuk-header__service-name">
              {serviceName}
            </Link>
          )}
        </div>

        <div className="govuk-header__actions">
          <button
            type="button"
            className="govuk-header__menu-btn"
            aria-expanded={isMenuOpen}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (isSearchOpen) setIsSearchOpen(false);
            }}
          >
            Menu {isMenuOpen ? '▲' : '▼'}
          </button>
          <button
            type="button"
            className="govuk-header__menu-btn"
            aria-expanded={isSearchOpen}
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isMenuOpen) setIsMenuOpen(false);
            }}
          >
            🔍 Search
          </button>
        </div>
      </div>

      {/* Search dropdown */}
      {isSearchOpen && (
        <div className="govuk-header__search-bar">
          <div className="govuk-width-container">
            <form className="govuk-header__search-form" onSubmit={handleSearchSubmit}>
              <input
                type="search"
                className="govuk-header__search-input"
                placeholder="Search GOV.UK"
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

      {/* Mega menu dropdown */}
      {isMenuOpen && (
        <div className="govuk-header__mega-menu">
          <div className="govuk-width-container">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-one-third">
                <h3 className="govuk-heading-s" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '8px' }}>
                  Visas and immigration
                </h3>
                <ul className="govuk-header__mega-menu-list">
                  <li><Link to="/evisa">eVisas and online status</Link></li>
                  <li><Link to="/evisa/view-evisa-get-share-code-prove-immigration-status">View eVisa & share code</Link></li>
                  <li><Link to="/evisa/set-up-ukvi-account">Set up UKVI account</Link></li>
                  <li><Link to="/evisa/update-ukvi-account">Update UKVI details</Link></li>
                  <li><Link to="/status">Prove immigration status service</Link></li>
                  <li><Link to="/check-immigration-status">Check right to work / rent</Link></li>
                </ul>
              </div>
              <div className="govuk-grid-column-one-third">
                <h3 className="govuk-heading-s" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '8px' }}>
                  Popular topics
                </h3>
                <ul className="govuk-header__mega-menu-list">
                  <li><Link to="/browse/working-uk">Working in the UK</Link></li>
                  <li><Link to="/browse/settle-uk">Settling in the UK</Link></li>
                  <li><Link to="/browse/student-visas">Student visas</Link></li>
                  <li><Link to="/browse/family-visas">Family visas</Link></li>
                  <li><Link to="/browse/british-citizenship">British citizenship</Link></li>
                </ul>
              </div>
              <div className="govuk-grid-column-one-third">
                <h3 className="govuk-heading-s" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '8px' }}>
                  Government activity
                </h3>
                <ul className="govuk-header__mega-menu-list">
                  <li><Link to="/government/departments">Departments</Link></li>
                  <li><Link to="/government/news">News & communications</Link></li>
                  <li><Link to="/government/guidance">Guidance and regulation</Link></li>
                  <li><Link to="/government/statistics">Research and statistics</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
