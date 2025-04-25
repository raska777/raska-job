'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NotificationBell from "../components/NotificationBell";
import SettingsForm from "../components/SettingForm";
import Image from "next/image";
import styles from './profile.module.css';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.profileContainer}>
      {/* Orqaga qaytish tugmasi */}
      <button
        onClick={() => router.back()}
        className={styles.backButton}
      >
🔙 뒤로 가기      </button>

      {session ? (
        <div>
          {/* Profil sarlavhasi */}
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <div className={styles.profileAvatar}>
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Foydalanuvchi profili"
                    width={50}
                    height={50}
                    className={styles.profileImage}
                    priority // LCP uchun optimallashtirish
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

          {/* Asosiy kontent */}
          <div className={styles.profileContent}>
            <Link
              href="/post"
              className={`${styles.actionButton} ${styles.primaryButton}`}
            >
              ➕ Elon berish
            </Link>

            <Link
              href="/my-jobs"
              className={`${styles.actionButton} ${styles.primaryButton}`}
            >
              Mening elonlarim
            </Link>

            {/* Sozlamalar tugmasi */}
            <button
              onClick={() => setShowSettings(true)}
              className={`${styles.actionButton} ${styles.secondaryButton}`}
            >
              ⚙️ Sozlamalar
            </button>

            {/* Chiqish tugmasi */}
            <button
              onClick={() => signOut()}
              className={`${styles.actionButton} ${styles.dangerButton}`}
            >
              Chiqish
            </button>
          </div>

          {/* Sozlamalar formasi */}
          {showSettings && (
            <div className={styles.settingsSection}>
              <button
                onClick={() => setShowSettings(false)}
                className={styles.backButton}
              >
                🔙 Orqaga
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