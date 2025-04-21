
'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

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
      });
  
      // Backenddan foydalanuvchi ma'lumotlarini olish
      fetch('/api/user-info')
        .then(async (res) => {
          if (!res.ok) throw new Error('Failed to fetch user info');
          return await res.json();
        })
        .then((data) => {
          // GOOGLE foydalanuvchi ekanligini tekshirish (ENDI TO‘G‘RI)
          const googleUser = data.provider === 'google';
          setIsGoogleUser(googleUser);
  
          setFormData({
            name: data.name || session.user.name || '',
            email: session.user.email || '',
            password: '',
            isSubscribed: data.isSubscribed || false,
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
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300">
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 tracking-tight">
      👤 Foydalanuvchi sozlamalari
    </h2>
  
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Ism
        </label>
        <input
          type="text"
          className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
          ${editMode ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700'}`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={!editMode}
        />
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-not-allowed text-gray-600 dark:text-gray-400"
          value={formData.email}
          readOnly
        />
        {isGoogleUser && (
          <p className="text-xs text-blue-500 mt-1 italic">Google hisobi orqali ulanilgan</p>
        )}
      </div>
  
      {!isGoogleUser && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Yangi parol
          </label>
          <input
            type="password"
            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
            ${editMode ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700'}`}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={!editMode}
            placeholder={editMode ? "Parolni o‘zgartirmaslik uchun bo‘sh qoldiring" : ""}
          />
          {editMode && (
            <p className="text-xs text-gray-500 mt-1 italic">
              Parolni o‘zgartirmaslik uchun maydonni bo‘sh qoldiring
            </p>
          )}
        </div>
      )}
    </div>
  
    <div className="flex justify-end mt-10 gap-4">
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all"
        >
          ✏️ Tahrirlash
        </button>
      ) : (
        <>
          <button
            onClick={() => setEditMode(false)}
            className="px-6 py-3 rounded-xl bg-gray-400 hover:bg-gray-500 text-white font-semibold transition-all"
          >
            ❌ Bekor qilish
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all"
          >
            💾 Saqlash
          </button>
        </>
      )}
    </div>
  </div>
  
  );
}
