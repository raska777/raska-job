// 'use client';

// import { useSession, signOut } from "next-auth/react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import NotificationBell from "../components/NotificationBell";
// import SettingsForm from "../components/SettingForm";
// import styles from './profile.module.css';

// export default function ProfilePage() {
//   const { data: session } = useSession();
//   const [showSettings, setShowSettings] = useState(false);
//   const router = useRouter();

//   return (
//     <div className={styles.profileContainer}>
//       {/* Back button */}
//       <button
//         onClick={() => router.back()}
//         className={styles.backButton}
//       >
//         🔙 Ortga qaytish
//       </button>

//       {session ? (
//         <div>
//           {/* Header section */}
//           <div className={styles.profileHeader}>
//             <div className={styles.profileInfo}>
//               <div className={styles.profileAvatar}>
//                 {session.user?.image ? (
//                   <img
//                     src={session.user.image}
//                     alt="User profile"
//                   />
//                 ) : (
//                   <span className={styles.profileAvatarFallback}>👤</span>
//                 )}
//               </div>
//               <div className={styles.profileText}>
//                 <h2>{session.user?.name || "Foydalanuvchi"}</h2>
//                 <p>{session.user?.email}</p>
//               </div>
//             </div>
//             <NotificationBell />
//           </div>

//           {/* Main content */}
//           <div className={styles.profileContent}>
//             <Link
//               href="/post"
//               className={`${styles.actionButton} ${styles.primaryButton}`}
//             >
//               ➕ E'lon berish
//             </Link>

//             <Link
//               href="/my-jobs"
//               className={`${styles.actionButton} ${styles.primaryButton}`}
//             >
//               Mening e'lonlarim
//             </Link>

//             {/* Settings button */}
//             <button
//               onClick={() => setShowSettings(true)}
//               className={`${styles.actionButton} ${styles.secondaryButton}`}
//             >
//               ⚙️ Sozlamalar
//             </button>

//             {/* Sign out button */}
//             <button
//               onClick={() => signOut()}
//               className={`${styles.actionButton} ${styles.dangerButton}`}
//             >
//               Chiqish
//             </button>
//           </div>

//           {/* Settings form */}
//           {showSettings && (
//             <div className={styles.settingsSection}>
//               <button
//                 onClick={() => setShowSettings(false)}
//                 className={styles.backButton}
//               >
//                 🔙 Ortga
//               </button>
//               <SettingsForm />
//             </div>
//           )}
//         </div>
//       ) : (
//         <p className={styles.notSignedIn}>⛔ Siz tizimga kirmagansiz</p>
//       )}
//     </div>
//   );
// }

'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NotificationBell from "../components/NotificationBell";
import SettingsForm from "../components/SettingForm";
import Image from "next/image"; // Importing the Image component for optimization
import styles from './profile.module.css';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.profileContainer}>
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className={styles.backButton}
      >
        🔙 Ortga qaytish
      </button>

      {session ? (
        <div>
          {/* Header section */}
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <div className={styles.profileAvatar}>
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="User profile"
                    width={50}
                    height={50}
                    className={styles.profileImage}
                  />
                ) : (
                  <span className={styles.profileAvatarFallback}>👤</span>
                )}
              </div>
              <div className={styles.profileText}>
                <h2>{session.user?.name || "Foydalanuvchi"}</h2>
                <p>{session.user?.email}</p>
              </div>
            </div>
            <NotificationBell />
          </div>

          {/* Main content */}
          <div className={styles.profileContent}>
            <Link
              href="/post"
              className={`${styles.actionButton} ${styles.primaryButton}`}
            >
              ➕ E'lon berish
            </Link>

            <Link
              href="/my-jobs"
              className={`${styles.actionButton} ${styles.primaryButton}`}
            >
              Mening e'lonlarim
            </Link>

            {/* Settings button */}
            <button
              onClick={() => setShowSettings(true)}
              className={`${styles.actionButton} ${styles.secondaryButton}`}
            >
              ⚙️ Sozlamalar
            </button>

            {/* Sign out button */}
            <button
              onClick={() => signOut()}
              className={`${styles.actionButton} ${styles.dangerButton}`}
            >
              Chiqish
            </button>
          </div>

          {/* Settings form */}
          {showSettings && (
            <div className={styles.settingsSection}>
              <button
                onClick={() => setShowSettings(false)}
                className={styles.backButton}
              >
                🔙 Ortga
              </button>
              <SettingsForm />
            </div>
          )}
        </div>
      ) : (
        <p className={styles.notSignedIn}>⛔ Siz tizimga kirmagansiz</p>
      )}
    </div>
  );
}
