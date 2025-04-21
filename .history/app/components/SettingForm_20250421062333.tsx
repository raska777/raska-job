'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function SettingsForm() {
  const { data: session, status } = useSession();
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isSubscribed: false,
  });

  // Sessiyadan foydalanuvchi ma'lumotlarini yuklaymiz
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        password: '',
        isSubscribed: false, // Bu qiymatni backenddan olish mumkin
      });

      // Backenddan `isSubscribed` qiymatini olish (agar mavjud bo‘lsa)
      fetch(`/api/user-info?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.isSubscribed !== undefined) {
            setFormData((prev) => ({ ...prev, isSubscribed: data.isSubscribed }));
          }
        })
        .catch((err) => console.error("Foydalanuvchi ma'lumotini olishda xatolik:", err));
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
          email: formData.email,
          name: formData.name,
          password: formData.password,
          isSubscribed: formData.isSubscribed,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert('✅ Sozlamalar yangilandi');
        setEditMode(false);
      } else {
        alert('❌ Xatolik: ' + result.error);
      }
    } catch (error) {
      console.error("Sozlamalarni saqlashda xatolik:", error);
      alert("⚠️ Sozlamalarni saqlab bo‘lmadi");
    }
  };

  if (status === 'loading') return <p>⏳ Yuklanmoqda...</p>;
  if (!session) return <p>⛔ Tizimga kirmagansiz</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.isSubscribed}
            onChange={(e) =>
              setFormData({ ...formData, isSubscribed: e.target.checked })
            }
            disabled={!editMode}
          />
          <span>Yangi ish e’lonlaridan email orqali xabardor bo‘lish</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Ism</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={!editMode}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Yangi parol</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          disabled={!editMode}
        />
      </div>

      {!editMode ? (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setEditMode(true)}
        >
          ✏️ Tahrirlash
        </button>
      ) : (
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            💾 Saqlash
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => setEditMode(false)}
          >
            🔙 Ortga
          </button>
        </div>
      )}
    </div>
  );
}
