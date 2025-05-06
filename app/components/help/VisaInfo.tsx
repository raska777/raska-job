// components/Help/VisaInfo.tsx
'use client';

import styles from './VisaInfo.module.css';

const visaTypes = [
  {
    type: 'E-9',
    title: 'Non-professional Employment Visa',
    description: 'For foreign workers in manufacturing, agriculture, fishing, construction and service industries'
  },
  {
    type: 'H-2',
    title: 'Working Visit Visa',
    description: 'For ethnic Koreans with short-term employment opportunities'
  },
  {
    type: 'E-7',
    title: 'Special Occupation Visa',
    description: 'For professionals with specialized skills or knowledge'
  },
  {
    type: 'D-2',
    title: 'Student Visa',
    description: 'For foreign students enrolled in Korean educational institutions'
  },
  {
    type: 'F-2',
    title: 'Residence Visa',
    description: 'For long-term residents who meet specific requirements'
  }
];

export default function VisaInfo() {
  return (
    <div className={styles.visaInfo}>
      <h3 className={styles.title}>Common Work Visa Types in Korea</h3>
      <div className={styles.visaList}>
        {visaTypes.map((visa) => (
          <div key={visa.type} className={styles.visaCard}>
            <div className={styles.visaType}>{visa.type}</div>
            <div className={styles.visaDetails}>
              <h4>{visa.title}</h4>
              <p>{visa.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.note}>
        <p>For detailed requirements and application process, please visit the official <a href="https://www.hikorea.go.kr" target="_blank" rel="noopener noreferrer">HiKorea website</a>.</p>
      </div>
    </div>
  );
}