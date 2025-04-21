
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
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sozlamalar</h2>
      
      <div className="mb-6">
      
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Ism</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={!editMode}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          value={formData.email}
          readOnly
        />
        {isGoogleUser && (
          <p className="text-xs text-gray-500 mt-1">Google hisobi orqali ulanilgan</p>
        )}
      </div>

      {!isGoogleUser && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Yangi parol</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={!editMode}
            placeholder={editMode ? "O'zgartirmaslik uchun bo'sh qoldiring" : ""}
          />
          {editMode && (
            <p className="text-xs text-gray-500 mt-1">Parolni o'zgartirmaslik uchun maydonni bo'sh qoldiring</p>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-3 mt-8">
        {!editMode ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            onClick={() => setEditMode(true)}
          >
            Tahrirlash
          </button>
        ) : (
          <>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition-colors"
              onClick={() => setEditMode(false)}
            >
              Bekor qilish
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              onClick={handleUpdate}
            >
              Saqlash
            </button>
          </>
        )}
      </div>
    </div>
  );
}
