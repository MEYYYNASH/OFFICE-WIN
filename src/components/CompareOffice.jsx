import { Check, X, Award } from 'lucide-react';

export default function CompareOffice({ settings, lang }) {
  const comparison = settings?.officeComparison || { versions: [], features: [] };
  const { versions, features } = comparison;

  return (
    <section id="compare-section" style={{ padding: '40px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
            {lang === 'en' ? 'Compare Microsoft Office Versions' : 'ប្រៀបធៀបកំណែ Microsoft Office'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            {lang === 'en' 
              ? 'Find the perfect fit for your workflow. Here is a direct feature breakdown of standard Office suites.'
              : 'ស្វែងរកកំណែដែលស័ក្តិសមបំផុតសម្រាប់អ្នក។ ខាងក្រោមនេះជាតារាងប្រៀបធៀបលក្ខណៈពិសេសរវាងកម្មវិធីនីមួយៗ។'
            }
          </p>
        </div>

        {/* Responsive Table Wrapper */}
        <div 
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            overflowX: 'auto',
            padding: '24px'
          }}
        >
          <table 
            style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              textAlign: 'left',
              minWidth: '600px'
            }}
          >
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '16px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {lang === 'en' ? 'Core Features' : 'លក្ខណៈពិសេស'}
                </th>
                {versions.map((ver, idx) => (
                  <th 
                    key={idx} 
                    style={{ 
                      padding: '16px', 
                      fontSize: '1rem', 
                      fontWeight: 700, 
                      textAlign: 'center',
                      color: ver === 'Office 2024' ? 'var(--accent-color)' : 'var(--text-primary)'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      {ver === 'Office 2024' && (
                        <span 
                          style={{ 
                            fontSize: '0.65rem', 
                            backgroundColor: 'var(--accent-light)', 
                            color: 'var(--accent-color)', 
                            padding: '2px 8px', 
                            borderRadius: '999px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          {lang === 'en' ? 'Recommended' : 'ណែនាំ'}
                        </span>
                      )}
                      <span>{ver}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, featureIdx) => (
                <tr 
                  key={featureIdx} 
                  style={{ 
                    borderBottom: '1px solid var(--border-color)',
                    backgroundColor: featureIdx % 2 === 1 ? 'var(--bg-tertiary)' : 'transparent',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = featureIdx % 2 === 1 ? 'var(--bg-tertiary)' : 'transparent'}
                >
                  {/* Feature Name */}
                  <td style={{ padding: '16px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {feature.name}
                  </td>
                  
                  {/* Version Values */}
                  {feature.values.map((val, valIdx) => {
                    const isYes = val.toLowerCase() === 'yes' || val.toLowerCase().includes('advanced');
                    const isNo = val.toLowerCase() === 'no' || val.toLowerCase() === 'ended';
                    const isRecommendedVer = versions[valIdx] === 'Office 2024';

                    return (
                      <td 
                        key={valIdx} 
                        style={{ 
                          padding: '16px', 
                          fontSize: '0.9rem', 
                          textAlign: 'center', 
                          color: isRecommendedVer ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontWeight: isRecommendedVer ? 600 : 400
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                          {isYes && <Check size={16} style={{ color: 'var(--success-color)' }} />}
                          {isNo && <X size={16} style={{ color: 'var(--danger-color)' }} />}
                          <span>{val}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Tip Badge */}
        <div 
          style={{ 
            marginTop: '24px', 
            padding: '16px 20px', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Award size={20} style={{ color: 'var(--accent-color)' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            <strong>{lang === 'en' ? 'Choosing Tip:' : 'គន្លឹះដំបូន្មាន៖'}</strong>{' '}
            {lang === 'en' 
              ? 'Office 2024 is the latest LTSC release. It offers similar core styling and performance features to Office 365 without recurring annual subscription costs, making it the most cost-efficient choice for individuals and small businesses.'
              : 'Office 2024 គឺជាកំណែចុងក្រោយបំផុតដែលមិនមានបង់ប្រាក់ប្រចាំខែ។ វាមានលក្ខណៈពិសេសស្រដៀងនឹង Office 365 តែមិនចាំបាច់បង់ប្រាក់សេវាជាប្រចាំ ដែលជាជម្រើសសន្សំសំចៃបំផុតសម្រាប់ប្រើប្រាស់ផ្ទាល់ខ្លួន និងអាជីវកម្មខ្នាតតូច។'
            }
          </p>
        </div>

      </div>
    </section>
  );
}
