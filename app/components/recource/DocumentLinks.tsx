

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
    contacts?: {
      name: string;
      phone: string;
      description: string;
    }[];
}>> = {
  'E-9': [
    {
      title: '🏦 Bank hisobi ochish',
      description: 'Koreyada bank hisobi ochish uchun toʻliq qoʻllanma',
      steps: [
        '1. Ish joyingizdan 재직증명서 (Ish joyi tasdiqnomasi) oling',
        '2. Pasport, ARC karta va ish shartnomasini nusxasini tayyorlang',
        '3. Shinhan, KB yoki NH bank filialiga borib ariza toʻldiring',
        '4. Telefon raqamingizni roʻyxatdan oʻtkazing (010-xxxx-xxxx formatida)',
        '5. Bank kartasi va onlayn banking xizmatlarini faollashtiring'
      ],
      files: [
        {
          name: 'Ish joyi tasdiqnomasi namunasi',
          href: '/docs/employment_certificate_sample.pdf',
          description: 'HR boʻlimidan soʻrang, 1-2 ish kuni davom etadi'
        },
        {
          name: 'Bank ariza formulari',
          href: '/docs/bank_application_form.pdf',
          description: 'Bank vebsaytidan yoki filialdan olish mumkin'
        },
        {
          name: 'Bank tanlash qoʻllanmasi',
          href: '/docs/bank_comparison_guide.pdf',
          description: 'Eng qulay banklar va ularning imtiyozlari'
        }
      ],
      importantNotes: [
        '⚠️ Dastlabki 3 oy mobaynida chet elga pul oʻtkazish cheklangan',
        '⚠️ Bank kartasi odatda 3-5 ish kunida tayyor boʻladi',
        '⚠️ Har bir bankning minimal balans talabi bor (odatda 10,000 KRW)'
      ],
      contacts: [
        {
          name: 'Shinhan Bank mijozlar xizmati',
          phone: '1599-8000',
          description: '24/7 inglizcha va koreyscha qoʻllab-quvvatlash'
        },
        {
          name: 'KB Bank xorijiy mijozlar boʻlimi',
          phone: '1588-9999',
          description: 'Ish kunlari 09:00-18:00'
        }
      ]
    },
    {
      title: '🩺 Mehnat sharoitlari va kasalliklar',
      description: 'Ish joyidagi xavfli sharoitlar va kasalliklar haqida',
      steps: [
        '1. Ish joyidagi xavfli omillarni aniqlang',
        '2. Muntazam tibbiy koʻrikdan oʻting',
        '3. Kasaba uyushmasi aʼzosi boʻlish',
        '4. Mehnat sharoitlarini yaxshilash uchun takliflar bildiring'
      ],
      files: [
        {
          name: 'Mehnat sharoitlari qoʻllanmasi',
          href: '/docs/work_conditions_guide.pdf'
        },
        {
          name: 'Kasaba uyushmasi ariza formasi',
          href: '/docs/labor_union_form.pdf'
        }
      ]
    },
    
    {
        title: '🏭 Zavoddan chiqish va yangi ish topish',
        description: 'Ish joyini qonuniy o‘zgartirish tartibi',
        steps: [
          '1. Ish joyida muammo bo‘lsa, mehnat inspektsiyasiga murojaat qiling',
          '2. 고용센터 (Bandlik markazi) orqali yangi ish joyi qidiring',
          '3. EPS portali orqali ish o‘rniga ariza yuboring',
          '4. Yangi ish joyi tasdiqlangach, 이전허가서 (Ish joyini o‘zgartirish ruxsatnomasi) oling',
          '5. Immigratsiya ofisida maʼlumotlaringizni yangilang'
        ],
        files: [
          {
            name: 'Ish joyini o‘zgartirish uchun ariza',
            href: '/docs/job_transfer_form.pdf',
            description: 'Bandlik markazidan olinadi'
          },
          {
            name: 'Mehnat inspektsiyasi arizasi',
            href: '/docs/labor_inspection_request.pdf'
          }
        ],
        importantNotes: [
          '⚠️ Ruxsatsiz ish joyini o‘zgartirish noqonuniy hisoblanadi',
          '⚠️ Maksimal 3 marta ish joyi o‘zgartirishga ruxsat beriladi',
          '⚠️ Yangi ish topilmasa, 3 oygacha kutish muddati mavjud'
        ],
        contacts: [
          {
            name: 'EPS Contact Center',
            phone: '1577-0071',
            description: 'Bandlik bilan bog‘liq masalalar bo‘yicha yordam'
          },
          {
            name: 'Mehnat inspektsiyasi',
            phone: '1350',
            description: 'Ish joyidagi muammolarni hal qilish uchun'
          }
        ]
      },
      {
        title: '📄 Shartnomani uzaytirish tartibi',
        description: 'Shartnomani uzaytirish uchun kerakli hujjatlar va bosqichlar',
        steps: [
          '1. Ish beruvchingiz bilan yangi shartnoma tuzing',
          '2. 재계약서 (Qayta shartnoma) nusxasini tayyorlang',
          '3. 고용허가 갱신 신청서 (Bandlik ruxsatnomasini yangilash arizasi) to‘ldiring',
          '4. EPS orqali yangilanishni tasdiqlang',
          '5. Immigration ofisida vizani uzaytirish'
        ],
        files: [
          {
            name: 'Shartnomani uzaytirish arizasi',
            href: '/docs/contract_extension_form.pdf'
          },
          {
            name: 'Bandlik ruxsatnomasi arizasi',
            href: '/docs/eps_extension_request.pdf'
          }
        ],
        importantNotes: [
          '⚠️ Viza muddati tugashidan kamida 1 oy oldin uzaytirish kerak',
          '⚠️ Ish beruvchining roziligi talab qilinadi'
        ]
      },
      {
        title: '📥 E-7 vizasiga o‘tish tartibi',
        description: 'Uzoq muddatli ishlashni xohlovchilar uchun E-9 dan E-7 vizaga o‘tish bosqichlari',
        steps: [
          '1. Soha bo‘yicha 4 yillik ish tajribangiz bo‘lishi kerak',
          '2. TOPIK 3 yoki undan yuqori darajaga ega bo‘lish',
          '3. Ish beruvchidan 추천서 (Tavsiya xati) oling',
          '4. E-7 vizaga ariza to‘ldiring va hujjatlarni topshiring',
          '5. Immigration intervyusidan o‘ting'
        ],
        files: [
          {
            name: 'E-7 viza ariza formasi',
            href: '/docs/e7_application_form.pdf'
          },
          {
            name: 'Tavsiya xati namunasi',
            href: '/docs/e7_recommendation_letter.pdf'
          }
        ],
        importantNotes: [
          '⚠️ E-7 vizaga o‘tish uchun malaka, til darajasi va tajriba muhim',
          '⚠️ Immigration tomonidan qo‘shimcha intervyu yoki hujjatlar so‘ralishi mumkin'
        ]
      },
      {
        title: '📱 Koreyada yashash uchun foydali ilovalar',
        description: 'Kundalik hayotni osonlashtiradigan mobil ilovalar',
        steps: [
          '1. Naver Map - Koreya xaritasi va yoʻnalishlar',
          '2. Kakao T - Taksi chaqirish',
          '3. Kakao Metro - Metro xaritasi va marshrutlar',
          '4. Papago - Koreyscha tarjimon',
          '5. Yogiyo - Oziq-ovqat buyurtma qilish'
        ],
        files: [
          {
            name: 'Ilovalar qoʻllanmasi',
            href: '/docs/useful_apps_guide.pdf'
          }
        ]
      },
  ],
  'D-2': [
    {
      title: '🎓 Talabalar uchun ish qidirish',
      description: 'Talabalar uchun qonuniy ish topish yoʻllari',
      steps: [
        '1. Universitetingizning karyera markaziga murojaat qiling',
        '2. Albamon yanda Saramin kabi ish qidirish saytlaridan foydalaning',
        '3. Koreys tilini oʻrganish - eng kamida TOPIK 3 darajasi',
        '4. CV va rezumeningizni koreys tilida tayyorlang',
        '5. Universitet bitiruvchilari uchun D-10 vizasiga ariza topshirish'
      ],
      files: [
        {
          name: 'Talabalar uchun ish qidirish qoʻllanmasi',
          href: '/docs/student_job_search.pdf'
        },
        {
          name: 'CV namunasi (koreyscha)',
          href: '/docs/korean_cv_sample.pdf'
        }
      ],
      importantNotes: [
        '⚠️ Dars davri mobaynida haftasiga 20 soatdan ortiq ishlash mumkin emas',
        '⚠️ Taymordan mustaqil ishlash uchun alohida ruxsat kerak',
        '⚠️ Bitiruvdan keyin D-10 vizasiga oʻtish imkoniyati bor'
      ]
    },
    {
      title: '🏠 Talabalar uchun uy ijara qoʻllanmasi',
      description: 'Koreyada arzon va qulay turar joy topish',
      steps: [
        '1. Goshiwon (고시원) - eng arzon variant (200,000-400,000 KRW)',
        '2. Hasukjip (하숙집) - ovqat bilan birga',
        '3. Oneroom (원룸) - mustaqil yashash uchun',
        '4. Universitet yotoqxonalari',
        '5. Ijara shartnomasini diqqat bilan oʻqib chiqing'
      ],
      files: [
        {
          name: 'Turar joy turlari qoʻllanmasi',
          href: '/docs/housing_types.pdf'
        },
        {
          name: 'Ijara shartnomasi namunasi',
          href: '/docs/rental_contract_sample.pdf'
        }
      ]
    },
    {
        title: '📱 Koreyada yashash uchun foydali ilovalar',
        description: 'Kundalik hayotni osonlashtiradigan mobil ilovalar',
        steps: [
          '1. Naver Map - Koreya xaritasi va yoʻnalishlar',
          '2. Kakao T - Taksi chaqirish',
          '3. Kakao Metro - Metro xaritasi va marshrutlar',
          '4. Papago - Koreyscha tarjimon',
          '5. Yogiyo - Oziq-ovqat buyurtma qilish'
        ],
        files: [
          {
            name: 'Ilovalar qoʻllanmasi',
            href: '/docs/useful_apps_guide.pdf'
          }
        ]
      },
  ],
  // ... (qolgan visa turlari uchun ham shunday kengaytirilgan ma'lumotlar)
  'E-7': [
    // E-7 visa uchun keng ma'lumotlar
  ],
  'F-4': [
    // F-4 visa uchun keng ma'lumotlar
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
      <h2 className={styles.mainTitle}>Koreyada Hayot Qoʻllanmasi</h2>
      <p className={styles.subtitle}>Ish, oʻqish va yashash uchun barcha kerakli maʼlumotlar</p>
      
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
            onClick={() => setSelectedVisa(visa)}
          >
            {visa}
          </button>
        ))}
      </div>

      <div className={styles.documentsContainer}>
        {documentsByVisa[selectedVisa]?.length > 0 ? (
          documentsByVisa[selectedVisa].map((doc, index) => (
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

                  {doc.contacts && (
                    <div className={styles.contactsSection}>
                      <h5 className={styles.sectionTitle}>Foydali kontaktlar:</h5>
                      <ul className={styles.contacts}>
                        {doc.contacts.map((contact, i) => (
                          <li key={i}>
                            <strong>{contact.name}</strong><br />
                            📞 {contact.phone}<br />
                            <em>{contact.description}</em>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {doc.files.length > 0 && (
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
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>Ushbu visa turi uchun hujjatlar hozircha mavjud emas.</p>
            <p>Tez orada yangilanishlar kutilmoqda.</p>
          </div>
        )}
      </div>
    </div>
  );
}