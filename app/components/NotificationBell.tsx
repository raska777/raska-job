

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaRegBell} from 'react-icons/fa';
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
        if (!res.ok) throw new Error('Failed to load subscription status');
        const data = await res.json();
        setIsSubscribed(data.isSubscribed);
      } catch (err) {
        console.error('Subscription status error:', err);
        setError('Failed to load subscription status');
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

      if (!res.ok) throw new Error('Server error');

      const data = await res.json();
      setIsSubscribed(data.isSubscribed);

      setSuccessMsg(
        data.isSubscribed
          ? 'Subscribed to notifications!'
          : 'Unsubscribed from notifications'
      );
    } catch (err) {
      console.error('Subscription toggle error:', err);
      setError('An error occurred');
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
    <div className="absolute top-1 right-12 z-50">
      <div className="relative flex items-center gap-2">
        {/* All messages appear on the left side */}
        <div className="flex flex-col items-end">
          {/* Always visible subscribe text */}
          {!isSubscribed && (
            <div className="text-xs text-gray-400 whitespace-nowrap">
              Subscribe to notifications
            </div>
          )}
          
          {/* Success/error messages (more transparent) */}
          {error && (
            <div className="text-xs text-red-400 whitespace-nowrap flex items-center gap-1">
              <FaExclamationCircle size={12} />
              <span>{error}</span>
            </div>
          )}
          {successMsg && (
            <div className="text-xs text-green-400 whitespace-nowrap flex items-center gap-1">
              <FaCheckCircle size={12} />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* Fixed width icon button */}
        <button
          onClick={toggleSubscription}
          disabled={loading}
          className="w-[25px] h-[25px] flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors focus:outline-none"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          ) : isSubscribed ? (
            <IoMdNotificationsOff size={18} />
          ) : (
            <FaRegBell size={18} />
          )}
        </button>
      </div>
    </div>
  );
}