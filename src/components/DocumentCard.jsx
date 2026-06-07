import React from 'react';

export default function DocumentCard({ doc }) {
  return (
    <article className="document-card" id={`doc-card-${doc.id}`}>
      <div className="document-card-image">
        <img src={doc.image} alt={doc.title} loading="lazy" />
      </div>
      <div className="document-card-content">
        <div className="document-card-tags">
          {doc.tags.map((tag, i) => (
            <span key={i} className={`doc-tag ${tag.type}`}>{tag.label}</span>
          ))}
        </div>
        <h3 className="document-card-title">{doc.title}</h3>
        <p className="document-card-desc">{doc.description}</p>
        <div className="document-card-bottom">
          <div className="document-card-meta">
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{opacity:0.5}}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {doc.agency}
            </span>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{opacity:0.5}}>
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
              {doc.pages}
            </span>
          </div>
          <div className="document-card-actions">
            <button className="btn-view-details">View Details</button>
            <button className="btn-download">
              Download
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
