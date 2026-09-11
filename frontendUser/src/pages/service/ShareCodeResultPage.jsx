import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import { useAuth } from '../../context/AuthContext';
import { Details, InsetText } from '../../components/common/GdsElements';

export default function ShareCodeResultPage() {
  const [searchParams] = useSearchParams();
  const { currentUser, shareCodes } = useAuth();
  const [copied, setCopied] = useState(false);

  const queryCode = searchParams.get('code');
  const queryPurpose = searchParams.get('purpose') || 'work';

  // Find record or default
  const record = shareCodes.find(r => r.code === queryCode) || shareCodes[0] || {
    code: queryCode || '9XY 4TR 2PQ',
    purpose: queryPurpose,
    purposeTitle: queryPurpose === 'work' ? 'Prove right to work' : queryPurpose === 'rent' ? 'Prove right to rent' : 'Prove immigration status',
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    user: currentUser
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(record.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const expiryFormatted = new Date(record.expiresAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <GovukLayout
      serviceName="View and prove your immigration status"
      serviceUrl="/status"
      backLink="/service/status-profile"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {/* Confirmation Panel */}
          <div className="govuk-panel govuk-panel--confirmation">
            <h1 className="govuk-panel__title">Your share code</h1>
            <div className="govuk-panel__body">
              <strong>{record.code}</strong>
            </div>
          </div>

          <p className="govuk-body-l">
            This share code is for: <strong>{record.purposeTitle}</strong>
          </p>

          <p className="govuk-body">
            Give this share code and your date of birth (<strong>{record.user?.dob?.day} / {record.user?.dob?.month} / {record.user?.dob?.year}</strong>) to the person or organisation who needs to check your status.
          </p>

          <p className="govuk-body">
            This code will expire on <strong>{expiryFormatted}</strong> (in 90 days). You can use this code as many times as you need before it expires.
          </p>

          <div className="govuk-button-group no-print">
            <button
              type="button"
              className="govuk-button"
              onClick={handleCopy}
            >
              {copied ? '✓ Share code copied!' : 'Copy share code'}
            </button>
            <button
              type="button"
              className="govuk-button govuk-button--secondary"
              onClick={handlePrint}
            >
              Print or save as PDF
            </button>
          </div>

          <InsetText>
            The person checking your share code will not be able to see your full immigration history. They will only see information relevant to proving your {record.purpose === 'work' ? 'right to work' : record.purpose === 'rent' ? 'right to rent' : 'immigration status'}.
          </InsetText>

          <h2 className="govuk-heading-m">What they will see</h2>

          <div className="status-card" style={{ padding: '20px' }}>
            <dl className="govuk-summary-list" style={{ margin: 0 }}>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Photo</dt>
                <dd className="govuk-summary-list__value">
                  <img
                    src={record.user?.photoUrl}
                    alt="Applicant Photo"
                    style={{ width: '80px', height: '100px', objectFit: 'cover', border: '1px solid #b1b4b6' }}
                  />
                </dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Full name</dt>
                <dd className="govuk-summary-list__value">{record.user?.fullName}</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Immigration status</dt>
                <dd className="govuk-summary-list__value">{record.user?.statusType}</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Valid until</dt>
                <dd className="govuk-summary-list__value">{record.user?.validUntil}</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Conditions</dt>
                <dd className="govuk-summary-list__value">
                  {record.purpose === 'work'
                    ? record.user?.workRights
                    : record.purpose === 'rent'
                    ? record.user?.rentRights
                    : record.user?.workRights}
                </dd>
              </div>
            </dl>
          </div>

          <Details summary="How will my employer or landlord check this?">
            <p className="govuk-body">
              They will visit the official GOV.UK check immigration status page, enter your share code and date of birth, and download a certificate for their statutory compliance records.
            </p>
            <p className="govuk-body">
              <Link to={`/check-immigration-status?shareCode=${encodeURIComponent(record.code)}`} className="govuk-link">
                Test checking this share code as an employer or landlord →
              </Link>
            </p>
          </Details>

          <div className="no-print" style={{ marginTop: '40px' }}>
            <p className="govuk-body">
              <Link to="/service/status-profile" className="govuk-link">
                Return to your immigration status profile
              </Link>
            </p>
            <p className="govuk-body">
              <Link to="/evisa/view-evisa-get-share-code-prove-immigration-status" className="govuk-link">
                Return to eVisa guide
              </Link>
            </p>
          </div>
        </div>

        <div className="govuk-grid-column-one-third no-print">
          <div className="gem-c-contextual-sidebar">
            <h2 className="govuk-heading-s">Actions</h2>
            <ul className="govuk-list">
              <li>
                <Link to="/service/share-code-purpose" className="govuk-link">
                  Generate another share code
                </Link>
              </li>
              <li>
                <Link to={`/check-immigration-status?shareCode=${encodeURIComponent(record.code)}`} className="govuk-link">
                  Verify this code on check service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GovukLayout>
  );
}
