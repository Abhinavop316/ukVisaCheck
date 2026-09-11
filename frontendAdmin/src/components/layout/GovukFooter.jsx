import React from 'react';
import { Link } from 'react-router-dom';

export default function GovukFooter() {
  return (
    <footer className="govuk-footer" role="contentinfo">
      <div className="govuk-width-container">
        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <h2 className="govuk-visually-hidden">Support links</h2>
            <ul className="govuk-footer__inline-list">
              <li>
                <Link to="/help" className="govuk-footer__link">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/help/privacy-notice" className="govuk-footer__link">
                  Privacy notice
                </Link>
              </li>
              <li>
                <Link to="/help/cookies" className="govuk-footer__link">
                  Cookies
                </Link>
              </li>
              <li>
                <Link to="/help/accessibility-statement" className="govuk-footer__link">
                  Accessibility statement
                </Link>
              </li>
              <li>
                <Link to="/contact" className="govuk-footer__link">
                  Contact UKVI Casework
                </Link>
              </li>
            </ul>

            <div className="govuk-footer__ogl-license">
              {/* OGL logo */}
              <svg
                aria-hidden="true"
                focusable="false"
                className="govuk-footer__ogl-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 483.2 195.7"
                height="17"
                width="41"
                fill="currentColor"
              >
                <path d="M421.5 142.8V.1l-50.7 32.3v161.1h50.7v-50.7zm-26.7-65.8l50.7-32.3v-44.6l-50.7 32.3v44.6zm-76.1 70.2V.1l-50.6 32.3v161.1h50.7v-46.7zm-26.7-65.8l50.7-32.3V.1l-50.7 32.3v44.5zm-76.1 70.2V.1l-50.7 32.3v161.1h50.7v-46.7zm-26.7-65.8l50.7-32.3V.1l-50.7 32.3v44.5zm-76.1 70.2V.1L88.5 32.4v161.1h50.7v-46.7zm-26.7-65.8l50.7-32.3V.1L38.4 32.4v44.5zM0 193.5h50.7V32.4L0 .1v193.4z" />
              </svg>
              <span>
                All content is available under the{' '}
                <a
                  className="govuk-footer__link"
                  href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                  rel="license"
                >
                  Open Government Licence v3.0
                </a>
                , except where otherwise stated
              </span>
            </div>
            <div style={{ marginTop: '10px', fontSize: '13px', color: '#505a5f' }}>
              UK Visas and Immigration Caseworker Portal. Internal authorized administration service.
            </div>
          </div>

          <div className="govuk-footer__meta-item">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              <svg
                aria-hidden="true"
                viewBox="0 0 32 32"
                height="30"
                width="30"
                fill="#505a5f"
              >
                <path d="M16 3L5 7v9c0 7.2 4.7 13.9 11 15.6 6.3-1.7 11-8.4 11-15.6V7l-11-4zm0 3.2l8 2.9v6.9c0 5.4-3.5 10.5-8 12-4.5-1.5-8-6.6-8-12V9.1l8-2.9z" />
                <path d="M14.2 18.3l-3.2-3.2 1.4-1.4 1.8 1.8 4.8-4.8 1.4 1.4-6.2 6.2z" />
              </svg>
              <span style={{ fontSize: '13px', color: '#505a5f' }}>© UKVI Caseworker Portal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
