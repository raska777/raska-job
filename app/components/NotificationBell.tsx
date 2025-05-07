
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaRegBell } from 'react-icons/fa';
import { IoMdNotificationsOff } from 'react-icons/io';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function NotificationSubscriptionButton() {
  const { data: session, status } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const res = await fetch('/api/user/subscription');
        if (!res.ok) throw new Error('구독 상태를 불러오는데 실패했습니다');
        const data = await res.json();
        setIsSubscribed(data.isSubscribed);
      } catch (err) {
        console.error('구독 상태 확인 오류:', err);
        setError('구독 상태를 불러올 수 없습니다');
      }
    };

    if (session?.user) {
      fetchSubscriptionStatus();
    }
  }, [session]);

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
          ? '성공적으로 구독되었습니다!'
          : '구독이 취소되었습니다'
      );
    } catch (err) {
      console.error('구독 변경 오류:', err);
      setError('오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') return (
    <div className="absolute right-6 top-4 flex items-center justify-center p-2">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!session) return null;

  return (
    <div className="absolute  top-4 z-50  " style={{ right: '0px' }}>
      <div className="relative flex flex-col items-end gap-1">
        {/* 상태 메시지 */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 text-xs p-2 rounded flex items-center gap-1">
            <FaExclamationCircle />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-100 text-xs p-2 rounded flex items-center gap-1">
            <FaCheckCircle />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 구독 버튼 */}
        <button
          onClick={toggleSubscription}
          disabled={loading}
          className={`flex items-center gap-2 px-3 py-2 mr-4 rounded-full text-sm font-medium transition-colors ${
            isSubscribed 
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : isSubscribed ? (
            <>
              <IoMdNotificationsOff />
              <span>구독 취소</span>
            </>
          ) : (
            <>
              <FaRegBell />
              <span>구독하기</span>
            </>
          )}
        </button>

        {/* 안내 문구 */}
        {!isSubscribed && (
          <div className="relative">
          <p className="absolute text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap text-right" style={{ right: '32px' }}>
          채용 알림을 받아보세요
          </p>
        </div>
         
        )}
      </div>
    </div>
  );
}