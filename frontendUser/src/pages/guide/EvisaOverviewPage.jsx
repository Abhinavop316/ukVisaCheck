import React from 'react';
import { Link } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import GuideContents from '../../components/common/GuideContents';
import Pagination from '../../components/common/Pagination';
import SidebarRelated from '../../components/common/SidebarRelated';
import { InsetText } from '../../components/common/GdsElements';

export default function EvisaOverviewPage() {
  const breadcrumbs = [
    { title: 'Home', url: '/' },
    { title: 'Visas and immigration', url: '/browse/visas-immigration' },
    { title: 'eVisas: access and use your online immigration status', url: '/evisa' }
  ];

  const nextStep = {
    title: 'What you need to access your eVisa',
    path: '/evisa/what-you-need-to-access-evisa'
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
            What an eVisa is
          </h2>

          <p className="govuk-body">An eVisa is a digital record of:</p>

          <ul className="govuk-list govuk-list--bullet">
            <li>your identity and immigration status - for example the type of visa you have or if you have indefinite leave to remain (settlement) in the UK</li>
            <li>the conditions of your status - for example if you’re allowed to work or study in the UK</li>
          </ul>

          <p className="govuk-body">
            You’ll get an eVisa when you successfully apply for a visa or other type of permission to be in the UK.
          </p>

          <p className="govuk-body">
            eVisas have replaced physical immigration documents.
          </p>

          <p className="govuk-body">
            If you have a biometric residence card (BRC) you may still be able to use it in some situations.
          </p>

          <p className="govuk-body">
            If you have a visa vignette (sticker), it will remain valid until it expires.
          </p>

          <h3 className="govuk-heading-m">How to use your eVisa</h3>

          <p className="govuk-body">
            You can <Link to="/evisa/view-evisa-get-share-code-prove-immigration-status">view your eVisa and get a share code to prove your immigration status</Link>, for example when you get a new job or rent a home.
          </p>

          <p className="govuk-body">
            You can <Link to="/evisa/travel-with-evisa">travel with your eVisa</Link> after you add your passport or travel document details.
          </p>

          <h3 className="govuk-heading-m">Access your eVisa</h3>

          <p className="govuk-body">
            You need a UK Visas and Immigration (<abbr title="UK Visas and Immigration">UKVI</abbr>) account to access your eVisa.
          </p>

          <p className="govuk-body">
            You can <Link to="/evisa/set-up-ukvi-account">set up a UKVI account</Link> if you do not already have one.
          </p>

          <InsetText>
            You do not need to pay to set up a UKVI account or access your eVisa.
          </InsetText>

          <Pagination next={nextStep} />
        </div>

        <div className="govuk-grid-column-one-third">
          <SidebarRelated />
        </div>
      </div>
    </GovukLayout>
  );
}
