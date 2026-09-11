import React from 'react';
import { Link } from 'react-router-dom';

export default function StartButton({ to, href, children = 'Start now', className = '' }) {
  const content = (
    <>
      <span>{children}</span>
      <svg
        className="govuk-button__start-icon govuk-!-display-none-print"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        focusable="false"
        aria-hidden="true"
      >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"></path>
      </svg>
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        role="button"
        draggable="false"
        className={`govuk-button govuk-button--start ${className}`}
        data-module="govuk-button"
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href || '#'}
      role="button"
      draggable="false"
      className={`govuk-button govuk-button--start ${className}`}
      data-module="govuk-button"
    >
      {content}
    </a>
  );
}
