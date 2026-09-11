import React from 'react';
import { Link } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import GuideContents from '../../components/common/GuideContents';
import Pagination from '../../components/common/Pagination';
import SidebarRelated from '../../components/common/SidebarRelated';
import StartButton from '../../components/common/StartButton';
import { Details, InsetText } from '../../components/common/GdsElements';

export default function ViewEvisaShareCodePage() {
  const breadcrumbs = [
    { title: 'Home', url: '/' },
    { title: 'Visas and immigration', url: '/browse/visas-immigration' },
    { title: 'eVisas: access and use your online immigration status', url: '/evisa' }
  ];

  const prevStep = {
    title: 'Update your UKVI account details',
    path: '/evisa/update-ukvi-account'
  };

  const nextStep = {
    title: 'Report an error with your eVisa',
    path: '/evisa/report-error-evisa'
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
            View your eVisa and get a share code to prove your immigration status
          </h2>

          <p className="govuk-body">
            Your eVisa shows your identity and immigration status. This includes what rights you have in the UK, for example to work, rent or claim benefits.
          </p>

          <p className="govuk-body">
            You can get a share code to prove your immigration status to people such as employers or landlords, or when you travel.
          </p>

          <p className="govuk-body">
            You’ll need to give them your date of birth. You will not need to show them your eVisa.
          </p>

          <p className="govuk-body">
            The person who uses your share code will see some of your personal details. When you get your share code you’ll be told what they’ll see.
          </p>

          <p className="govuk-body">A share code lasts for 90 days. You can:</p>

          <ul className="govuk-list govuk-list--bullet">
            <li>use the share code as many times as you need before it expires</li>
            <li>get a new share code whenever you need one</li>
          </ul>

          <h3 className="govuk-heading-m" id="view-your-evisa-and-get-a-share-code">
            View your eVisa and get a share code
          </h3>

          <p className="govuk-body">
            You’ll need the details you use to sign in to your <abbr title="UK Visas and Immigration">UKVI</abbr> account. This could be your:
          </p>

          <ul className="govuk-list govuk-list--bullet">
            <li>passport</li>
            <li>national identity card</li>
            <li>biometric residence card (<abbr title="biometric residence card">BRC</abbr>) - this can be valid or expired</li>
            <li>expired biometric residence permit (<abbr title="biometric residence permit">BRP</abbr>)</li>
            <li><abbr title="UK Visas and Immigration">UKVI</abbr> customer number</li>
          </ul>

          <p className="govuk-body">
            You’ll also need access to the mobile phone number or email address you use to sign in to your <abbr title="UK Visas and Immigration">UKVI</abbr> account.
          </p>

          <div style={{ margin: '30px 0' }}>
            <StartButton to="/service/sign-in-document">
              View your eVisa and get a share code
            </StartButton>
          </div>

          <InsetText>
            If you need to generate a share code specifically for an employer or landlord, you will be able to select that reason when you view your status.
          </InsetText>

          <h3 className="govuk-heading-m" id="report-an-error-with-your-evisa">
            Report an error with your eVisa
          </h3>

          <p className="govuk-body">
            You should <Link to="/evisa/report-error-evisa">report an error with your eVisa</Link> if:
          </p>

          <ul className="govuk-list govuk-list--bullet">
            <li>your eVisa is wrong - for example it’s showing the wrong date of birth or immigration status</li>
            <li>you can view your eVisa but you cannot use it to get a share code</li>
          </ul>

          <h3 className="govuk-heading-m" id="update-your-details-before-you-get-a-share-code">
            Update your details before you get a share code
          </h3>

          <p className="govuk-body">
            You should <Link to="/evisa/update-ukvi-account">update your <abbr title="UK Visas and Immigration">UKVI</abbr> account</Link> before you get a share code if:
          </p>

          <ul className="govuk-list govuk-list--bullet">
            <li>you’ve changed your name or nationality</li>
            <li>you need to change your photo because you cannot be recognised from the current one</li>
          </ul>

          <h3 className="govuk-heading-m" id="if-you-cannot-view-your-evisa">
            If you cannot view your eVisa
          </h3>

          <p className="govuk-body">
            Check that you have finished <Link to="/evisa/set-up-ukvi-account">setting up your <abbr title="UK Visas and Immigration">UKVI</abbr> account to access your eVisa</Link>.
          </p>

          <p className="govuk-body">
            You can use different services to <Link to="/prove-right-to-work">prove your right to work</Link> or <Link to="/prove-right-to-rent">prove your right to rent</Link> if you cannot access an eVisa.
          </p>

          <h3 className="govuk-heading-m" id="get-help">
            Get help
          </h3>

          <p className="govuk-body">
            You can get help to <Link to="/help/account-recovery">recover your <abbr title="UK Visas and Immigration">UKVI</abbr> account</Link> if you’re having problems signing in to view your eVisa.
          </p>

          <p className="govuk-body">
            You can <Link to="/contact">chat to <abbr title="UK Visas and Immigration">UKVI</abbr> using webchat</Link> if you have other questions about your eVisa or <abbr title="UK Visas and Immigration">UKVI</abbr> account.
          </p>

          <p className="govuk-body">
            You can also <Link to="/government/collections/evisa-support-videos">watch eVisa support videos</Link>.
          </p>

          <Details summary="What if my employer or landlord wants to check my share code?">
            <p className="govuk-body">
              Employers can check your right to work using the official check service. They will need your share code and date of birth. They will only see the information relevant to their check.
            </p>
            <p className="govuk-body">
              You can direct them to the <Link to="/check-immigration-status">Check an immigration status service</Link>.
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
