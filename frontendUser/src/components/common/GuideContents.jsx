import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { guideSteps } from '../../data/guideData';

export default function GuideContents() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="gem-c-contents-list" role="complementary">
      <h2 className="gem-c-contents-list__title">Contents</h2>
      <ol className="gem-c-contents-list__list">
        {guideSteps.map((step) => {
          const isActive = 
            currentPath === step.path || 
            (step.path === '/evisa' && (currentPath === '/evisa' || currentPath === '/evisa/overview'));

          return (
            <li
              key={step.id}
              className={`gem-c-contents-list__list-item ${
                isActive ? 'gem-c-contents-list__list-item--active' : ''
              }`}
            >
              <span className="gem-c-contents-list__list-item-dash">—</span>
              {isActive ? (
                <span>{step.title}</span>
              ) : (
                <Link to={step.path} className="govuk-link">
                  {step.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
