'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '@/styles/admin.module.css';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loadingState, setLoadingState] = useState({
    delete: false,
    fake: false,
    unsubscribe: false,
    notify: false,
  });

  const [resultMsg, setResultMsg] = useState({
    delete: '',
    fake: '',
    unsubscribe: '',
    notify: '',
  });

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'admin') {
      router.replace('/');
    }
  }, [session, status, router]);

  const handleAction = async (
    key: keyof typeof loadingState,
    endpoint: string,
    method: 'POST' | 'DELETE' | 'PATCH'
  ) => {
    const confirmMessages = {
      delete: "Rostdan ham barcha ish e'lonlarini o‘chirmoqchimisiz?",
      fake: "Test e'lonlar yaratilsinmi?",
      unsubscribe: "Barcha foydalanuvchilarni obunadan chiqarasizmi?",
      notify: "Obunachilarga ogohlantiruvchi xabar yuborilsinmi?",
    };

    if (!confirm(confirmMessages[key])) return;

    setLoadingState(prev => ({ ...prev, [key]: true }));
    setResultMsg(prev => ({ ...prev, [key]: '' }));

    try {
      const response = await fetch(`/api/admin/${endpoint}`, { method });
      const data = await response.json();
      setResultMsg(prev => ({ 
        ...prev, 
        [key]: data.message || data.error || 'Muvaffaqiyatli amalga oshirildi'
      }));
    } catch (error) {
      console.error('Action failed:', error);
      setResultMsg(prev => ({ 
        ...prev, 
        [key]: 'Tarmoq xatosi yuz berdi' 
      }));
    } finally {
      setLoadingState(prev => ({ ...prev, [key]: false }));
    }
  };

  if (status === 'loading') {
    return <div className={styles.loading}>Yuklanmoqda...</div>;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>🛠 Admin Dashboard</h1>

      <div className={styles.actionGroup}>
        <button
          onClick={() => handleAction('delete', 'clear-jobs', 'DELETE')}
          disabled={loadingState.delete}
          className={styles.deleteButton}
        >
          {loadingState.delete ? 'O‘chirilmoqda...' : '🗑 Barcha ishlarni o‘chirish'}
        </button>
        {resultMsg.delete && <p className={styles.result}>{resultMsg.delete}</p>}
      </div>

      <div className={styles.actionGroup}>
        <button
          onClick={() => handleAction('fake', 'fake-jobs', 'POST')}
          disabled={loadingState.fake}
          className={styles.secondaryButton}
        >
          {loadingState.fake ? 'Yaratilmoqda...' : '🧪 Test eʼlonlarini yaratish'}
        </button>
        {resultMsg.fake && <p className={styles.result}>{resultMsg.fake}</p>}
      </div>

      <div className={styles.actionGroup}>
        <button
          onClick={() => handleAction('unsubscribe', 'unsubscribe-all', 'PATCH')}
          disabled={loadingState.unsubscribe}
          className={styles.warningButton}
        >
          {loadingState.unsubscribe ? 'Jarayon...' : '📭 Barchani obunadan chiqarish'}
        </button>
        {resultMsg.unsubscribe && <p className={styles.result}>{resultMsg.unsubscribe}</p>}
      </div>

      <div className={styles.actionGroup}>
        <button
          onClick={() => handleAction('notify', 'notify-users', 'POST')}
          disabled={loadingState.notify}
          className={styles.primaryButton}
        >
          {loadingState.notify ? 'Yuborilmoqda...' : '📢 Xabar yuborish (email)'}
        </button>
        {resultMsg.notify && <p className={styles.result}>{resultMsg.notify}</p>}
      </div>
    </main>
  );
}