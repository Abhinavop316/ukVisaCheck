import React from 'react';
import { Link } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import GuideContents from '../../components/common/GuideContents';
import Pagination from '../../components/common/Pagination';
import SidebarRelated from '../../components/common/SidebarRelated';
import { InsetText } from '../../components/common/GdsElements';

export default function ReportErrorPage() {
  const breadcrumbs = [
    { title: 'Home', url: '/' },
    { title: 'Visas and immigration', url: '/browse/visas-immigration' },
    { title: 'eVisas: access and use your online immigration status', url: '/evisa' }
  ];

  const prevStep = {
    title: 'View your eVisa and get a share code to prove your immigration status',
    path: '/service/start'
  };

  const nextStep = {
    title: 'If you cannot access your eVisa',
    path: '/evisa/if-you-cannot-access-evisa'
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
            Report an error with your eVisa
          </h2>

          <p className="govuk-body">
            You should report an error if information on your eVisa does not match your grant letter or application decision.
          </p>

          <h3 className="govuk-heading-m">Types of errors you can report</h3>
          <ul className="govuk-list govuk-list--bullet">
            <li>your name or date of birth is misspelt</li>
            <li>your nationality is incorrect</li>
            <li>your visa conditions or expiry date do not match your decision notice</li>
            <li>you cannot generate a share code even though your visa is active</li>
          </ul>

          <InsetText>
            To report an error, you will need your application reference number (URN or GWF number) and a copy of your decision letter.
          </InsetText>

          <p className="govuk-body">
            You can submit an enquiry directly to the UKVI digital status correction team or contact customer support for urgent corrections.
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
