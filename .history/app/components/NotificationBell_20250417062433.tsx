'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function NotificationBell() {
  const { data: session, status } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sessiya ma'lumotlaridan foydalanuvchi obuna holatini olish
  useEffect(() => {
    if (session) {
      fetch(`/api/user/subscription?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setIsSubscribed(data.isSubscribed))
        .catch((err) => console.error('Obuna holatini olishda xatolik', err));
    }
  }, [session]);

  // Obunani o'zgartirish
  const toggleSubscription = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/subscription', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          subscribe: !isSubscribed,
        }),
      });

      const data = await res.json();
      setIsSubscribed(data.isSubscribed);

      // Agar obuna bo'lsa, email yuborish
      if (data.isSubscribed) {
        await fetch('/api/user/subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session?.user?.email,
            subject: 'Obunaga qo‘shildingiz',
            text: 'Siz yangi e’lonlardan xabardor bo‘lish uchun obuna bo‘ldingiz!',
          }),
        });
      }
    } catch (error) {
      console.error('Obuna holatini yangilashda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') return <p>Yuklanmoqda...</p>;
  if (!session) return <p>Tizimga kirmagansiz</p>;

  return (
    <div className="relative">
      <button
        onClick={toggleSubscription}
        disabled={loading}
        className={`p-2 focus:outline-none ${
          isSubscribed ? 'bg-red-600' : 'bg-green-600'
        }`}
      >
        {loading ? 'Yuklanmoqda...' : isSubscribed ? '🔕 Obunani bekor qilish' : '🔔 Obuna bo‘lish'}
      </button>
    </div>
  );
}
