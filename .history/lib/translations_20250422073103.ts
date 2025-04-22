// lib/translations.ts
import { LanguageCode } from '@/lib/translations'; // translations.ts faylidan import
export const translations: Record<LanguageCode, Record<string, string>> = {
    uz: {
      welcome: "Xush kelibsiz",
      changeLanguage: "Tilni o'zgartirish",
      home: "Bosh sahifa",
      about: "Biz haqimizda",
      contact: "Aloqa",
    },
    en: {
      welcome: "Welcome",
      changeLanguage: "Change language",
      home: "Home",
      about: "About us",
      contact: "Contact",
    },
    ru: {
      welcome: "Добро пожаловать",
      changeLanguage: "Изменить язык",
      home: "Главная",
      about: "О нас",
      contact: "Контакты",
    },
    ko: {
      welcome: "환영합니다",
      changeLanguage: "언어 변경",
      home: "홈페이지",
      about: "회사 소개",
      contact: "연락처",
    },
    vi: {
      welcome: "Chào mừng",
      changeLanguage: "Thay đổi ngôn ngữ",
      home: "Trang chủ",
      about: "Về chúng tôi",
      contact: "Liên hệ",
    },
    th: {
      welcome: "ยินดีต้อนรับ",
      changeLanguage: "เปลี่ยนภาษา",
      home: "หน้าหลัก",
      about: "เกี่ยวกับเรา",
      contact: "ติดต่อ",
    },
  };
  