import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQSection({ faqs, lang }) {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" style={{ padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
            {lang === 'en' ? 'Frequently Asked Questions' : 'សំណួរដែលសួរញឹកញាប់'}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {lang === 'en' 
              ? 'Got questions about installation, activation, or security? We have answers.'
              : 'មានសំណួរទាក់ទងនឹងការតំឡើង ការ Activate ឬសុវត្ថិភាពមែនទេ? យើងមានចម្លើយជូន។'
            }
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const questionText = lang === 'en' ? faq.question : (faq.questionKh || faq.question);
            const answerText = lang === 'en' ? faq.answer : (faq.answerKh || faq.answer);

            return (
              <div
                key={faq.id}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'border-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = isOpen ? 'var(--accent-color)' : 'var(--border-color)'}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    color: isOpen ? 'var(--accent-color)' : 'var(--text-primary)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HelpCircle size={18} style={{ flexShrink: 0, color: isOpen ? 'var(--accent-color)' : 'var(--text-muted)' }} />
                    {questionText}
                  </span>
                  {isOpen 
                    ? <ChevronUp size={18} style={{ flexShrink: 0 }} /> 
                    : <ChevronDown size={18} style={{ flexShrink: 0 }} />
                  }
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div 
                    style={{
                      padding: '0 24px 20px 54px',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      animation: 'fadeIn 0.3s ease-out'
                    }}
                  >
                    {answerText}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
