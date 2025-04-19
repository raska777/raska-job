


// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';

// export default function NotificationBell() {
//   const { data: session, status } = useSession();
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSubscriptionStatus = async () => {
//       try {
//         const res = await fetch('/api/user/subscription');
//         const data = await res.json();
//         setIsSubscribed(data.isSubscribed);
//       } catch (err) {
//         console.error('Obuna holatini olishda xato:', err);
//         setError('Obuna holatini yuklab bo‘lmadi');
//       }
//     };

//     if (session?.user) {
//       fetchSubscriptionStatus();
//     }
//   }, [session]);

//   const toggleSubscription = async () => {
//     if (!session?.user?.id) return;

//     setLoading(true);
//     setError(null);

//     try {
//       // Obunani yoqish yoki o‘chirish
//       const res = await fetch('/api/user/subscription', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: session.user.id }),
//       });

//       const data = await res.json();
//       setIsSubscribed(data.isSubscribed);

//       // Agar obuna faollashtirilgan bo‘lsa, email yuboramiz
//       if (data.isSubscribed) {
//         await fetch('/api/post/email', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: session.user.id }),
//         });
//       }
//     } catch (err: any) {
//       console.error('Xatolik:', err);
//       setError('Serverda xatolik yuz berdi');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === 'loading') return <div>Yuklanmoqda...</div>;
//   if (!session) return <div>Tizimga kiring</div>;

//   return (
//     <div>
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       <button
//         onClick={toggleSubscription}
//         disabled={loading}
//         className={`notif-btn px-4 py-2 rounded text-white ${
//           isSubscribed ? 'bg-red-600' : 'bg-green-600'
//         }`}
//       >
//         {loading
//           ? 'Yuklanmoqda...'
//           : isSubscribed
//           ? '🔕 Obunani bekor qilish'
//           : '🔔 Obuna bo‘lish'}
//       </button>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from 'styles/notification.module.css'

export default function NotificationBell() {
  const { data: session, status } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obuna holatini olish
        const subRes = await fetch('/api/user/subscription');
        const subData = await subRes.json();
        setIsSubscribed(subData.isSubscribed);

        // Bildirishnomalarni olish
        const notifRes = await fetch('/api/user/notifications');
        const notifData = await notifRes.json();
        setNotifications(notifData.notifications);
        setUnreadCount(notifData.unreadCount);
      } catch (err) {
        console.error('Ma\'lumotlarni olishda xato:', err);
        setError('Ma\'lumotlarni yuklab bo‘lmadi');
      }
    };

    if (session?.user) {
      fetchData();
    }
  }, [session]);

  const toggleSubscription = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/user/subscription', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.user.id }),
      });

      const data = await res.json();
      setIsSubscribed(data.isSubscribed);

      if (data.isSubscribed) {
        await fetch('/api/post/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: session.user.id }),
        });
      }
    } catch (err: any) {
      console.error('Xatolik:', err);
      setError('Serverda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch('/api/user/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId }),
      });
      
      // Optimistik yangilash
      setNotifications(notifs => 
        notifs.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Bildirishnomani o\'qilgan deb belgilashda xato:', err);
    }
  };

  if (status === 'loading') return null;
  if (!session) return null;

  return (
    <div className={styles.notificationContainer}>
      <button 
        className={`${styles.notificationButton} ${showDropdown ? 'active' : ''}`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        🔔
        {unreadCount > 0 && (
          <span className={styles.notificationBadge}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className={styles.notificationDropdown}>
          <div className={styles.notificationHeader}>
            <h3 className={styles.notificationTitle}>Bildirishnomalar</h3>
            <button 
              className={styles.notificationClose}
              onClick={() => setShowDropdown(false)}
            >
              ×
            </button>
          </div>

          <div className={styles.notificationContent}>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={styles.notificationItem}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <p className={styles.notificationText}>{notification.message}</p>
                  <p className={styles.notificationTime}>
                    {new Date(notification.createdAt).toLocaleString()}
                    {!notification.read && ' • Yangi'}
                  </p>
                </div>
              ))
            ) : (
              <div className={styles.notificationEmpty}>
                Bildirishnomalar mavjud emas
              </div>
            )}
          </div>

          <button
            onClick={toggleSubscription}
            disabled={loading}
            className={`${styles.subscriptionToggle} ${
              isSubscribed ? styles.unsubscribe : ''
            }`}
          >
            {loading ? (
              <>
                <span className={styles.loadingSpinner} />
                Yuklanmoqda...
              </>
            ) : isSubscribed ? (
              '🔕 Obunani bekor qilish'
            ) : (
              '🔔 Obuna bo‘lish'
            )}
          </button>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}