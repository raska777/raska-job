// components/Help/DocumentLinks.tsx
'use client';

import { useState } from 'react';
import styles from './DocumentLinks.module.css';

const visaCategories = {
  WORK: ['E-9', 'E-7', 'H-2', 'F-2', 'F-4'],
  STUDY: ['D-2', 'D-4'],
  SPECIAL: ['F-6', 'F-1']
} as const;

type VisaType = typeof visaCategories.WORK[number] | typeof visaCategories.STUDY[number] | typeof visaCategories.SPECIAL[number];

const documentsByVisa: Record<VisaType, Array<{
    title: string;
    description?: string;
    steps: string[];
    files: {
      name: string;
      href: string;
      description?: string;
    }[];
    importantNotes?: string[];
}>> = {
    'E-9': [
        {
            title: '🏦 Bank karta ochish',
            description: 'Koreyada bank hisobi ochish uchun zarur hujjatlar',
            steps: [
                '1. Zavoddan ish joyingizni tasdiqlovchi hujjat oling (재직증명서)',
                '2. Bankdan ariza anketasini toʻldiring',
                '3. Pasport + ARC (Alien Registration Card) bilan bankka topshiring',
                '4. Bank xodimi bilan telefon raqamingizni va manzilingizni tasdiqlang'
            ],
            files: [
                {
                    name: 'Ish joyi tasdiqnomasi (재직증명서)',
                    href: '/docs/employment_proof.pdf',
                    description: 'Zavod HR boʻlimidan olinadi, 1 ish kuni davom etadi'
                },
                {
                    name: 'Bank ariza formasi',
                    href: '/docs/bank_application_form.pdf',
                    description: 'Bankning vebsaytidan yoki filialidan olish mumkin'
                },
                {
                    name: 'Banklar qoʻllanmasi',
                    href: '/docs/bank_guide.pdf',
                    description: 'Eng immigrantlarga qulay banklar va ularning talablari'
                }
            ],
            importantNotes: [
                '⚠️ Shinhan, KB, NH banklar immigrantlarga koʻproq imkoniyat beradi',
                '⚠️ Bank kartasini olish uchun odatda 3-5 ish kuni ketadi'
            ]
        },
        {
            title: '🩺 Ishdagi jarohat (산재) uchun ariza',
            description: 'Ish vaqtida sodir boʻlgan jarohatlar uchun kompensatsiya olish',
            steps: [
                '1. Klinikadan davolanish maʼlumotnomasini oling (치료확인서)',
                '2. Zavodga hodisa haqida yozma maʼlumot bering (사고사실확인서)',
                '3. Kompensatsiya arizasini (산재 신청서) toʻldirib topshiring',
                '4. Koreya Mehnat vazirligining tasdiqini kuting (1-2 oy)'
            ],
            files: [
                {
                    name: 'Davolanish tasdiqnomasi (치료확인서)',
                    href: '/docs/treatment_confirmation.pdf',
                    description: 'Davolangan shifoxonadan olinadi'
                },
                {
                    name: 'Jarohat ariza formasi (산재신청서)',
                    href: '/docs/injury_claim_form.pdf',
                    description: 'Mehnat vazirligi vebsaytidan yoki shifoxonadan olish mumkin'
                },
                {
                    name: 'Jarohatlar boʻyicha qoʻllanma',
                    href: '/docs/work_injury_guide.pdf',
                    description: 'Nimalarni qoplash mumkin va jarayon qanday ishlashi'
                }
            ],
            importantNotes: [
                '⚠️ Hodisadan keyin 3 kun ichida xabar berish shart',
                '⚠️ Barcha davolanish kvitansiyalarini saqlab qoʻying'
            ]
        },
        {
            title: '🏠 Ijaraga uy olish',
            description: 'Koreyada uy ijarasi uchun zarur hujjatlar va jarayon',
            steps: [
                '1. Ijara shartnomasi (전세계약서) tuzish',
                '2. Depozit toʻlash (보증금)',
                '3. Egalik huquqini tekshirish (등기부등본)',
                '4. Shartnomani qayd etish (확정일자)'
            ],
            files: [
                {
                    name: 'Ijara shartnomasi namunasi',
                    href: '/docs/rental_contract_sample.pdf'
                },
                {
                    name: 'Uy izlash qoʻllanmasi',
                    href: '/docs/housing_guide.pdf',
                    description: 'Qanday uy izlash va brokerlar bilan ishlash'
                }
            ]
        }
    ],
    'E-7': [
        {
            title: '👨‍💼 Kasbiy visa arizasi',
            description: 'E-7 visa uchun ariza topshirish jarayoni',
            steps: [
                '1. Koreyalik ish beruvchidan ish taklifnomasi',
                '2. Diplom va kasbiy sertifikatlarning noter tasdiqlangan tarjimasi',
                '3. Mehnat vazirligidan ishga ruxsatnoma',
                '4. Imigratsiya idorasiga topshirish'
            ],
            files: [
                {
                    name: 'E-7 visa talablari',
                    href: '/docs/e7_requirements.pdf'
                },
                {
                    name: 'Ariza namunasi',
                    href: '/docs/e7_application_sample.pdf'
                }
            ]
        }
    ],
    'D-2': [
        {
            title: '📝 Ishlash ruxsati olish (D-2 viza)',
            description: 'Talabalar uchun qoʻshimcha ishlash ruxsatnomasi',
            steps: [
                '1. Universitetdan tavsiya xati oling',
                '2. Ish joyingizdan ish taklifnomasini tayyorlang',
                '3. Oʻquv rejangizni taqdim eting',
                '4. Imigratsiyaga hujjat topshiring'
            ],
            files: [
                {
                    name: 'Tavsiya xati namunasi',
                    href: '/docs/university_recommendation.pdf',
                    description: 'Universitetning talabalar ishlari boʻlimidan olinadi'
                },
                {
                    name: 'Ish taklifnomasi namunasi',
                    href: '/docs/job_offer_letter.pdf',
                    description: 'Ish beruvchi tomonidan tuziladi'
                },
                {
                    name: 'Talabalar uchun ish qoʻllanmasi',
                    href: '/docs/student_work_guide.pdf',
                    description: 'Qancha vaqt ishlash mumkin va qonuniy cheklovlar'
                }
            ],
            importantNotes: [
                '⚠️ Dars davomida haftasiga 20 soatdan ortiq ishlash mumkin emas',
                '⚠️ Taymordan mustaqil ishlash uchun alohida ruxsat kerak'
            ]
        },
        {
            title: '🎓 Bitiruvdan keyin ish izlash vizesi (D-10)',
            description: 'Bitiruvdan keyin Koreyada qolish va ish qidirish uchun',
            steps: [
                '1. Universitet bitiruv diplomini olish',
                '2. Bank hisobida kamida 20 mln KRW mablagʻ koʻrsatish',
                '3. Ish qidirish rejasi bilan ariza topshirish',
                '4. Imigratsiya idorasida intervyudan oʻtish'
            ],
            files: [
                {
                    name: 'D-10 visa talablari',
                    href: '/docs/d10_requirements.pdf'
                },
                {
                    name: 'Ish qidirish rejasi namunasi',
                    href: '/docs/job_search_plan_sample.pdf'
                }
            ]
        }
    ],
    'F-4': [
        {
            title: '👨‍👩‍👧‍👦 Oilaviy birlashish arizasi',
            description: 'Oilangiz aʼzolarini Koreyaga chaqirish',
            steps: [
                '1. Qarindoshlik darajasini tasdiqlovchi hujjatlar',
                '2. Turar joy va daromadni tasdiqlovchi hujjatlar',
                '3. Koreya elchixonasida ariza topshirish',
                '4. Imigratsiya idorasining tasdiqini kuting'
            ],
            files: [
                {
                    name: 'Oilaviy birlashish qoʻllanmasi',
                    href: '/docs/family_reunion_guide.pdf'
                }
            ]
        }
    ],
    'H-2': [],
    'F-2': [],
    'D-4': [],
    'F-6': [],
    'F-1': []
};

