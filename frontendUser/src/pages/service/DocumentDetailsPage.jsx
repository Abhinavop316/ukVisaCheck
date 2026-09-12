import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import { useAuth } from '../../context/AuthContext';
import { ErrorSummary, Details } from '../../components/common/GdsElements';
import { getClientByQuery, sendSecurityCode } from '../../api/client.api';

export default function DocumentDetailsPage() {
  const { currentUser, signInFormData, setSignInFormData } = useAuth();
  const [docNumber, setDocNumber] = useState(signInFormData.documentNumber || currentUser?.documentNumber || '');
  const [day, setDay] = useState(signInFormData.dobDay || currentUser?.dob?.day || '');
  const [month, setMonth] = useState(signInFormData.dobMonth || currentUser?.dob?.month || '');
  const [year, setYear] = useState(signInFormData.dobYear || currentUser?.dob?.year || '');
  const [errors, setErrors] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  const getDocName = () => {
    switch (signInFormData.documentType) {
      case 'national-id': return 'national identity card';
      case 'brp': return 'biometric residence permit (BRP) or card (BRC)';
      case 'ukvi-number': return 'UKVI customer number';
      default: return 'passport';
    }
  };

  const getDocHint = () => {
    switch (signInFormData.documentType) {
      case 'national-id': return 'For example, 12345678A';
      case 'brp': return 'For example, RF1234567';
      case 'ukvi-number': return 'For example, 1234-5678-9012-3456';
      default: return 'For example, 123456789 or P12345678';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!docNumber.trim()) {
      newErrors.docNumber = `Enter your ${getDocName()} number`;
    }

    if (!day || !month || !year) {
      newErrors.dob = 'Enter your date of birth including day, month, and 4-digit year';
    } else if (
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      Number(day) < 1 ||
      Number(day) > 31 ||
      Number(month) < 1 ||
      Number(month) > 12 ||
      Number(year) < 1900 ||
      Number(year) > 2026
    ) {
      newErrors.dob = 'Enter a valid date of birth';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const cleanDoc = docNumber.trim().toUpperCase();

    setIsChecking(true);
    setErrors({});

    try {
      const client = await getClientByQuery({
        PassportNumber: cleanDoc,
        identNum: cleanDoc,
      });

      if (!client || (!client.FullName && !client.PassportNumber)) {
        setIsChecking(false);
        setErrors({
          docNumber: 'No application record found with this passport number in the UKVI database.',
        });
        return;
      }

      // Verify Date of Birth match if available in client record
      if (client.DOB) {
        const parts = client.DOB.split('T')[0].split('-');
        if (parts.length === 3) {
          const [dbYear, dbMonth, dbDay] = parts;
          if (
            String(Number(year)) !== String(Number(dbYear)) ||
            String(Number(month)) !== String(Number(dbMonth)) ||
            String(Number(day)) !== String(Number(dbDay))
          ) {
            setIsChecking(false);
            setErrors({
              dob: 'The date of birth entered does not match our records for this passport number.',
            });
            return;
          }
        }
      }

      // Send 6-digit security code to applicant's email using Resend
      const sendRes = await sendSecurityCode(cleanDoc);

      setIsChecking(false);
      setSignInFormData((prev) => ({
        ...prev,
        documentNumber: docNumber.trim(),
        dobDay: day.trim().padStart(2, '0'),
        dobMonth: month.trim().padStart(2, '0'),
        dobYear: year.trim(),
        maskedEmail: sendRes.maskedEmail || client.Email || '',
      }));

      navigate('/service/security-code');
    } catch (err) {
      setIsChecking(false);
      setErrors({
        global: err.message || 'Could not verify application record. Please try again.',
      });
    }
  };

  const errorList = Object.keys(errors).map((key) => ({
    field: key === 'docNumber' ? 'document-number' : key === 'global' ? 'document-number' : 'dob-day',
    message: errors[key],
  }));

  return (
    <GovukLayout
      serviceName="View and prove your immigration status"
      serviceUrl="/status"
      backLink="/service/sign-in-document"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {errorList.length > 0 && <ErrorSummary errors={errorList} />}

          <h1 className="govuk-heading-l">
            Enter your {getDocName()} details
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* Document Number Field */}
            <div className={`govuk-form-group ${errors.docNumber ? 'govuk-form-group--error' : ''}`}>
              <label className="govuk-label govuk-label--s" htmlFor="document-number">
                {getDocName().charAt(0).toUpperCase() + getDocName().slice(1)} number
              </label>
              <div id="doc-number-hint" className="govuk-hint">
                {getDocHint()}
              </div>

              {errors.docNumber && (
                <span className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> {errors.docNumber}
                </span>
              )}

              <input
                className={`govuk-input govuk-input--width-20 ${errors.docNumber ? 'govuk-input--error' : ''}`}
                id="document-number"
                name="documentNumber"
                type="text"
                value={docNumber}
                onChange={(e) => {
                  setDocNumber(e.target.value);
                  if (errors.docNumber || errors.global) {
                    setErrors((prev) => ({ ...prev, docNumber: null, global: null }));
                  }
                }}
                autoComplete="off"
              />
            </div>

            {/* Date of Birth Field */}
            <div className={`govuk-form-group ${errors.dob ? 'govuk-form-group--error' : ''}`}>
              <fieldset className="govuk-fieldset" role="group" aria-describedby="dob-hint">
                <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
                  Your date of birth
                </legend>
                <div id="dob-hint" className="govuk-hint">
                  For example, 27 3 1995
                </div>

                {errors.dob && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {errors.dob}
                  </span>
                )}

                <div className="govuk-date-input" id="dob">
                  <div className="govuk-date-input__item">
                    <div className="govuk-form-group">
                      <label className="govuk-label govuk-date-input__label" htmlFor="dob-day">
                        Day
                      </label>
                      <input
                        className={`govuk-input govuk-date-input__input govuk-input--width-2 ${errors.dob ? 'govuk-input--error' : ''}`}
                        id="dob-day"
                        name="dobDay"
                        type="text"
                        inputMode="numeric"
                        maxLength="2"
                        value={day}
                        onChange={(e) => {
                          setDay(e.target.value);
                          if (errors.dob || errors.global) {
                            setErrors((prev) => ({ ...prev, dob: null, global: null }));
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="govuk-date-input__item">
                    <div className="govuk-form-group">
                      <label className="govuk-label govuk-date-input__label" htmlFor="dob-month">
                        Month
                      </label>
                      <input
                        className={`govuk-input govuk-date-input__input govuk-input--width-2 ${errors.dob ? 'govuk-input--error' : ''}`}
                        id="dob-month"
                        name="dobMonth"
                        type="text"
                        inputMode="numeric"
                        maxLength="2"
                        value={month}
                        onChange={(e) => {
                          setMonth(e.target.value);
                          if (errors.dob || errors.global) {
                            setErrors((prev) => ({ ...prev, dob: null, global: null }));
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="govuk-date-input__item">
                    <div className="govuk-form-group">
                      <label className="govuk-label govuk-date-input__label" htmlFor="dob-year">
                        Year
                      </label>
                      <input
                        className={`govuk-input govuk-date-input__input govuk-input--width-4 ${errors.dob ? 'govuk-input--error' : ''}`}
                        id="dob-year"
                        name="dobYear"
                        type="text"
                        inputMode="numeric"
                        maxLength="4"
                        value={year}
                        onChange={(e) => {
                          setYear(e.target.value);
                          if (errors.dob || errors.global) {
                            setErrors((prev) => ({ ...prev, dob: null, global: null }));
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <button type="submit" className="govuk-button" disabled={isChecking}>
              {isChecking ? 'Checking UKVI Database...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </GovukLayout>
  );
}
