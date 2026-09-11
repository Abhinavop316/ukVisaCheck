import React from 'react';
import { Link } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import StartButton from '../../components/common/StartButton';
import { InsetText } from '../../components/common/GdsElements';

export default function ServiceStartPage() {
  return (
    <GovukLayout
      serviceName="View and prove your immigration status"
      serviceUrl="/status"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl">View and prove your immigration status (eVisa)</h1>

          <p className="govuk-body-l">
            Use this service to view your eVisa, check your rights in the UK, and get a share code to prove your immigration status to others.
          </p>

          <p className="govuk-body">You can use this service if you have:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>an eVisa</li>
            <li>settled or pre-settled status under the EU Settlement Scheme</li>
            <li>a biometric residence permit (BRP) or card (BRC) linked to your UKVI account</li>
          </ul>

          <h2 className="govuk-heading-m">What you can do with this service</h2>
          <ul className="govuk-list govuk-list--bullet">
            <li>view your immigration status and conditions (such as right to work or study)</li>
            <li>generate a 90-day share code for employers, landlords, or other organisations</li>
            <li>check the details of any share codes you have created</li>
          </ul>

          <div style={{ margin: '35px 0' }}>
            <StartButton to="/service/sign-in-document">
              Sign in to your UKVI account
            </StartButton>
          </div>

          <h2 className="govuk-heading-m">Before you start</h2>
          <p className="govuk-body">To sign in, you’ll need:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>the identity document number you used when applying or linking your UKVI account (passport, national ID, or BRP)</li>
            <li>your date of birth</li>
            <li>access to the mobile phone number or email address registered to your account for a 6-digit security code</li>
          </ul>

          <InsetText>
            If you are an employer or landlord wishing to check someone else’s status, use the{' '}
            <Link to="/check-immigration-status">Check an applicant’s immigration status service</Link>.
          </InsetText>
        </div>

        <div className="govuk-grid-column-one-third">
          <div className="gem-c-contextual-sidebar">
            <h2 className="govuk-heading-s">Related services</h2>
            <ul className="govuk-list">
              <li>
                <Link to="/check-immigration-status" className="govuk-link">
                  Check someone's status (for employers)
                </Link>
              </li>
              <li>
                <Link to="/evisa/update-ukvi-account" className="govuk-link">
                  Update UKVI account details
                </Link>
              </li>
              <li>
                <Link to="/help/account-recovery" className="govuk-link">
                  Recover your account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GovukLayout>
  );
}