export default function DocumentLinks() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof visaCategories>('WORK');
  const [selectedVisa, setSelectedVisa] = useState<VisaType>('E-9');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.mainTitle}>Visa va Hujjatlar Qoʻllanmasi</h2>
      <p className={styles.subtitle}>Kerakli hujjatlarni visa turi boʻyicha toping</p>
      
<div className={styles.categoryTabs}>
  {(Object.keys(visaCategories) as Array<keyof typeof visaCategories>).map((category) => (
    <button
      key={category}
      className={`${styles.categoryTab} ${selectedCategory === category ? styles.activeCategory : ''}`}
      onClick={() => {
        setSelectedCategory(category);
        setSelectedVisa(visaCategories[category][0]);
      }}
    >
      {category === 'WORK' && '👨‍💼 Ish vizalari'}
      {category === 'STUDY' && '🎓 Taʼlim vizalari'}
      {category === 'SPECIAL' && '🌟 Maxsus vizalar'}
    </button>
  ))}
</div>

      <div className={styles.visaTabs}>
        {visaCategories[selectedCategory].map((visa) => (
          <button
            key={visa}
            className={`${styles.tab} ${selectedVisa === visa ? styles.active : ''}`}
            onClick={() => setSelectedVisa(visa as VisaType)}
          >
            {visa}
          </button>
        ))}
      </div>

      <div className={styles.documentsContainer}>
        {documentsByVisa[selectedVisa]?.map((doc, index) => (
          <div 
            key={index} 
            className={`${styles.docCard} ${expandedCard === index ? styles.expanded : ''}`}
            onClick={() => toggleCard(index)}
          >
            <div className={styles.docHeader}>
              <h4 className={styles.docTitle}>{doc.title}</h4>
              {doc.description && <p className={styles.docDescription}>{doc.description}</p>}
              <span className={styles.expandIcon}>{expandedCard === index ? '▲' : '▼'}</span>
            </div>
            
            {expandedCard === index && (
              <div className={styles.docContent}>
                <div className={styles.stepsSection}>
                  <h5 className={styles.sectionTitle}>Jarayon bosqichlari:</h5>
                  <ul className={styles.steps}>
                    {doc.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>

                {doc.importantNotes && (
                  <div className={styles.notesSection}>
                    <h5 className={styles.sectionTitle}>Muhim eslatmalar:</h5>
                    <ul className={styles.notes}>
                      {doc.importantNotes.map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.linksSection}>
                  <h5 className={styles.sectionTitle}>Yuklab olish uchun hujjatlar:</h5>
                  <div className={styles.links}>
                    {doc.files.map((file, i) => (
                      <div key={i} className={styles.fileLinkContainer}>
                        <a 
                          href={file.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.fileLink}
                          onClick={(e) => e.stopPropagation()}
                        >
                          📄 {file.name}
                        </a>
                        {file.description && (
                          <p className={styles.fileDescription}>{file.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}