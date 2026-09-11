import React from 'react';
import { Link } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import GuideContents from '../../components/common/GuideContents';
import Pagination from '../../components/common/Pagination';
import SidebarRelated from '../../components/common/SidebarRelated';
import StartButton from '../../components/common/StartButton';
import { WarningText } from '../../components/common/GdsElements';

export default function UpdateUkviAccountPage() {
  const breadcrumbs = [
    { title: 'Home', url: '/' },
    { title: 'Visas and immigration', url: '/browse/visas-immigration' },
    { title: 'eVisas: access and use your online immigration status', url: '/evisa' }
  ];

  const prevStep = {
    title: 'Set up access to your eVisa',
    path: '/evisa/set-up-ukvi-account'
  };

  const nextStep = {
    title: 'View your eVisa and get a share code to prove your immigration status',
    path: '/evisa/view-evisa-get-share-code-prove-immigration-status'
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
            Update your UKVI account details
          </h2>

          <p className="govuk-body">
            You must keep your UKVI account details up to date so that carriers, border officials, employers, and landlords can verify your status seamlessly.
          </p>

          <h3 className="govuk-heading-m">What details you need to update</h3>
          <p className="govuk-body">You should update your account if you change your:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>passport, national identity card or travel document</li>
            <li>mobile phone number or email address</li>
            <li>home address or postal address</li>
            <li>legal name or nationality (you may need to upload evidence such as a marriage certificate or deed poll)</li>
          </ul>

          <WarningText>
            Always update your passport details before travelling outside the UK, so your carrier can automatically check your status before boarding.
          </WarningText>

          <div style={{ margin: '30px 0' }}>
            <StartButton to="/service/sign-in-document">
              Update your UKVI account details
            </StartButton>
          </div>

          <Pagination prev={prevStep} next={nextStep} />
        </div>

        <div className="govuk-grid-column-one-third">
          <SidebarRelated />
        </div>
      </div>
    </GovukLayout>
  );
}
