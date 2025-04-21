
'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from 'styles/settingform.module.css';

export default function SettingsForm() {
  const { data: session, status } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isSubscribed: false,
  });

  // Foydalanuvchi ma'lumotlarini yuklash
  useEffect(() => {
    if (session?.user) {
      setLoading(true);
  
      // Avval formani tozalash
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        password: '',
        isSubscribed: false,
        isEmailVerified: false, // Yangi maydon (emailVerified)
        createDate: '', // Yangi maydon (createDate)
      });
  
      // Backenddan foydalanuvchi ma'lumotlarini olish
      fetch('/api/user-info')
        .then(async (res) => {
          if (!res.ok) throw new Error('Failed to fetch user info');
          return await res.json();
        })
        .then((data) => {
          // GOOGLE foydalanuvchi ekanligini tekshirish
          const googleUser = data.provider === 'google';
          setIsGoogleUser(googleUser);
  
          setFormData({
            name: data.name || session.user.name || '',
            email: session.user.email || '',
            password: '',
            isSubscribed: data.isSubscribed || false,
            isEmailVerified: session.user.emailVerified || false, // Emailni tekshirish
            createDate: data.createDate || '', // Yangi foydalanuvchi yaratish sanasi
          });
        })
        .catch((err) => {
          console.error("Foydalanuvchi ma'lumotini olishda xatolik:", err);
          // Xatolik bo‘lsa, default sessiondan
          setFormData({
            name: session.user.name || '',
            email: session.user.email || '',
            password: '',
            isSubscribed: false,
            isEmailVerified: false, // Default emailVerified qiymati
            createDate: '', // Default createDate qiymati
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
          ...(!isGoogleUser && { password: formData.password }), // Google foydalanuvchilari uchun parolni yuborma
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

  if (status === 'loading' || loading) return <p className="text-center py-8">⏳ Yuklanmoqda...</p>;
  if (!session) return <p className="text-center py-8">⛔ Tizimga kirmagansiz</p>;

  return (
    <div className={styles.container}>
  <h2 className={styles.title}>Sozlamalar</h2>

  {/* Ro‘yxatdan o‘tgan sana va email tasdiqlanishi */}
  <div className={styles.metaInfo}>
    <p>
      <strong>Ro‘yxatdan o‘tgan sana:</strong>{' '}
      {new Date(user.createdAt).toLocaleDateString('uz-UZ')}
    </p>

    <p>
      <strong>Email holati:</strong>{' '}
      {user.emailVerified ? (
        <span className={styles.verified}>✅ Tasdiqlangan</span>
      ) : (
        <>
          <span className={styles.notVerified}>❌ Tasdiqlanmagan</span>
          <button className={styles.verifyBtn} onClick={handleVerifyEmail}>
            Emailni tasdiqlash
          </button>
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

{/* <div className={styles.container}>
<h2 className={styles.title}>Sozlamalar</h2>

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

<div className={styles.actions}>
  {!editMode ? (
    <button className={styles.editBtn} onClick={() => setEditMode(true)}>Tahrirlash</button>
  ) : (
    <>
      <button className={styles.cancelBtn} onClick={() => setEditMode(false)}>Bekor qilish</button>
      <button className={styles.saveBtn} onClick={handleUpdate}>Saqlash</button>
    </>
  )}
</div>
</div> */}