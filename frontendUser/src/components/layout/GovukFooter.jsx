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
          </div>

          <div className="govuk-footer__meta-item">
            <a
              className="govuk-footer__copyright-logo"
              href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
              target="_blank"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                className="govuk-footer__licence-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 125 102"
                height="34"
                width="42"
                fill="currentColor"
              >
                <path d="M65.3 15.4c-4.4 0-8.8.7-13 2.1-1.3-4.5-4.4-8.3-8.6-10.6C39.4 4.5 34.3 4 29.4 5.3c-4.9 1.4-9.1 4.5-12 8.8-2.9 4.3-4.1 9.5-3.5 14.7.7 5.1 3.2 9.8 7.1 13.1-3.6 4.4-5.6 9.9-5.6 15.6 0 7.4 3.4 14.4 9.3 18.9 5.8 4.6 13.3 6.9 20.8 6.5 4.3-.2 8.5-1.4 12.3-3.4 3.9 2.1 8.2 3.3 12.6 3.5 7.5.3 15-2 20.8-6.5 5.9-4.6 9.3-11.6 9.3-18.9 0-5.7-2-11.2-5.6-15.6 3.9-3.3 6.4-8 7.1-13.1.6-5.2-.6-10.4-3.5-14.7-2.9-4.3-7.1-7.4-12-8.8-4.9-1.3-10-.8-14.3 1.6-4.2 2.3-7.3 6.1-8.6 10.6-4.2-1.4-8.6-2.1-13-2.1z"></path>
              </svg>
              <span>© Crown copyright</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
