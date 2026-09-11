import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import { useAuth } from '../../context/AuthContext';
import { ErrorSummary } from '../../components/common/GdsElements';

export default function SignInDocumentPage() {
  const { currentUser, signInFormData, setSignInFormData } = useAuth();
  const [selectedDoc, setSelectedDoc] = useState(signInFormData.documentType || currentUser?.documentType || 'passport');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    if (!selectedDoc) {
      setError('Select which identity document you want to use to sign in');
      return;
    }

    setSignInFormData(prev => ({
      ...prev,
      documentType: selectedDoc
    }));

    navigate('/service/document-details');
  };

  const options = [
    { id: 'passport', label: 'Passport', hint: 'The passport currently linked to your UKVI account' },
    { id: 'national-id', label: 'National identity card', hint: 'An EU, EEA or Swiss national identity card' },
    { id: 'brp', label: 'Biometric residence permit (BRP) or card (BRC)', hint: 'Even if your physical permit or card has expired' },
    { id: 'ukvi-number', label: 'UKVI customer number', hint: 'Your 16-digit unique customer reference' }
  ];

  return (
    <GovukLayout
      serviceName="View and prove your immigration status"
      serviceUrl="/status"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {error && <ErrorSummary errors={[{ field: 'document-radios', message: error }]} />}

          <form onSubmit={handleContinue}>
            <div className={`govuk-form-group ${error ? 'govuk-form-group--error' : ''}`}>
              <fieldset className="govuk-fieldset" aria-describedby="document-hint">
                <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                  <h1 className="govuk-heading-l" style={{ marginBottom: '10px' }}>
                    What identity document do you use to sign in?
                  </h1>
                </legend>
                <div id="document-hint" className="govuk-hint">
                  Select the identity document you used when applying or linking your UKVI account.
                </div>

                {error && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {error}
                  </span>
                )}

                <div className="govuk-radios" id="document-radios">
                  {options.map((option) => (
                    <div className="govuk-radios__item" key={option.id}>
                      <input
                        className="govuk-radios__input"
                        id={`doc-${option.id}`}
                        name="identityDocument"
                        type="radio"
                        value={option.id}
                        checked={selectedDoc === option.id}
                        onChange={() => {
                          setSelectedDoc(option.id);
                          setError('');
                        }}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor={`doc-${option.id}`}>
                        <strong>{option.label}</strong>
                        <span className="govuk-hint" style={{ fontSize: '15px', marginBottom: 0 }}>
                          {option.hint}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <button type="submit" className="govuk-button">
              Continue
            </button>
          </form>
        </div>
      </div>
    </GovukLayout>
  );
}
