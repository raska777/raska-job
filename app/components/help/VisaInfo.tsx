// components/Help/VisaInfo.tsx
'use client';

import styles from './VisaInfo.module.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

const VISA_TYPES = [
  {
    type: 'E-9',
    title: 'Kasbiy bo‘lmagan ish viza',
    description: 'Ishlab chiqarish, qishloq xo‘jaligi, baliqchilik, qurilish va xizmat ko‘rsatish sohalarida ishlash uchun',
    link: 'https://www.eps.go.kr'
  },
  {
    type: 'H-2',
    title: 'Ish tashrifi viza',
    description: 'Koreys millatiga mansub shaxslar uchun qisqa muddatli ishlash imkoniyati',
    link: 'https://www.moj.go.kr'
  },
  {
    type: 'E-7',
    title: 'Maxsus kasb viza',
    description: 'Mutaxassislik bilim yoki ko‘nikmalariga ega bo‘lganlar uchun',
    link: 'https://www.korea.net'
  },
  {
    type: 'F-2',
    title: 'Doimiy yashash viza',
    description: 'Muayyan talablarga javob beradigan uzoq muddatli istiqomat qiluvchilar uchun',
    link: 'https://www.hikorea.go.kr'
  }
];

export default function VisaInfo() {
  return (
    <div className={styles.visaInfo}>
      <h3 className={styles.title}>Koreyadagi Ish Vizalari</h3>
      <div className={styles.visaGrid}>
        {VISA_TYPES.map((visa) => (
          <div key={visa.type} className={styles.visaCard}>
            <div className={styles.visaHeader}>
              <span className={styles.visaType}>{visa.type}</span>
              <h4 className={styles.visaTitle}>{visa.title}</h4>
            </div>
            <p className={styles.visaDescription}>{visa.description}</p>
            <a 
              href={visa.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.visaLink}
            >
              Batafsil <FaExternalLinkAlt />
            </a>
          </div>
        ))}
      </div>

      <div className={styles.importantNote}>
        <h4>Muhim eslatmalar:</h4>
        <ul>
          <li>Barcha vizalar uchun pasport kamida 6 oy muddatga amal qilishi kerak</li>
          <li>Ish beruvchi bilan shartnoma tuzish majburiy</li>
          <li>Noqonuniy ishlash qattiq jazolanadi (5 yilgacha Koreyaga kirish taqiqlanishi mumkin)</li>
        </ul>
      </div>
    </div>
  );
}