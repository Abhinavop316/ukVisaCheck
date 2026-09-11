import React from 'react';
import { Link } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import GuideContents from '../../components/common/GuideContents';
import Pagination from '../../components/common/Pagination';
import SidebarRelated from '../../components/common/SidebarRelated';
import StartButton from '../../components/common/StartButton';
import { InsetText } from '../../components/common/GdsElements';

export default function SetUpUkviAccountPage() {
  const breadcrumbs = [
    { title: 'Home', url: '/' },
    { title: 'Visas and immigration', url: '/browse/visas-immigration' },
    { title: 'eVisas: access and use your online immigration status', url: '/evisa' }
  ];

  const prevStep = {
    title: 'What you need to access your eVisa',
    path: '/evisa/what-you-need-to-access-evisa'
  };

  const nextStep = {
    title: 'Update your UKVI account details',
    path: '/evisa/update-ukvi-account'
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
            Set up access to your eVisa
          </h2>

          <p className="govuk-body">
            To set up access to your eVisa, you will need to create a UKVI account, confirm your identity, and link your account to your eVisa.
          </p>

          <h3 className="govuk-heading-m">Step 1: Create your UKVI account</h3>
          <p className="govuk-body">
            You’ll be asked to provide your identity document details, your date of birth, and your contact details (phone number and email address).
          </p>

          <h3 className="govuk-heading-m">Step 2: Confirm your identity</h3>
          <p className="govuk-body">
            You will use the ‘UK Immigration: ID Check’ app on your smartphone to:
          </p>
          <ul className="govuk-list govuk-list--bullet">
            <li>take a photo of your identity document (e.g. passport or BRP)</li>
            <li>scan the biometric chip inside your document using your phone’s contactless sensor (NFC)</li>
            <li>scan your face to verify that you match the document photo</li>
          </ul>

          <h3 className="govuk-heading-m">Step 3: Link your account to your eVisa</h3>
          <p className="govuk-body">
            Once you’ve verified your identity in the app, you will return to GOV.UK to complete the process. You will receive an email confirmation once your eVisa is ready to view.
          </p>

          <div style={{ margin: '30px 0' }}>
            <StartButton to="/status">
              Start setting up your UKVI account
            </StartButton>
          </div>

          <InsetText>
            It can take a few days for your eVisa to become visible after creating your account. You will receive an email once it is ready.
          </InsetText>

          <Pagination prev={prevStep} next={nextStep} />
        </div>

        <div className="govuk-grid-column-one-third">
          <SidebarRelated />
        </div>
      </div>
    </GovukLayout>
  );
}
