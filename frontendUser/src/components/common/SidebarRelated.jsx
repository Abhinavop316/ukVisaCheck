import React from 'react';
import { Link } from 'react-router-dom';
import { relatedLinks, exploreTopicLinks } from '../../data/guideData';

export default function SidebarRelated() {
  return (
    <div className="gem-c-contextual-sidebar">
      <div className="gem-c-related-navigation">
        <h2 className="gem-c-related-navigation__main-heading">Related content</h2>
        <nav role="navigation" aria-label="Related content">
          <ul className="govuk-list">
            {relatedLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.url} className="govuk-link gem-c-related-navigation__section-link">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <h2 className="gem-c-related-navigation__main-heading" style={{ marginTop: '30px' }}>
          Explore the topic
        </h2>
        <nav role="navigation" aria-label="Explore the topic">
          <ul className="govuk-list">
            {exploreTopicLinks.map((topic, idx) => (
              <li key={idx}>
                <Link to={topic.url} className="govuk-link gem-c-related-navigation__section-link">
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f3f2f1', borderLeft: '4px solid #1d70b8' }}>
          <h3 className="govuk-heading-s" style={{ margin: '0 0 8px 0' }}>Need help?</h3>
          <p className="govuk-body-s" style={{ margin: 0 }}>
            If you need assistance accessing your eVisa or creating a share code, you can{' '}
            <Link to="/contact" className="govuk-link">contact UKVI support</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
