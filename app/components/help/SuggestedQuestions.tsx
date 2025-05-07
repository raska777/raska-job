'use client';

import { useState } from 'react';
import styles from './SuggestedQuestions.module.css';

interface QuestionProps {
  questions: string[];
  onSelect?: (question: string) => void;
}

const VISA_CATEGORIES = {
  'E-9 (Ishchi viza)': [
    'E-9 vizada ish joyini almashtirish qoidalari qanday?',
    'E-9 vizani uzaytirish uchun qanday hujjatlar kerak?',
    'E-9 bilan qancha vaqt Koreyada qolish mumkin?',
    'Ish beruvchi maosh tolamasa nima qilish kerak?',
    'E-9 vizada oilani Koreyaga chaqirish mumkinmi?'
  ],
  'H-2 (Mehmon ishchi)': [
    'H-2 vizani E-9 ga ozgartirish mumkinmi?',
    'H-2 vizada qancha vaqt ishlash mumkin?',
    'H-2 vizani doimiy yashash vizasiga otkazish mumkinmi?',
    'H-2 bilan qayta kirish qoidalari qanday?'
  ],
  'E-7 (Mutaxassis)': [
    'E-7 viza uchun minimal maosh qancha?',
    'E-7 vizada ish joyini ozgartirish mumkinmi?',
    'E-7 vizani doimiy yashash vizasiga otkazish mumkinmi?',
    'E-7 vizada oila azolarini olib kelish mumkinmi?'
  ],
  'D-2 (Talaba)': [
    'D-2 vizada qancha soat ishlash mumkin?',
    'Talaba vizasidan ish vizasiga otish mumkinmi?',
    'D-2 vizani uzaytirish jarayoni qanday?',
    'Bitiruvdan keyin qancha vaqt Koreyada qolish mumkin?'
  ],
  'F-2 (Doimiy yashash)': [
    'F-2 vizasini qanday olish mumkin?',
    'F-2 vizada qanday ishlarda ishlash mumkin?',
    'F-2 vizani qancha vaqt uzaytirish mumkin?',
    'F-2 vizadan fuqarolikka otish mumkinmi?'
  ]
} as const;

type VisaCategory = keyof typeof VISA_CATEGORIES;

export default function SuggestedQuestions({ onSelect }: QuestionProps) {
  const [activeCategory, setActiveCategory] = useState<VisaCategory | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleCategoryToggle = (category: VisaCategory) => {
    setActiveCategory(prev => (prev === category ? null : category));
  };

  const handleQuestionSelect = (question: string) => {
    onSelect?.(question);
    setActiveCategory(null);
    setExpanded(false);
  };

  return (
    <div className={styles.container}>
      {/* Title and Toggle Button */}
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Viza Kategoriyalari</h3>
        <button 
          className={styles.toggleButton}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? 'Yopish' : 'Koʻrsatish'}
        </button>
      </div>

      {/* Viza turini ko‘rsatish scroll liniyada */}
      {expanded && (
        <div className={styles.categoryScroll}>
          {(Object.keys(VISA_CATEGORIES) as VisaCategory[]).map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.active : ''
              }`}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Savollar ro‘yxati */}
      {activeCategory && (
        <div className={styles.subQuestions}>
          {VISA_CATEGORIES[activeCategory].map((q, index) => (
            <button
              key={`${activeCategory}-${index}`}
              className={styles.subQuestionButton}
              onClick={() => handleQuestionSelect(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
