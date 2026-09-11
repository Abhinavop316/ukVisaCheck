import React from 'react';
import { Link } from 'react-router-dom';

export default function PhaseBanner({ phase = 'BETA', feedbackUrl = '/feedback' }) {
  return (
    <div className="govuk-phase-banner">
      <div className="govuk-phase-banner__content">
        <strong className="govuk-tag govuk-phase-banner__content__tag">
          {phase}
        </strong>
        <span className="govuk-phase-banner__text">
          This is a new service – your <Link className="govuk-link" to={feedbackUrl}>feedback</Link> will help us to improve it.
        </span>
      </div>
    </div>
  );
}
