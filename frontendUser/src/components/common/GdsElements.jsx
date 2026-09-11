import React from 'react';

export function InsetText({ children, className = '', highlight = false }) {
  return (
    <div className={`govuk-inset-text ${highlight ? 'govuk-inset-text--highlight' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function WarningText({ children, iconText = '!' }) {
  return (
    <div className="govuk-warning-text">
      <span className="govuk-warning-text__icon" aria-hidden="true">{iconText}</span>
      <strong className="govuk-warning-text__text">
        <span className="govuk-warning-text__assistive">Warning</span>
        {children}
      </strong>
    </div>
  );
}

export function Details({ summary, children, open = false }) {
  return (
    <details className="govuk-details" data-module="govuk-details" open={open}>
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summary}</span>
      </summary>
      <div className="govuk-details__text">
        {children}
      </div>
    </details>
  );
}

export function NotificationBanner({ title = 'Important', success = false, children }) {
  return (
    <div
      className={`govuk-notification-banner ${success ? 'govuk-notification-banner--success' : ''}`}
      role="region"
      aria-labelledby="govuk-notification-banner-title"
      data-module="govuk-notification-banner"
    >
      <div className="govuk-notification-banner__header">
        <h2 className="govuk-notification-banner__title" id="govuk-notification-banner-title">
          {title}
        </h2>
      </div>
      <div className="govuk-notification-banner__content">
        {children}
      </div>
    </div>
  );
}

export function ErrorSummary({ errors = [] }) {
  if (!errors || errors.length === 0) return null;

  return (
    <div
      className="govuk-error-summary"
      aria-labelledby="error-summary-title"
      role="alert"
      tabIndex="-1"
      data-module="govuk-error-summary"
    >
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        There is a problem
      </h2>
      <div className="govuk-error-summary__body">
        <ul className="govuk-list govuk-error-summary__list">
          {errors.map((error, idx) => (
            <li key={idx}>
              <a href={`#${error.field || 'input-field'}`}>{error.message}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
