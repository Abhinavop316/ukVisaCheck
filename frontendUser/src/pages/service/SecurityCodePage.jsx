import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import { useAuth } from '../../context/AuthContext';
import { ErrorSummary, NotificationBanner } from '../../components/common/GdsElements';
import { sendSecurityCode } from '../../api/client.api';

export default function SecurityCodePage() {
  const { currentUser, signInFormData, setSignInFormData, signIn } = useAuth();
  const [code, setCode] = useState('');
  const [resentNotification, setResentNotification] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    // If user is already authenticated with this document
    if (currentUser && (currentUser.documentNumber || '').trim().toUpperCase() === (signInFormData.documentNumber || '').trim().toUpperCase()) {
      navigate('/service/status-profile');
      return;
    }

    if (!code.trim() || code.trim().length < 6) {
      setError('Enter the 6-digit security code sent to your email');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Authenticate
    const dob = {
      day: signInFormData.dobDay,
      month: signInFormData.dobMonth,
      year: signInFormData.dobYear,
    };

    const res = await signIn(
      signInFormData.documentType,
      signInFormData.documentNumber,
      dob,
      code.trim()
    );
    setIsVerifying(false);

    if (!res || !res.success) {
      setError(res?.error || 'The 6-digit security code entered is incorrect or has expired.');
      return;
    }

    navigate('/service/status-profile');
  };

  const handleResend = async () => {
    if (isResending) return;
    setIsResending(true);
    setError('');

    try {
      await sendSecurityCode(signInFormData.documentNumber);
      setResentNotification(true);
      setTimeout(() => setResentNotification(false), 6000);
    } catch (err) {
      setError(err.message || 'Failed to resend security code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <GovukLayout
      serviceName="View and prove your immigration status"
      serviceUrl="/status"
      backLink="/service/document-details"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {currentUser && (
            <div
              style={{
                border: '3px solid #00703c',
                padding: '16px 20px',
                marginBottom: '25px',
                backgroundColor: '#f3f2f1'
              }}
            >
              <h2 className="govuk-heading-s" style={{ margin: '0 0 8px 0', color: '#00703c' }}>
                Active Verification Session
              </h2>
              <p className="govuk-body" style={{ margin: '0 0 12px 0' }}>
                You have already verified your account as <strong>{currentUser.fullName}</strong> ({currentUser.documentNumber}).
              </p>
              <button
                type="button"
                onClick={() => navigate('/service/status-profile')}
                className="govuk-button"
                style={{ margin: 0 }}
              >
                Go directly to status profile
              </button>
            </div>
          )}

          {resentNotification && (
            <NotificationBanner title="Success" success>
              A new 6-digit security code has been sent to your email address.
            </NotificationBanner>
          )}

          {error && <ErrorSummary errors={[{ field: 'security-code', message: error }]} />}

          <form onSubmit={handleVerify}>
            <span className="govuk-caption-l">Security check</span>
            <h1 className="govuk-heading-l" style={{ marginTop: '5px' }}>
              Check your email
            </h1>

            <div className="govuk-inset-text" style={{ fontSize: '17px' }}>
              We sent a 6-digit security code to your email address{' '}
              <strong>{signInFormData.maskedEmail ? `(${signInFormData.maskedEmail})` : 'linked to your UKVI account'}</strong>.
            </div>

            <p className="govuk-body">
              It may take a few minutes to arrive. If you do not see it in your inbox, please check your spam or junk folder.
            </p>

            <div className={`govuk-form-group ${error ? 'govuk-form-group--error' : ''}`} style={{ marginTop: '25px' }}>
              <label className="govuk-label govuk-label--s" htmlFor="security-code">
                Enter your 6-digit security code
              </label>
              <div id="code-hint" className="govuk-hint">
                For example, 482910
              </div>

              {error && (
                <span className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> {error}
                </span>
              )}

              <input
                className={`govuk-input govuk-input--width-10 ${error ? 'govuk-input--error' : ''}`}
                id="security-code"
                name="securityCode"
                type="text"
                inputMode="numeric"
                maxLength="6"
                style={{ fontSize: '24px', letterSpacing: '4px', fontWeight: 'bold' }}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.replace(/[^0-9]/g, ''));
                  if (error) setError('');
                }}
                autoFocus
              />
            </div>

            <div className="govuk-button-group" style={{ marginTop: '30px', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button type="submit" className="govuk-button" style={{ margin: 0 }} disabled={isVerifying}>
                {isVerifying ? 'Verifying...' : 'Continue'}
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="govuk-button govuk-button--secondary"
                style={{ margin: 0 }}
              >
                {isResending ? 'Sending...' : 'Resend Email'}
              </button>
            </div>

            <div style={{ marginTop: '35px', borderTop: '1px solid #bfc1c3', paddingTop: '20px' }}>
              <h2 className="govuk-heading-m" style={{ fontSize: '19px', marginBottom: '10px' }}>
                Didn't receive the email?
              </h2>
              <p className="govuk-body" style={{ marginBottom: '15px' }}>
                Check your spam or junk folder. If you still cannot find it, you can request a new code.
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="govuk-button govuk-button--secondary"
                style={{ marginBottom: '10px' }}
              >
                {isResending ? 'Sending new code...' : 'Resend security code to your email'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </GovukLayout>
  );
}


