import React from 'react';
import { Link } from 'react-router-dom';
import GovukLayout from '../components/layout/GovukLayout';

export default function NotFoundPage() {
  return (
    <GovukLayout breadcrumbs={[{ title: 'Home', url: '/' }, { title: 'Page not found' }]}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl">Page not found</h1>
          <p className="govuk-body">
            If you typed the web address, check it is correct.
          </p>
          <p className="govuk-body">
            If you pasted the web address, check you copied the entire address.
          </p>
          <p className="govuk-body">
            You can:
          </p>
          <ul className="govuk-list govuk-list--bullet">
            <li>
              <Link to="/evisa/view-evisa-get-share-code-prove-immigration-status" className="govuk-link">
                View your eVisa and get a share code
              </Link>
            </li>
            <li>
              <Link to="/evisa" className="govuk-link">
                Read the guide on eVisas
              </Link>
            </li>
            <li>
              <Link to="/status" className="govuk-link">
                Sign in to the View and prove your immigration status service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </GovukLayout>
  );
}
