import React from 'react';
import { Link } from 'react-router-dom';

export default function GovukFooter() {
  return (
    <footer className="govuk-footer" role="contentinfo">
      <div className="govuk-width-container">
        <div className="govuk-footer__navigation">
          <div className="govuk-footer__section">
            <h2 className="govuk-footer__heading">Services and information</h2>
            <ul className="govuk-footer__list">
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/browse/benefits">Benefits</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/browse/births-deaths-marriages">Births, death, marriages and care</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/browse/business">Business and self-employed</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/browse/childcare-parenting">Childcare and parenting</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/browse/citizenship">Citizenship and living in the UK</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/browse/visas-immigration">Visas and immigration</Link>
              </li>
            </ul>
          </div>
          <div className="govuk-footer__section">
            <h2 className="govuk-footer__heading">Government activity</h2>
            <ul className="govuk-footer__list">
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/government/departments">Departments</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/government/news">News</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/government/guidance">Guidance and regulation</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/government/research">Research and statistics</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/government/policy-papers">Policy papers and consultations</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/government/transparency">Transparency</Link>
              </li>
            </ul>
          </div>
          <div className="govuk-footer__section">
            <h2 className="govuk-footer__heading">Support and feedback</h2>
            <ul className="govuk-footer__list">
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/help">Help using GOV.UK</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/contact">Contact UKVI</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/feedback">Give feedback</Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link className="govuk-footer__link" to="/evisa/report-error-evisa">Report eVisa issue</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <h2 className="govuk-visually-hidden">Support links</h2>
            <ul className="govuk-footer__inline-list">
              <li><Link className="govuk-footer__link" to="/help">Help</Link></li>
              <li><Link className="govuk-footer__link" to="/help/privacy-notice">Privacy</Link></li>
              <li><Link className="govuk-footer__link" to="/help/cookies">Cookies</Link></li>
              <li><Link className="govuk-footer__link" to="/help/accessibility">Accessibility statement</Link></li>
              <li><Link className="govuk-footer__link" to="/contact">Contact</Link></li>
              <li><Link className="govuk-footer__link" to="/help/terms-conditions">Terms and conditions</Link></li>
            </ul>

            <div className="govuk-footer__ogl-license">
              <svg
                aria-hidden="true"
                focusable="false"
                className="govuk-footer__ogl-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 483.2 195.7"
                height="17"
                width="41"
              >
                <path
                  fill="currentColor"
                  d="M421.5 142.8V.1l-50.7 32.3v161.1h50.7v-50.7zm-267.3 0H205V.1l-50.8 32.3v110.4zm106.6 0H311V.1l-50.8 32.3v110.4zm164.7-142.7L374.8.1v195.6h50.7V.1zm-318.5 0L56.2.1v195.6H107V.1z"
                ></path>
              </svg>
              <span>
                All content is available under the{' '}
                <a
                  className="govuk-footer__link"
                  href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                  rel="license"
                  target="_blank"
                >
                  Open Government Licence v3.0
                </a>
                , except where otherwise stated
              </span>
            </div>
            <div style={{ marginTop: '10px', fontSize: '13px', color: '#505a5f' }}>
              UK Visas and Immigration Online Verification Portal. For official application status and caseworker services.
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
              <span style={{ fontSize: '13px', color: '#505a5f' }}>© UKVI Verification Portal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

