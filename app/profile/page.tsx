
'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
import styles from './profile.module.css';
import {  FiPlus, FiSettings, FiLogOut, FiBriefcase, FiBookmark, FiUser, FiMail,FiArrowLeftCircle } from "react-icons/fi";
import NotificationBell from "../components/NotificationBell";
import '@/styles/global.css';

// 동적 로딩 (Dinamik yuklash)
const SettingsForm = dynamic(() => import("../components/SettingForm"), {
  loading: () => <div className={styles.loading}>로드 중...</div>,
  ssr: false,
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
        <h2>프로필 접근</h2>
        <p>프로필을 보려면 로그인하세요</p>
        <Link href="/auth/signin" className={styles.signInButton}>
          로그인
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      {/* 뒤로 가기 버튼 (Orqaga qaytish tugmasi) */}
      <button onClick={() => router.push('/')} className={styles.backButton}>
          <FiArrowLeftCircle size={24} /> 뒤로
        </button>
        <NotificationBell/>

      {/* 프로필 헤더 (Profil header) */}
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="프로필 사진"
              width={120}
              height={120}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <FiUser size={50} />
            </div>
          )}
          
        </div>
          
        <div className={styles.userInfo}>
          <h1>{session.user?.name || '사용자'}</h1>
          <p className={styles.email}>
            <FiMail size={16} /> {session.user?.email}
          </p>
          <p className={styles.joinedDate}>가입일: 2023년 5월 15일</p>
        </div>
      </div>  

      {/* 내비게이션 (Navigatsiya) */}
      <nav className={styles.navTabs}>
        <button
          className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          내 프로필
        </button>
          
        <Link
          href="/my-jobs"
          className={`${styles.tab} ${activeTab === 'saved-jobs' ? styles.active : ''}`}
        >
          내 공고</Link>
        <Link
          href="/saved-jobs"
          className={`${styles.tab} ${activeTab === 'saved-jobs' ? styles.active : ''}`}
        >
          저장된 공고
        </Link>
      </nav>

      {/* 콘텐츠 (Kontent) */}
      <div className={styles.content}>
        {activeTab === 'profile' && (
          <div className={styles.profileContent}>
            <div className={styles.actions}>
              <Link href="/post" className={styles.primaryButton}>
                <FiPlus /> 새 공고
              </Link>
              <button
                onClick={() => setShowSettings(true)}
                className={styles.secondaryButton}
              >
                <FiSettings /> 설정
              </button>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className={styles.jobsContent}>
            <h2><FiBriefcase /> 내 공고</h2>
            <div className={styles.jobList}>
              <p>아직 공고가 없습니다</p>
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className={styles.savedContent}>
            <h2><FiBookmark /> 저장된 공고</h2>
            <div className={styles.savedList}>
              <p>저장된 공고가 없습니다</p>
            </div>
          </div>
        )}
      </div>

      {/* 설정 모달 (Sozlamalar modali) */}
      {showSettings && (
        <div className={styles.settingsModal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>프로필 설정</h2>
              <button
                onClick={() => setShowSettings(false)}
                className={styles.closeButton}
              >
                &times;
              </button>
            </div>
            <Suspense fallback={<div className={styles.loading}>로드 중...</div>}>
              <SettingsForm />
            </Suspense>
            <div className={styles.modalFooter}>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className={styles.logoutButton}
              >
                <FiLogOut /> 로그아웃
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}