// components/Help/HelpSection.tsx
'use client';

import { useState, useEffect } from 'react';
import AIChat from './AIChat';
import DocumentLinks from './DocumentLinks';
import VisaInfo from './VisaInfo';
import EmergencyContacts from './EmergencyContacts';
import styles from './HelpSection.module.css';
import { FaQuestionCircle } from 'react-icons/fa';

export default function HelpSection() {
  const [activeTab, setActiveTab] = useState<'chat' | 'docs' | 'visa' | 'emergency'>('chat');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsExpanded(false);
    // 3 soniyadan keyin yana ko'rinadi
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 3000);
  };

  // Esc tugmasi bilan yopish
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
      {/* Floating Help Button */}
      {isVisible && !isExpanded && (
       <button 
       className={styles.floatingHelpButton}
       onClick={toggleExpand}
       aria-label="Yordam markazini ochish"
     >
       <FaQuestionCircle className={styles.helpIcon} />
       <span className={styles.helpText}>Yordam</span>
     </button>
      )}

      {/* Expandable Panel */}
      <div className={`${styles.helpPanel} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            <span className={styles.panelIcon}>🧭</span>
            Foreign Help Center
          </h2>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close help center"
          >
            &times;
          </button>
        </div>

        <div className={styles.panelTabs}>
          <button
            className={`${styles.tab} ${activeTab === 'chat' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            AI Assistant
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'docs' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('docs')}
          >
            Documents
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'visa' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('visa')}
          >
            Visa Info
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'emergency' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('emergency')}
          >
            Emergency
          </button>
        </div>

        <div className={styles.panelContent}>
          {activeTab === 'chat' && <AIChat />}
          {activeTab === 'docs' && <DocumentLinks />}
          {activeTab === 'visa' && <VisaInfo />}
          {activeTab === 'emergency' && <EmergencyContacts />}
        </div>

        <div className={styles.panelFooter}>
          <p>Need more help? Call <a href="tel:1345">1345</a> (Immigration Contact Center)</p>
        </div>
      </div>
    </>
  );
}