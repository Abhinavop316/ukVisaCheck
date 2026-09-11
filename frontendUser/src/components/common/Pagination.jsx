import React from 'react';
import { Link } from 'react-router-dom';

export default function Pagination({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav className="govuk-pagination" role="navigation" aria-label="Pagination">
      {prev ? (
        <div className="govuk-pagination__item govuk-pagination__item--prev">
          <Link to={prev.path} className="govuk-pagination__link" rel="prev">
            <span className="govuk-pagination__link-label">
              <svg
                style={{ verticalAlign: 'middle', marginRight: '6px' }}
                xmlns="http://www.w3.org/2000/svg"
                height="13"
                width="15"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 15 13"
              >
                <path
                  d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"
                  fill="currentColor"
                ></path>
              </svg>
              Previous
            </span>
            <span className="govuk-pagination__link-title">{prev.title}</span>
          </Link>
        </div>
      ) : (
        <div></div>
      )}

      {next && (
        <div className="govuk-pagination__item govuk-pagination__item--next" style={{ textAlign: 'right', marginLeft: 'auto' }}>
          <Link to={next.path} className="govuk-pagination__link" rel="next">
            <span className="govuk-pagination__link-label">
              Next
              <svg
                style={{ verticalAlign: 'middle', marginLeft: '6px' }}
                xmlns="http://www.w3.org/2000/svg"
                height="13"
                width="15"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 15 13"
              >
                <path
                  d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <span className="govuk-pagination__link-title">{next.title}</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
