
'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
import styles from './profile.module.css';
import {  FiPlus, FiSettings, FiLogOut, FiBriefcase, FiBookmark, FiUser, FiMail, FiEdit, FiArrowLeftCircle } from "react-icons/fi";
import NotificationBell from "../components/NotificationBell";
import '@/styles/global.css';
// Dinamik yuklash
const SettingsForm = dynamic(() => import("../components/SettingForm"), {
  loading: () => <div className={styles.loading}>Yuklanmoqda...</div>,
  ssr: false, // SSR ni o'chirib qo'yamiz (shart emas)
});

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.notSignedIn}>
        <h2>Profilga kirish</h2>
        <p>Profilni ko'rish uchun tizimga kiring</p>
        <Link href="/auth/signin" className={styles.signInButton}>
          Kirish
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      {/* Orqaga qaytish tugmasi */}
      <button onClick={() => router.push('/')} className={styles.backButton}>
          <FiArrowLeftCircle size={24} /> Orqaga
        </button>
        <NotificationBell/>


      {/* Profil header */}
      <div className={styles.profileHeader}>
        
        <div className={styles.avatarContainer}>
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profil rasmi"
              width={120}
              height={120}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              
              <FiUser size={50} />
            </div>
          )}
          <button className={styles.editAvatar}>
            <FiEdit size={16} />
          </button>

        </div>
          
        <div className={styles.userInfo}>
          <h1>{session.user?.name || 'Foydalanuvchi'}</h1>
          <p className={styles.email}>
            <FiMail size={16} /> {session.user?.email}
          </p>
          <p className={styles.joinedDate}>A'zo: 2023 yil 15 may</p>
        </div>
      </div>  
            <NotificationBell/>


      {/* Navigatsiya */}
      <nav className={styles.navTabs}>
        <button
          className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Mening profilim
        </button>

        <Link
          href="/my-jobs"
          className={`${styles.tab} ${activeTab === 'saved-jobs' ? styles.active : ''}`}
        >
          mening elonlarim</Link>
        <Link
          href="/saved-jobs"
          className={`${styles.tab} ${activeTab === 'saved-jobs' ? styles.active : ''}`}
        >
          Saqlangan ishlar
        </Link>
      </nav>

      {/* Kontent */}
      <div className={styles.content}>
        {activeTab === 'profile' && (
          <div className={styles.profileContent}>
           

            <div className={styles.actions}>
              <Link href="/post" className={styles.primaryButton}>
                <FiPlus /> Yangi e'lon
              </Link>
              <button
                onClick={() => setShowSettings(true)}
                className={styles.secondaryButton}
              >
                <FiSettings /> Sozlamalar
              </button>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className={styles.jobsContent}>
            <h2><FiBriefcase /> Mening e'lonlarim</h2>
            <div className={styles.jobList}>
              <p>Hozircha e'lonlar mavjud emas</p>
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className={styles.savedContent}>
            <h2><FiBookmark /> Saqlanganlar</h2>
            <div className={styles.savedList}>
              <p>Saqlangan e'lonlar mavjud emas</p>
            </div>
          </div>
        )}
      </div>

      {/* Sozlamalar modali */}
      {showSettings && (
        <div className={styles.settingsModal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Profil sozlamalari</h2>
              <button
                onClick={() => setShowSettings(false)}
                className={styles.closeButton}
              >
                &times;
              </button>
            </div>
            <Suspense fallback={<div className={styles.loading}>Yuklanmoqda...</div>}>
              <SettingsForm />
            </Suspense>
            <div className={styles.modalFooter}>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className={styles.logoutButton}
              >
                <FiLogOut /> Profildan chiqish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}