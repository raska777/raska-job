

'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from 'styles/settingform.module.css';

export default function SettingsForm() {
  const { data: session, status } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isSubscribed: false,
    isEmailVerified: false,
    createdAt: '',
  });

  // Foydalanuvchi ma'lumotlarini yuklash
  useEffect(() => {
    if (session?.user) {
      setLoading(true);
      
      fetch('/api/user-info')
        .then(async (res) => {
          if (!res.ok) throw new Error('Failed to fetch user info');
          return await res.json();
        })
        .then((data) => {
          setIsGoogleUser(data.provider === 'google');
          
          setFormData({
            name: data.name || session.user.name || '',
            email: session.user.email || '',
            password: '',
            isSubscribed: data.isSubscribed || false,
            isEmailVerified: data.isEmailVerified || false,
            createdAt: data.createdAt || '',
          });
        })
        .catch((err) => {
          console.error("Foydalanuvchi ma'lumotini olishda xatolik:", err);
          // Fallback to session data
          setFormData({
            name: session.user.name || '',
            email: session.user.email || '',
            password: '',
            isSubscribed: false,
            isEmailVerified: false,
            createdAt: '',
          });
        })
        .finally(() => setLoading(false));
    }
  }, [session]);

  const handleUpdate = async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          ...(!isGoogleUser && { password: formData.password }),
          isSubscribed: formData.isSubscribed,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert('✅ Sozlamalar yangilandi');
        setEditMode(false);
        // Yangilangan ma'lumotlarni qayta yuklash
        window.location.reload();
      } else {
        alert('❌ Xatolik: ' + (result.error || 'Noma\'lum xatolik'));
      }
    } catch (error) {
      console.error("Sozlamalarni saqlashda xatolik:", error);
      alert("⚠️ Sozlamalarni saqlab bo'lmadi");
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setEmailVerificationSent(true);
        alert('✅ Tasdiqlash havolasi emailingizga yuborildi');
      } else {
        const error = await res.json();
        alert('❌ Xatolik: ' + (error.message || 'Email yuborib bo‘lmadi'));
      }
    } catch (error) {
      console.error("Email tasdiqlash so'rovida xatolik:", error);
      alert("⚠️ Email tasdiqlash so'rovini yuborib bo'lmadi");
    }
  };

  if (status === 'loading' || loading) return <p className="text-center py-8">⏳ Yuklanmoqda...</p>;
  if (!session) return <p className="text-center py-8">⛔ Tizimga kirmagansiz</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sozlamalar</h2>

      {/* Meta ma'lumotlar */}
      <div className={styles.metaInfo}>
        <p>
          <strong>Ro‘yxatdan o‘tgan sana:</strong>{' '}
          {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString('uz-UZ') : 'Noma\'lum'}
        </p>

        <p>
          <strong>Email holati:</strong>{' '}
          {formData.isEmailVerified ? (
            <span className={styles.verified}>✅ Tasdiqlangan</span>
          ) : (
            <>
              <span className={styles.notVerified}>❌ Tasdiqlanmagan</span>
              {!emailVerificationSent && (
                <button className={styles.verifyBtn} onClick={handleVerifyEmail}>
                  Emailni tasdiqlash
                </button>
              )}
              {emailVerificationSent && (
                <span className={styles.sentText}>Tasdiqlash havolasi yuborildi</span>
              )}
            </>
          )}
        </p>
      </div>

      {/* Ism */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Ism</label>
        <input
          type="text"
          className={styles.input}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={!editMode}
        />
      </div>

      {/* Email */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          className={styles.readonlyInput}
          value={formData.email}
          readOnly
        />
        {isGoogleUser && (
          <p className={styles.hintText}>Google hisobi orqali ulanilgan</p>
        )}
      </div>

      {/* Parol */}
      {!isGoogleUser && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>Yangi parol</label>
          <input
            type="password"
            className={styles.input}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={!editMode}
            placeholder={editMode ? "O'zgartirmaslik uchun bo'sh qoldiring" : ""}
          />
          {editMode && (
            <p className={styles.hintText}>Parolni o'zgartirmaslik uchun maydonni bo'sh qoldiring</p>
          )}
        </div>
      )}

      {/* Obuna holati */}
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={formData.isSubscribed}
            onChange={(e) => setFormData({ ...formData, isSubscribed: e.target.checked })}
            disabled={!editMode}
            className={styles.checkbox}
          />
          Yangiliklar va xabarnomalarga obuna bo'lish
        </label>
      </div>

      {/* Harakat tugmalari */}
      <div className={styles.actions}>
        {!editMode ? (
          <button className={styles.editBtn} onClick={() => setEditMode(true)}>
            Tahrirlash
          </button>
        ) : (
          <>
            <button className={styles.cancelBtn} onClick={() => setEditMode(false)}>
              Bekor qilish
            </button>
            <button className={styles.saveBtn} onClick={handleUpdate}>
              Saqlash
            </button>
          </>
        )}
      </div>
    </div>
  );
}