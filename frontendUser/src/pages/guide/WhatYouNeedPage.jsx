import React from 'react';
import { Link } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import GuideContents from '../../components/common/GuideContents';
import Pagination from '../../components/common/Pagination';
import SidebarRelated from '../../components/common/SidebarRelated';
import { Details, WarningText } from '../../components/common/GdsElements';

export default function WhatYouNeedPage() {
  const breadcrumbs = [
    { title: 'Home', url: '/' },
    { title: 'Visas and immigration', url: '/browse/visas-immigration' },
    { title: 'eVisas: access and use your online immigration status', url: '/evisa' }
  ];

  const prevStep = {
    title: 'What an eVisa is',
    path: '/evisa'
  };

  const nextStep = {
    title: 'Set up access to your eVisa',
    path: '/evisa/set-up-ukvi-account'
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
            What you need to access your eVisa
          </h2>

          <p className="govuk-body">
            To access your eVisa, you’ll need to set up a UKVI account. Before you start, make sure you have:
          </p>

          <ul className="govuk-list govuk-list--bullet">
            <li>access to a smartphone with a camera (iPhone 7 or newer, or Android device with NFC)</li>
            <li>a valid passport, national identity card, or biometric residence permit (BRP)</li>
            <li>a mobile phone number and email address you can access</li>
            <li>your date of birth</li>
          </ul>

          <WarningText>
            Make sure the email address and phone number you provide are personal to you and will remain accessible over time.
          </WarningText>

          <h3 className="govuk-heading-m">Identity document requirements</h3>
          <p className="govuk-body">
            You must use the document that is currently linked to your UK immigration application or status. If you have renewed your passport since receiving your visa, you may need to enter your previous document number first or update your details.
          </p>

          <Details summary="What if my passport has expired?">
            <p className="govuk-body">
              You can still use an expired biometric residence permit (BRP) or your previous passport number to sign in initially, but you must update your UKVI account with your new valid passport details before travelling.
            </p>
          </Details>

          <Details summary="What if I do not have a smartphone?">
            <p className="govuk-body">
              You can use someone else’s phone to download the ‘UK Immigration: ID Check’ app and scan your document. No personal data is stored on their device.
            </p>
          </Details>

          <Pagination prev={prevStep} next={nextStep} />
        </div>

        <div className="govuk-grid-column-one-third">
          <SidebarRelated />
        </div>
      </div>
    </GovukLayout>
  );
}
