import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="govuk-breadcrumbs">
      <ol className="govuk-breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className="govuk-breadcrumbs__list-item" key={index}>
              {isLast || !item.url ? (
                <span aria-current="page">{item.title}</span>
              ) : (
                <Link className="govuk-breadcrumbs__link" to={item.url}>
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
