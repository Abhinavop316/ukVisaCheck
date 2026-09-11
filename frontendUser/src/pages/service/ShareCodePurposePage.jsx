import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import { useAuth } from '../../context/AuthContext';
import { ErrorSummary } from '../../components/common/GdsElements';

export default function ShareCodePurposePage() {
  const [purpose, setPurpose] = useState('work');
  const [error, setError] = useState('');
  const { generateNewShareCode } = useAuth();
  const navigate = useNavigate();

  const purposes = [
    {
      id: 'work',
      title: 'To prove my right to work in the UK',
      hint: 'Your employer will see details about your permission to work, including any limits on hours or job types.'
    },
    {
      id: 'rent',
      title: 'To prove my right to rent in England',
      hint: 'Your landlord or letting agent will see details about your permission to rent property in England.'
    },
    {
      id: 'other',
      title: 'For something else',
      hint: 'For example, opening a bank account, claiming benefits, or council tax checks.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!purpose) {
      setError('Select why you need a share code');
      return;
    }

    const selectedObj = purposes.find(p => p.id === purpose);
    const newRecord = generateNewShareCode(purpose, selectedObj.title);
    navigate(`/service/share-code-result?code=${encodeURIComponent(newRecord.code)}&purpose=${purpose}`);
  };

  return (
    <GovukLayout
      serviceName="View and prove your immigration status"
      serviceUrl="/status"
      backLink="/service/status-profile"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {error && <ErrorSummary errors={[{ field: 'purpose-radios', message: error }]} />}

          <form onSubmit={handleSubmit}>
            <div className={`govuk-form-group ${error ? 'govuk-form-group--error' : ''}`}>
              <fieldset className="govuk-fieldset" aria-describedby="purpose-hint">
                <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                  <h1 className="govuk-heading-l">
                    Why do you need a share code?
                  </h1>
                </legend>
                <div id="purpose-hint" className="govuk-hint">
                  The person or organisation you give the share code to will only see the information relevant to your selected purpose.
                </div>

                {error && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {error}
                  </span>
                )}

                <div className="govuk-radios" id="purpose-radios">
                  {purposes.map((item) => (
                    <div className="govuk-radios__item" key={item.id}>
                      <input
                        className="govuk-radios__input"
                        id={`purpose-${item.id}`}
                        name="shareCodePurpose"
                        type="radio"
                        value={item.id}
                        checked={purpose === item.id}
                        onChange={() => {
                          setPurpose(item.id);
                          setError('');
                        }}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor={`purpose-${item.id}`}>
                        <strong>{item.title}</strong>
                        <span className="govuk-hint" style={{ fontSize: '15px', marginBottom: 0 }}>
                          {item.hint}
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
