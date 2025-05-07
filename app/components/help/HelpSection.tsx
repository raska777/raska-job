'use client';

import { useState, useEffect, useRef } from 'react';
import AIChat from './AIChat';
import DocumentLinks from './DocumentLinks';
import VisaInfo from './VisaInfo';
import EmergencyContacts from './EmergencyContacts';
import styles from './HelpSection.module.css';
import { 
  FaQuestionCircle, 
  FaTimes, 
  FaChevronDown, 
  FaPhone, 
  FaGlobe,
  FaComment,
  FaFileAlt,
  FaPassport,
  FaExclamationTriangle,
  FaCompass
} from 'react-icons/fa';

const TAB_OPTIONS = [
  { id: 'chat', label: 'AI Yordam', icon: <FaComment /> },
  { id: 'docs', label: 'Hujjatlar', icon: <FaFileAlt /> },
  { id: 'visa', label: 'Viza', icon: <FaPassport /> },
  { id: 'emergency', label: 'Favqulodda', icon: <FaExclamationTriangle /> }
];

export default function HelpSection() {
  const [activeTab, setActiveTab] = useState<'chat' | 'docs' | 'visa' | 'emergency'>('chat');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mobil qurilmani aniqlash
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tashqi bosishni aniqlash
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  };

  const handleClose = () => {
    setIsExpanded(false);
    document.body.style.overflow = '';
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 3000);
  };

  // Escape tugmasini aniqlash
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  return (
    <>
      {isVisible && !isExpanded && (
        <button 
          className={`${styles.floatingButton} ${isMobile ? styles.mobileButton : ''}`}
          onClick={toggleExpand}
          aria-label="Yordam markazini ochish"
        >
          <FaQuestionCircle className={styles.buttonIcon} />
          {!isMobile && <span className={styles.buttonText}>Yordam</span>}
        </button>
      )}

      <div 
        ref={panelRef}
        className={`${styles.panel} ${isExpanded ? styles.expanded : ''} ${isMobile ? styles.mobileView : ''}`}
      >
        {/* Panel sarlavhasi */}
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <FaCompass className={styles.titleIcon} />
            <h2 className={styles.title}>Koreya Immigratsiya Yordam</h2>
          </div>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Yopish"
          >
            {isMobile ? <FaChevronDown /> : <FaTimes />}
          </button>
        </div>

        {/* Tab navigatsiya */}
        <div className={styles.tabNav}>
          {TAB_OPTIONS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id as any)}
              aria-label={tab.label}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabText}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Kontent maydoni */}
        <div className={styles.content}>
          {activeTab === 'chat' && <AIChat compact={isMobile} />}
          {activeTab === 'docs' && <DocumentLinks />}
          {activeTab === 'visa' && <VisaInfo />}
          {activeTab === 'emergency' && <EmergencyContacts />}
        </div>

        {/* Footer qismi */}
        <div className={styles.footer}>
          <div className={styles.contactItem}>
            <FaPhone className={styles.contactIcon} />
            <a href="tel:1345" className={styles.contactLink}>1345 (Immigratsiya)</a>
          </div>
          <div className={styles.contactItem}>
            <FaGlobe className={styles.contactIcon} />
            <a href="https://www.hikorea.go.kr" target="_blank" rel="noopener" className={styles.contactLink}>
              HiKorea vebsayti
            </a>
          </div>
        </div>
      </div>
    </>
  );
}