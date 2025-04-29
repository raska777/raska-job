
// 'use client';

// import { useSession, signOut } from "next-auth/react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import NotificationBell from "../components/NotificationBell";
// import SettingsForm from "../components/SettingForm";
// import Image from "next/image";
// import styles from './profile.module.css';
// import { FiArrowLeftCircle } from "react-icons/fi";

// export default function ProfilePage() {
//   const { data: session } = useSession();
//   const [showSettings, setShowSettings] = useState(false);
//   const router = useRouter();

//   return (
//     <div className={styles.profileContainer}>
//       {/* 뒤로 가기 버튼 */}
//       <button onClick={() => router.push('/')} className={styles.backButton}>
//           <FiArrowLeftCircle size={24} /> Orqaga
//         </button>


//       {session ? (
//         <div>
//           {/* 프로필 헤더 */}
//           <div className={styles.profileHeader}>
//             <div className={styles.profileInfo}>
//               <div className={styles.profileAvatar}>
//                 {session.user?.image ? (
//                   <Image
//                     src={session.user.image}
//                     alt="사용자 프로필"
//                     width={50}
//                     height={50}
//                     className={styles.profileImage}
//                     priority // LCP 최적화
//                   />
//                 ) : (
//                   <span className={styles.profileAvatarFallback}>👤</span>
//                 )}
//               </div>
//               <div className={styles.profileText}>
//                 <h2>{session.user?.name || "사용자"}</h2>
//                 <p>{session.user?.email}</p>
//               </div>
//             </div>
//             <NotificationBell />
//           </div>

//           {/* 주요 콘텐츠 */}
//           <div className={styles.profileContent}>
//             <Link
//               href="/post"
//               className={`${styles.actionButton} ${styles.primaryButton}`}
//             >
//               ➕ 공고 올리기
//             </Link>

//             <Link
//               href="/my-jobs"
//               className={`${styles.actionButton} ${styles.primaryButton}`}
//             >
//               내 공고
//             </Link>
//             <Link
//               href="/saved-jobs"
//               className={`${styles.actionButton} ${styles.primaryButton}`}
//             >
// saqlangan            </Link>

//             {/* 설정 버튼 */}
//             <button
//               onClick={() => setShowSettings(true)}
//               className={`${styles.actionButton} ${styles.secondaryButton}`}
//             >
//               ⚙️ 설정
//             </button>

//             {/* 로그아웃 버튼 */}
//             <button
//               onClick={() => signOut()}
//               className={`${styles.actionButton} ${styles.dangerButton}`}
//             >
//               로그아웃
//             </button>
//           </div>

//           {/* 설정 폼 */}
//           {showSettings && (
//             <div className={styles.settingsSection}>
//               <button
//                 onClick={() => setShowSettings(false)}
//                 className={styles.backButton}
//               >
//                 🔙 뒤로 가기
//               </button>
//               <SettingsForm />
//             </div>
//           )}
//         </div>
//       ) : (
//         <p className={styles.notSignedIn}>⛔ 로그인되지 않음</p>
//       )}
//     </div>
//   );
// }

'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
import styles from './profile.module.css';
import { FiArrowLeft, FiPlus, FiSettings, FiLogOut, FiBriefcase, FiBookmark, FiUser, FiMail, FiEdit } from "react-icons/fi";
import NotificationBell from "../components/NotificationBell";

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
        <FiArrowLeft size={20} /> Orqaga
      </button>

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
        <div><NotificationBell/></div>
      </div>

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