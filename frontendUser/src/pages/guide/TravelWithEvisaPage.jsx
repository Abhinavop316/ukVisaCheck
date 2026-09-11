import React from 'react';
import { Link } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import GuideContents from '../../components/common/GuideContents';
import Pagination from '../../components/common/Pagination';
import SidebarRelated from '../../components/common/SidebarRelated';
import { WarningText } from '../../components/common/GdsElements';

export default function TravelWithEvisaPage() {
  const breadcrumbs = [
    { title: 'Home', url: '/' },
    { title: 'Visas and immigration', url: '/browse/visas-immigration' },
    { title: 'eVisas: access and use your online immigration status', url: '/evisa' }
  ];

  const prevStep = {
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
            Travel with your eVisa
          </h2>

          <p className="govuk-body">
            When you travel to and from the UK, carriers (airlines, ferry operators, international trains) and border officials will check your immigration status electronically.
          </p>

          <WarningText>
            You must carry the passport or national identity card that is linked to your UKVI account when you travel.
          </WarningText>

          <h3 className="govuk-heading-m">Before you travel</h3>
          <p className="govuk-body">
            Check your UKVI account to ensure that the document details match the passport or ID card you are travelling with. If you have renewed your passport, make sure you have added the new passport to your UKVI account before your journey.
          </p>

          <h3 className="govuk-heading-m">Boarding and border checks</h3>
          <p className="govuk-body">
            Airlines and carriers will scan your passport at check-in. The carrier system will automatically connect with UKVI to confirm your permission to travel. You do not need to show a share code when boarding or at the UK border.
          </p>

          <Pagination prev={prevStep} />
        </div>

        <div className="govuk-grid-column-one-third">
          <SidebarRelated />
        </div>
      </div>
    </GovukLayout>
  );
}
