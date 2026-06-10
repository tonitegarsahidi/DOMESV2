import React, { useState } from 'react';

export default function FAQContent() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is DOMES?",
      answer: "DOMES (Document Management System) is a centralized platform used by United Nations agencies in Indonesia to store, manage, and share official documents, reports, and data securely."
    },
    {
      question: "Who can access the documents on DOMES?",
      answer: "Access to documents depends on their confidentiality level. Public documents are accessible to everyone, while internal or restricted documents require authenticated access by authorized UN personnel."
    },
    {
      question: "How do I upload a new document?",
      answer: "Authorized users can upload documents by logging into the system, navigating to the 'Documents' section, and clicking the 'New Submission' button to follow the document upload wizard."
    },
    {
      question: "Can I search for specific keywords inside documents?",
      answer: "Yes, our advanced search functionality allows you to search not only by title and metadata but also within the full text of supported document formats (like PDF and Word)."
    },
    {
      question: "How do I reset my password?",
      answer: "If you have forgotten your password, click on the 'Login' button at the top right, and then select 'Forgot Password' to receive a reset link via your registered email address."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ color: '#3366cc', fontWeight: '600', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Support & Help</span>
        <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#1e293b', marginTop: '16px', marginBottom: '24px', lineHeight: 1.2 }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: '#475569', fontSize: '18px', lineHeight: 1.6 }}>
          Find answers to common questions about using the Document Management System (DOMES).
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            style={{ 
              background: '#ffffff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              transition: 'all 0.3s ease'
            }}
          >
            <button 
              onClick={() => toggleAccordion(index)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '18px',
                fontWeight: '600',
                color: activeIndex === index ? '#3366cc' : '#334155',
              }}
            >
              <span>{faq.question}</span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ 
                  transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  color: activeIndex === index ? '#3366cc' : '#94a3b8'
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            <div 
              style={{
                maxHeight: activeIndex === index ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out',
              }}
            >
              <div style={{ padding: '0 24px 24px 24px', color: '#475569', fontSize: '16px', lineHeight: 1.6 }}>
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '60px', padding: '40px', background: '#f8fafc', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>Still have questions?</h3>
        <p style={{ color: '#475569', marginBottom: '24px' }}>Our support team is ready to help you with any issues.</p>
        <button style={{ 
          background: '#3366cc', 
          color: 'white', 
          border: 'none', 
          padding: '12px 28px', 
          borderRadius: '8px', 
          fontSize: '16px', 
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 6px -1px rgba(51, 102, 204, 0.2)'
        }}>
          Contact Support
        </button>
      </div>
    </div>
  );
}
