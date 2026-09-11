import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ConsentBanner() {
  const { cookieConsent, updateConsent } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || (cookieConsent && !showConfirmation)) {
    return null;
  }

  const handleAccept = () => {
    updateConsent('accepted');
    setShowConfirmation(true);
  };

  const handleReject = () => {
    updateConsent('rejected');
    setShowConfirmation(true);
  };

  const handleHide = () => {
    setDismissed(true);
  };

  return (
    <div
      id="global-cookie-message"
      className="gem-c-cookie-banner govuk-cookie-banner"
      role="region"
      aria-label="Cookies on GOV.UK"
    >
      <div className="govuk-width-container">
        {!showConfirmation ? (
          <div className="govuk-cookie-banner__message">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <h2 className="govuk-heading-m" style={{ marginTop: 0 }}>Cookies on GOV.UK</h2>
                <div className="govuk-body">
                  <p>We use some essential cookies to make this website work.</p>
                  <p>
                    We’d like to set additional cookies to understand how you use GOV.UK,
                    remember your settings and improve government services.
                  </p>
                  <p>We also use cookies set by other sites to help us deliver content from their services.</p>
                </div>
              </div>
            </div>
            <div className="govuk-button-group">
              <button
                type="button"
                className="govuk-button"
                onClick={handleAccept}
              >
                Accept additional cookies
              </button>
              <button
                type="button"
                className="govuk-button govuk-button--secondary"
                onClick={handleReject}
              >
                Reject additional cookies
              </button>
              <Link className="govuk-link" to="/help/cookies">
                View cookies
              </Link>
            </div>
          </div>
        ) : (
          <div className="govuk-cookie-banner__message">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <p className="govuk-body">
                  You have {cookieConsent === 'accepted' ? 'accepted' : 'rejected'} additional cookies.
                  You can <Link className="govuk-link" to="/help/cookies">change your cookie settings</Link> at any time.
                </p>
              </div>
            </div>
            <div className="govuk-button-group">
              <button
                type="button"
                className="govuk-button govuk-button--secondary"
                onClick={handleHide}
              >
                Hide cookie message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
