import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GovukHeader from './GovukHeader';
import GovukFooter from './GovukFooter';
import PhaseBanner from './PhaseBanner';
import Breadcrumbs from './Breadcrumbs';

export default function GovukLayout({
  children,
  breadcrumbs,
  backLink,
  onBack,
  showPhaseBanner = true,
  serviceName = "UK Visas and Immigration – Admin Portal",
  serviceUrl = "/Admin-Login",
  isAdminLoggedIn = false,
  onLogout
}) {
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    if (onBack) {
      e.preventDefault();
      onBack();
    } else if (typeof backLink === 'string' && backLink.startsWith('/')) {
      // Handled by router
    } else if (!backLink) {
      e.preventDefault();
      navigate(-1);
    }
  };

  return (
    <div className="govuk-template__body">
      <GovukHeader
        serviceName={serviceName}
        serviceUrl={serviceUrl}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={onLogout}
      />
      
      <div className="govuk-width-container">
        {showPhaseBanner && <PhaseBanner />}

        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

        {backLink && (
          typeof backLink === 'string' && backLink.startsWith('/') ? (
            <Link to={backLink} className="govuk-back-link">
              Back
            </Link>
          ) : (
            <a href="#back" onClick={handleBackClick} className="govuk-back-link">
              Back
            </a>
          )
        )}

        <main className="govuk-main-wrapper" id="main-content" role="main">
          {children}
        </main>
      </div>

      <GovukFooter />
    </div>
  );
}
