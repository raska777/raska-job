// components/Help/SuggestedQuestions.tsx
'use client';

import { useState } from 'react';
import styles from './SuggestedQuestions.module.css';

interface Props {
  onSelect?: (question: string) => void;
  onClear?: () => void;
  hasAnswer?: boolean;
}

const visaCategories = {
  'E-9 (Ishchi viza)': [
    'E-9 vizada ish joyini almashtirish qoidalari qanday?',
    'E-9 vizani uzaytirish uchun qanday hujjatlar kerak?',
    'E-9 bilan qancha vaqt Koreyada qolish mumkin?',
    'Ish beruvchi maosh tolamasa nima qilish kerak?',
    'E-9 vizada oilani Koreyaga chaqirish mumkinmi?',
    'E-9 vizada ish joyini ozgartirish jarayoni qanday?',
    'E-9 vizada qanday kasblarda ishlash mumkin?',
    'E-9 vizani qayta topshirish mumkinmi?',
    'E-9 vizada ish haqqi minimum qancha bolishi kerak?',
    'E-9 vizada sogliq sugurtasi majburiymi?'
  ],
  'H-2 (Mehmon ishchi)': [
    'H-2 vizani E-9 ga ozgartirish mumkinmi?',
    'H-2 vizada qancha vaqt ishlash mumkin?',
    'H-2 vizani doimiy yashash vizasiga otkazish mumkinmi?',
    'H-2 bilan qayta kirish qoidalari qanday?',
    'H-2 vizada ish joyini ozgartirish mumkinmi?',
    'H-2 vizani qancha marta uzaytirish mumkin?',
    'H-2 vizada qanday kasblarda ishlash mumkin?',
    'H-2 vizada oila azolarini olib kelish mumkinmi?',
    'H-2 vizada ish haqqi minimum qancha bolishi kerak?',
    'H-2 vizani qanday tez olish mumkin?'
  ],
  'E-7 (Mutaxassis)': [
    'E-7 viza uchun minimal maosh qancha?',
    'E-7 vizada ish joyini ozgartirish mumkinmi?',
    'E-7 vizani doimiy yashash vizasiga otkazish mumkinmi?',
    'E-7 vizada oila azolarini olib kelish mumkinmi?',
    'E-7 viza uchun qanday malakalar kerak?',
    'E-7 vizani qancha marta uzaytirish mumkin?',
    'E-7 vizada ish haqqi minimum qancha bolishi kerak?',
    'E-7 vizada sogliq sugurtasi majburiymi?',
    'E-7 vizada qanday kasblarda ishlash mumkin?',
    'E-7 vizani qanday tez olish mumkin?'
  ],
  'D-2 (Talaba)': [
    'D-2 vizada qancha soat ishlash mumkin?',
    'Talaba vizasidan ish vizasiga otish mumkinmi?',
    'D-2 vizani uzaytirish jarayoni qanday?',
    'Bitiruvdan keyin qancha vaqt Koreyada qolish mumkin?',
    'D-2 vizada qanday ishlarda ishlash mumkin?',
    'D-2 vizada ish haqqi minimum qancha bolishi kerak?',
    'D-2 vizada sogliq sugurtasi majburiymi?',
    'D-2 vizada oila azolarini olib kelish mumkinmi?',
    'D-2 vizani qanday tez olish mumkin?',
    'D-2 vizada qanday kasblarda ishlash mumkin?'
  ],
  'F-2 (Doimiy yashash)': [
    'F-2 vizasini qanday olish mumkin?',
    'F-2 vizada qanday ishlarda ishlash mumkin?',
    'F-2 vizani qancha vaqt uzaytirish mumkin?',
    'F-2 vizadan fuqarolikka otish mumkinmi?',
    'F-2 vizada ish haqqi minimum qancha bolishi kerak?',
    'F-2 vizada sogliq sugurtasi majburiymi?',
    'F-2 vizada oila azolarini olib kelish mumkinmi?',
    'F-2 vizani qanday tez olish mumkin?',
    'F-2 vizada qanday kasblarda ishlash mumkin?',
    'F-2 vizani qanday uzaytirish mumkin?'
  ]
};

export default function SuggestedQuestions({ onSelect, onClear, hasAnswer }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className={styles.wrapper}>
      {hasAnswer && (
        <button className={styles.clearButton} onClick={onClear}>
          Javobni tozalash
        </button>
      )}

      <div className={styles.categorySection}>
        <h3 className={styles.sectionTitle}>Viza Turlari</h3>
        <div className={styles.categoryButtons}>
          {Object.keys(visaCategories).map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.activeCategory : ''
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className={styles.questionsSection}>
          <h4 className={styles.subTitle}>{selectedCategory} bo'yicha savollar</h4>
          <ul className={styles.questionsList}>
            {visaCategories[selectedCategory as keyof typeof visaCategories].map((q, i) => (
              <li key={i} className={styles.questionItem}>
                <button onClick={() => onSelect?.(q)}>
                  {q}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
