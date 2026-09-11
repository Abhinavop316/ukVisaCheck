import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import GovukLayout from '../components/layout/GovukLayout';
import { guideSteps } from '../data/guideData';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const matchedSteps = guideSteps.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) || 
    s.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <GovukLayout breadcrumbs={[{ title: 'Home', url: '/' }, { title: 'Search results' }]}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl">Search results</h1>
          <p className="govuk-body-l">
            Results for: <strong>"{query}"</strong>
          </p>

          {matchedSteps.length > 0 ? (
            <ul className="govuk-list govuk-list--spaced" style={{ marginTop: '30px' }}>
              {matchedSteps.map(step => (
                <li key={step.id} style={{ borderBottom: '1px solid #b1b4b6', paddingBottom: '15px' }}>
                  <h2 className="govuk-heading-m" style={{ margin: '0 0 5px 0' }}>
                    <Link to={step.path} className="govuk-link">
                      {step.title}
                    </Link>
                  </h2>
                  <p className="govuk-body" style={{ margin: 0, color: '#505a5f' }}>
                    {step.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p className="govuk-body">There are no exact results matching your query.</p>
              <h2 className="govuk-heading-m">Suggestions:</h2>
              <ul className="govuk-list govuk-list--bullet">
                <li>Check your spelling</li>
                <li>Try broader search terms such as "eVisa", "share code", or "UKVI account"</li>
                <li><Link to="/evisa/view-evisa-get-share-code-prove-immigration-status">Go directly to View eVisa and get a share code</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </GovukLayout>
  );
}
