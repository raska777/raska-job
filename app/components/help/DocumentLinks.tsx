
// components/Help/DocumentLinks.tsx
'use client';

import { useState } from 'react';
import styles from './DocumentLinks.module.css';

const documentsByVisa: Record<string, { title: string; steps: string[]; files: { name: string; href: string }[] }[]> = {
  E9: [
    {
      title: '🏦 Bank karta ochish',
      steps: [
        '1. Zavoddan ish joyingizni tasdiqlovchi hujjat oling.',
        '2. Bankdan ariza anketasini to‘ldiring.',
        '3. Pasport + ARC bilan topshiring.'
      ],
      files: [
        { name: 'Ish joyi tasdiqnomasi', href: '/docs/employment_proof.pdf' },
        { name: 'Bank ariza formasi', href: '/docs/bank_application_form.pdf' }
      ]
    },
    {
      title: '🩺 Ishdagi jarohat (산재) uchun ariza',
      steps: [
        '1. Klinikadan davolanish maʼlumotnomasini oling.',
        '2. Zavodga hodisa haqida yozma maʼlumot bering.',
        '3. 산재 신청서 to‘ldirib topshiring.'
      ],
      files: [
        { name: 'Davolanish tasdiqnomasi (치료확인서)', href: '/docs/treatment_confirmation.pdf' },
        { name: 'Jarohat ariza formasi', href: '/docs/injury_claim_form.pdf' }
      ]
    }
  ],
  Student: [
    {
      title: '📝 Ishlash ruxsati olish (D-2 viza)',
      steps: [
        '1. Universitetdan tavsiya xati oling.',
        '2. Ish joyingizdan ish taklifnomasini tayyorlang.',
        '3. Imigratsiyaga hujjat topshiring.'
      ],
      files: [
        { name: 'Tavsiya xati namunasi', href: '/docs/university_recommendation.pdf' },
        { name: 'Ish taklifnomasi', href: '/docs/job_offer_letter.pdf' }
      ]
    }
  ]
};

export default function DocumentLinks() {
  const [selectedVisa, setSelectedVisa] = useState<'E9' | 'Student'>('E9');

  return (
    <div className={styles.wrapper}>
      <div className={styles.visaTabs}>
        {Object.keys(documentsByVisa).map((visa) => (
          <button
            key={visa}
            className={`${styles.tab} ${selectedVisa === visa ? styles.active : ''}`}
            onClick={() => setSelectedVisa(visa as 'E9' | 'Student')}
          >
            {visa}
          </button>
        ))}
      </div>

      {documentsByVisa[selectedVisa].map((doc, index) => (
        <div key={index} className={styles.docCard}>
          <h4 className={styles.docTitle}>{doc.title}</h4>
          <ul className={styles.steps}>
            {doc.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
          <div className={styles.links}>
            {doc.files.map((file, i) => (
              <a key={i} href={file.href} target="_blank" className={styles.fileLink}>
                📄 {file.name}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}