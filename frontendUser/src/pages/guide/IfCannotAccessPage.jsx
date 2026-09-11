import React from 'react';
import { Link } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import GuideContents from '../../components/common/GuideContents';
import Pagination from '../../components/common/Pagination';
import SidebarRelated from '../../components/common/SidebarRelated';

export default function IfCannotAccessPage() {
  const breadcrumbs = [
    { title: 'Home', url: '/' },
    { title: 'Visas and immigration', url: '/browse/visas-immigration' },
    { title: 'eVisas: access and use your online immigration status', url: '/evisa' }
  ];

  const prevStep = {
    title: 'Report an error with your eVisa',
    path: '/evisa/report-error-evisa'
  };

  const nextStep = {
    title: 'Travel with your eVisa',
    path: '/evisa/travel-with-evisa'
  };

  return (
    <GovukLayout breadcrumbs={breadcrumbs}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <span className="govuk-caption-xl">Guide</span>
          <h1 className="govuk-heading-xl" style={{ marginBottom: '20px' }}>
            eVisas: access and use your online immigration status
          </h1>

          <GuideContents />

          <h2 className="govuk-heading-l" style={{ marginTop: '30px' }}>
            If you cannot access your eVisa
          </h2>

          <p className="govuk-body">
            If you cannot access your eVisa online, there are other ways to prove your status or get help accessing your account.
          </p>

          <h3 className="govuk-heading-m">Prove your status using other services</h3>
          <p className="govuk-body">You may still be able to prove your status using:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>the <Link to="/prove-right-to-work">Prove your right to work to an employer</Link> service</li>
            <li>the <Link to="/prove-right-to-rent">Prove your right to rent in England</Link> service</li>
            <li>a physical document if you have indefinite leave to enter or remain with a wet ink stamp or vignette sticker</li>
          </ul>

          <h3 className="govuk-heading-m">Recovering your UKVI account</h3>
          <p className="govuk-body">
            If you no longer have access to the phone number or email address registered with your account, you can request an account recovery to update your contact information.
          </p>

          <Pagination prev={prevStep} next={nextStep} />
        </div>

        <div className="govuk-grid-column-one-third">
          <SidebarRelated />
        </div>
      </div>
    </GovukLayout>
  );
}
