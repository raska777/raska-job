


// 'use client';

// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';

// export default function NotificationBell() {
//   const { data: session, status } = useSession();
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSubscriptionStatus = async () => {
//       try {
//         const res = await fetch('/api/user/subscription');
//         if (!res.ok) throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');

//         const data = await res.json();
//         setIsSubscribed(data.isSubscribed);
//       } catch (err) {
//         console.error('구독 상태 가져오기 실패:', err);
//         setError('구독 상태를 가져오는 중 문제가 발생했습니다.');
//       }
//     };

//     if (session?.user) {
//       fetchSubscriptionStatus();
//     }
//   }, [session]);

//   const toggleSubscription = async () => {
//     if (!session?.user) return;

//     setLoading(true);
//     setError(null);
//     setSuccessMsg(null);

//     try {
//       const res = await fetch('/api/user/subscription', {
//         method: 'PATCH',
//       });

//       if (!res.ok) throw new Error('서버 오류');

//       const data = await res.json();
//       setIsSubscribed(data.isSubscribed);

//       setSuccessMsg(
//         data.isSubscribed
//           ? '구독이 성공적으로 완료되었습니다!'
//           : '구독이 취소되었습니다.'
//       );
//     } catch (err) {
//       console.error('구독 토글 오류:', err);
//       setError('작업 중 오류가 발생했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === 'loading') return <div>로딩 중...</div>;
//   if (!session) return <div className="text-sm text-gray-600">로그인해주세요</div>;

//   return (
//     <div className="flex flex-col items-start gap-2">
//       {error && <div className="text-red-500">{error}</div>}
//       {successMsg && <div className="text-green-600">{successMsg}</div>}

//       <button
//         onClick={toggleSubscription}
//         disabled={loading}
//         className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow text-white transition duration-300 ease-in-out transform active:scale-95 ${
//           isSubscribed
//             ? 'bg-red-600 hover:bg-red-700'
//             : 'bg-green-600 hover:bg-green-700'
//         }`}
//       >
//         {loading ? (
//           '⏳ 로딩 중...'
//         ) : isSubscribed ? (
//           <>🔕 구독 취소</>
//         ) : (
//           <>🔔 구독하기</>
//         )}
//       </button>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from './notification.module.css';

export default function NotificationBell() {
  const { data: session, status } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const res = await fetch('/api/user/subscription');
        if (!res.ok) throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');

        const data = await res.json();
        setIsSubscribed(data.isSubscribed);
      } catch (err) {
        console.error('구독 상태 가져오기 실패:', err);
        setError('구독 상태를 가져오는 중 문제가 발생했습니다.');
      }
    };

    if (session?.user) {
      fetchSubscriptionStatus();
      fetchNotifications();
    }
  }, [session]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/user/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error('알림 가져오기 실패:', err);
    }
  };

  useEffect(() => {
    if (error || successMsg) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccessMsg(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, successMsg]);

  const toggleSubscription = async () => {
    if (!session?.user) return;

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/user/subscription', {
        method: 'PATCH',
      });

      if (!res.ok) throw new Error('서버 오류');

      const data = await res.json();
      setIsSubscribed(data.isSubscribed);

      setSuccessMsg(
        data.isSubscribed
          ? '구독이 성공적으로 완료되었습니다!'
          : '구독이 취소되었습니다.'
      );
    } catch (err) {
      console.error('구독 토글 오류:', err);
      setError('작업 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') return <div className={styles.loading}>로딩 중...</div>;
  if (!session) return (
    <div className={styles.loginPrompt}>
      구독 기능을 이용하려면 로그인해주세요
    </div>
  );

  return (
    <div className={styles.notificationContainer}>
      {/* Notification Bell with Badge */}
      <div className={styles.notificationWrapper}>
        <button
          className={styles.notificationTrigger}
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          aria-label="알림"
        >
          <span className={styles.bellIcon}>
            {isSubscribed ? '🔔' : '🔕'}
          </span>
          {notifications.length > 0 && (
            <span className={styles.notificationBadge}></span>
          )}
        </button>

        {/* Notification Panel */}
        <div className={`${styles.notificationPanel} ${isPanelOpen ? styles.open : ''}`}>
          <div className={styles.notificationHeader}>
            <h3 className={styles.notificationTitle}>알림</h3>
            <button 
              className={styles.notificationClose}
              onClick={() => setIsPanelOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className={styles.notificationContent}>
            {notifications.length === 0 ? (
              <div className={styles.notificationEmpty}>
                새로운 알림이 없습니다
              </div>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className={styles.notificationItem}>
                  <p className={styles.notificationMessage}>{notification.message}</p>
                  <time className={styles.notificationTime}>
                    {new Date(notification.createdAt).toLocaleString()}
                  </time>
                </div>
              ))
            )}
          </div>

          <div className={styles.notificationFooter}>
            <button className={styles.notificationViewAll}>
              모두 보기
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Button */}
      <div className={styles.subscriptionContainer}>
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        {successMsg && (
          <div className={styles.successMessage}>
            {successMsg}
          </div>
        )}

        <button
          onClick={toggleSubscription}
          disabled={loading}
          className={`${styles.subscriptionButton} ${
            isSubscribed ? styles.subscribed : styles.unsubscribed
          }`}
        >
          {loading ? (
            <span className={styles.loadingIndicator}>⏳</span>
          ) : isSubscribed ? (
            <>
              <span>🔕</span>
              <span>구독 취소</span>
            </>
          ) : (
            <>
              <span>🔔</span>
              <span>구독하기</span>
            </>
          )}
        </button>

        {!isSubscribed && (
          <p className={styles.subscriptionHint}>
            새로운 일자리 공고를 이메일로 받아보시려면 구독해주세요
          </p>
        )}
      </div>
    </div>
  );
}