"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Notification {
  id: string;
  message: string;
}

export default function NotificationBell() {
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isBellClicked, setIsBellClicked] = useState(false);

  useEffect(() => {
    // Faqat sessiya mavjud bo'lsa, pollingni boshlaymiz
    if (session) {
      const fetchNotifications = async () => {
        try {
          const res = await fetch("/api/notifications");
          if (res.ok) {
            const data = await res.json();
            setNotifications(data);
          } else {
            console.error("Notification endpoint error");
          }
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };

      // Darhol birinchi chaqiruv
      fetchNotifications();
      // Har 30 soniyada yangilash
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [session]);

  if (status === "loading" || !session) {
    // Agar foydalanuvchi login qilmagan bo'lsa yoki yuklanayotganda, hech narsa ko'rsatmaymiz.
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsBellClicked(!isBellClicked)}
        className="p-2 focus:outline-none"
      >
        🔔
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {notifications.length}
          </span>
        )}
      </button>
      {isBellClicked && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-10">
          {notifications.length === 0 ? (
            <p className="p-4 text-gray-600">Bildirishnomalar yo'q</p>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {notifications.map((notif) => (
                <li key={notif.id} className="p-4 border-b last:border-none">
                  {notif.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
