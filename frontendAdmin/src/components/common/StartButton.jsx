import React from 'react';
import { Link } from 'react-router-dom';

export default function StartButton({ to, onClick, children = 'Start now', className = '', ...props }) {
  const content = (
    <>
      {children}
      <svg
        className="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
      >
        <path d="M0 0h13l20 20-20 20H0l20-20z" />
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
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`govuk-button govuk-button--start ${className}`}
      data-module="govuk-button"
      {...props}
    >
      {content}
    </button>
  );
}
