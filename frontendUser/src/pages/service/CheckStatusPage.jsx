import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import { useAuth } from '../../context/AuthContext';
import { ErrorSummary, InsetText, NotificationBanner } from '../../components/common/GdsElements';

export default function CheckStatusPage() {
  const [searchParams] = useSearchParams();
  const { verifyShareCode, shareCodes } = useAuth();

  const initialCode = searchParams.get('shareCode') || '';
  const [shareCodeInput, setShareCodeInput] = useState(initialCode);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [checkType, setCheckType] = useState('work');
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const handleVerify = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!shareCodeInput.trim()) {
      newErrors.shareCode = 'Enter the applicant’s share code';
    }

    if (!day || !month || !year) {
      newErrors.dob = 'Enter the applicant’s date of birth';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const verification = verifyShareCode(shareCodeInput.trim(), { day, month, year });
    if (!verification.success) {
      setErrors({ global: verification.error });
      setResult(null);
    } else {
      setErrors({});
      setResult(verification.record);
    }
  };

  const handleQuickFill = (codeRecord) => {
    setShareCodeInput(codeRecord.code);
    setDay(codeRecord.user?.dob?.day || '15');
    setMonth(codeRecord.user?.dob?.month || '06');
    setYear(codeRecord.user?.dob?.year || '1992');
    setErrors({});
  };

  const errorList = Object.keys(errors).map(k => ({
    field: k === 'shareCode' ? 'share-code-input' : 'dob-day',
    message: errors[k]
  }));

  return (
    <GovukLayout
      serviceName="Check an applicant’s right to work or rent"
      serviceUrl="/check-immigration-status"
      backLink="/evisa/view-evisa-get-share-code-prove-immigration-status"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl">
            Check an applicant’s immigration status
          </h1>

          <p className="govuk-body-l">
            Use this service as an employer or landlord to check an applicant’s right to work or rent in the UK using their share code.
          </p>

          {!result ? (
            <>
              {errorList.length > 0 && <ErrorSummary errors={errorList} />}

              <form onSubmit={handleVerify}>
                <div className="govuk-form-group">
                  <fieldset className="govuk-fieldset">
                    <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                      What are you checking?
                    </legend>
                    <div className="govuk-radios govuk-radios--inline">
                      <div className="govuk-radios__item">
                        <input
                          className="govuk-radios__input"
                          id="check-type-work"
                          name="checkType"
                          type="radio"
                          value="work"
                          checked={checkType === 'work'}
                          onChange={() => setCheckType('work')}
                        />
                        <label className="govuk-label govuk-radios__label" htmlFor="check-type-work">
                          Right to work
                        </label>
                      </div>
                      <div className="govuk-radios__item">
                        <input
                          className="govuk-radios__input"
                          id="check-type-rent"
                          name="checkType"
                          type="radio"
                          value="rent"
                          checked={checkType === 'rent'}
                          onChange={() => setCheckType('rent')}
                        />
                        <label className="govuk-label govuk-radios__label" htmlFor="check-type-rent">
                          Right to rent
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className={`govuk-form-group ${errors.shareCode ? 'govuk-form-group--error' : ''}`}>
                  <label className="govuk-label govuk-label--m" htmlFor="share-code-input">
                    Applicant’s share code
                  </label>
                  <div id="code-hint" className="govuk-hint">
                    For example, 9XY 4TR 2PQ (or 9 characters)
                  </div>
                  {errors.shareCode && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.shareCode}
                    </span>
                  )}
                  <input
                    className={`govuk-input govuk-input--width-20 ${errors.shareCode ? 'govuk-input--error' : ''}`}
                    id="share-code-input"
                    type="text"
                    value={shareCodeInput}
                    onChange={(e) => {
                      setShareCodeInput(e.target.value);
                      if (errors.shareCode) setErrors(prev => ({ ...prev, shareCode: null }));
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className={`govuk-form-group ${errors.dob ? 'govuk-form-group--error' : ''}`}>
                  <fieldset className="govuk-fieldset" role="group" aria-describedby="dob-hint">
                    <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                      Applicant’s date of birth
                    </legend>
                    <div id="dob-hint" className="govuk-hint">
                      For example, 15 6 1992
                    </div>
                    {errors.dob && (
                      <span className="govuk-error-message">
                        <span className="govuk-visually-hidden">Error:</span> {errors.dob}
                      </span>
                    )}
                    <div className="govuk-date-input">
                      <div className="govuk-date-input__item">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dob-day">
                          Day
                        </label>
                        <input
                          className={`govuk-input govuk-date-input__input govuk-input--width-2 ${errors.dob ? 'govuk-input--error' : ''}`}
                          id="dob-day"
                          type="text"
                          inputMode="numeric"
                          maxLength="2"
                          value={day}
                          onChange={(e) => {
                            setDay(e.target.value);
                            if (errors.dob) setErrors(prev => ({ ...prev, dob: null }));
                          }}
                        />
                      </div>
                      <div className="govuk-date-input__item">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dob-month">
                          Month
                        </label>
                        <input
                          className={`govuk-input govuk-date-input__input govuk-input--width-2 ${errors.dob ? 'govuk-input--error' : ''}`}
                          id="dob-month"
                          type="text"
                          inputMode="numeric"
                          maxLength="2"
                          value={month}
                          onChange={(e) => {
                            setMonth(e.target.value);
                            if (errors.dob) setErrors(prev => ({ ...prev, dob: null }));
                          }}
                        />
                      </div>
                      <div className="govuk-date-input__item">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dob-year">
                          Year
                        </label>
                        <input
                          className={`govuk-input govuk-date-input__input govuk-input--width-4 ${errors.dob ? 'govuk-input--error' : ''}`}
                          id="dob-year"
                          type="text"
                          inputMode="numeric"
                          maxLength="4"
                          value={year}
                          onChange={(e) => {
                            setYear(e.target.value);
                            if (errors.dob) setErrors(prev => ({ ...prev, dob: null }));
                          }}
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>

                <button type="submit" className="govuk-button">
                  Check status
                </button>
              </form>

              {/* Sample Code Helper */}
              {shareCodes.length > 0 && (
                <div className="quick-fill-box" style={{ marginTop: '30px' }}>
                  <h3 className="govuk-heading-s" style={{ margin: '0 0 10px 0', color: '#1d70b8' }}>
                    Quick fill test share codes:
                  </h3>
                  <p className="govuk-hint" style={{ marginBottom: '10px' }}>
                    Click any generated code below to auto-fill the form:
                  </p>
                  <ul className="govuk-list" style={{ margin: 0 }}>
                    {shareCodes.map((sc, idx) => (
                      <li key={idx} style={{ marginBottom: '8px' }}>
                        <button
                          type="button"
                          className="govuk-link"
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px 0',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '14px'
                          }}
                          onClick={() => handleQuickFill(sc)}
                        >
                          <strong>{sc.code}</strong> — {sc.user?.fullName} (DOB: {sc.user?.dob?.day}/{sc.user?.dob?.month}/{sc.user?.dob?.year})
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            /* Result Certificate */
            <div>
              <NotificationBanner title="Check result" success>
                <h3 className="govuk-heading-m" style={{ margin: 0 }}>
                  Applicant has a valid right to {checkType === 'work' ? 'work in the UK' : 'rent property in England'}
                </h3>
              </NotificationBanner>

              <div className="status-card">
                <div className="status-card__header" style={{ paddingBottom: '14px', marginBottom: '14px' }}>
                  <div style={{ width: '100%' }}>
                    <span className="govuk-tag govuk-tag--green" style={{ marginBottom: '8px' }}>
                      Verified Status
                    </span>
                    <h2 className="govuk-heading-m" style={{ margin: '4px 0 6px 0' }}>
                      {result.user?.fullName}
                    </h2>
                    <p className="govuk-body-s" style={{ color: '#505a5f', margin: 0 }}>
                      Check reference code: <strong>{result.code}</strong> &bull; Checked on: <strong>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                    </p>
                  </div>
                </div>

                <dl className="govuk-summary-list">
                  {result.user?.documentNumber && (
                    <div className="govuk-summary-list__row" style={{ backgroundColor: '#f0f6fb', borderLeft: '4px solid var(--govuk-brand-colour)', paddingLeft: '8px' }}>
                      <dt className="govuk-summary-list__key" style={{ fontWeight: '700', color: '#0b0c0c' }}>
                        Passport / Document number
                      </dt>
                      <dd className="govuk-summary-list__value">
                        <strong style={{ fontSize: '16px', letterSpacing: '0.8px', color: '#0b0c0c' }}>
                          {result.user?.documentNumber}
                        </strong>{' '}
                        {result.user?.documentType && (
                          <span className="govuk-tag govuk-tag--blue" style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
                            {result.user?.documentType.toUpperCase()}
                          </span>
                        )}
                      </dd>
                    </div>
                  )}
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">Immigration status</dt>
                    <dd className="govuk-summary-list__value">{result.user?.statusType}</dd>
                  </div>
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">Date of birth</dt>
                    <dd className="govuk-summary-list__value">
                      {result.user?.dob?.day} / {result.user?.dob?.month} / {result.user?.dob?.year}
                    </dd>
                  </div>
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">Nationality</dt>
                    <dd className="govuk-summary-list__value">{result.user?.nationality}</dd>
                  </div>
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">Expiry date</dt>
                    <dd className="govuk-summary-list__value">{result.user?.validUntil}</dd>
                  </div>
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">Conditions</dt>
                    <dd className="govuk-summary-list__value">
                      {checkType === 'work' ? result.user?.workRights : result.user?.rentRights}
                    </dd>
                  </div>
                </dl>
              </div>

              <InsetText>
                <strong>Statutory Excuse:</strong> You must keep a copy of this result (electronically or in hardcopy) for the duration of the applicant’s employment/tenancy plus 2 years to maintain a statutory excuse against illegal working/renting civil penalties.
              </InsetText>

              <div className="govuk-button-group no-print">
                <button
                  type="button"
                  className="govuk-button"
                  onClick={() => window.print()}
                >
                  Print or save PDF certificate
                </button>
                <button
                  type="button"
                  className="govuk-button govuk-button--secondary"
                  onClick={() => {
                    setResult(null);
                    setShareCodeInput('');
                  }}
                >
                  Perform another check
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="govuk-grid-column-one-third no-print">
          <div className="gem-c-contextual-sidebar">
            <h2 className="govuk-heading-s">Guidance for checkers</h2>
            <ul className="govuk-list">
              <li>
                <Link to="/evisa" className="govuk-link">
                  How eVisas work
                </Link>
              </li>
              <li>
                <Link to="/evisa/view-evisa-get-share-code-prove-immigration-status" className="govuk-link">
                  Applicant share code guide
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GovukLayout>
  );
}
