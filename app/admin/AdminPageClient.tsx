


'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from '@/styles/admin.module.css';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  isSubscribed: boolean;
}

interface Job {
  _id: string;
  work_name: string;
  work_type: string;
  location: string;
  salary: string;
  createdAt: string;
  accepts_foreigners: boolean;
}

interface Stats {
  totalUsers: number;
  subscribedUsers: number;
  totalJobs: number;
  todayJobs: number;
  newUsers: User[];
  recentJobs: Job[];
  loading: boolean;
}

export default function AdminPageClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [loadingState, setLoadingState] = useState({
    delete: false,
    fake: false,
    unsubscribe: false,
    notify: false,
    refresh: false
  });

  const [resultMsg, setResultMsg] = useState({
    delete: '',
    fake: '',
    unsubscribe: '',
    notify: '',
  });

  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    subscribedUsers: 0,
    totalJobs: 0,
    todayJobs: 0,
    newUsers: [],
    recentJobs: [],
    loading: true
  });

  // Fetch data function
  const fetchData = async () => {
    try {
      setLoadingState(prev => ({ ...prev, refresh: true }));
      const [statsRes, usersRes, jobsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/recent-users'),
        fetch('/api/admin/recent-jobs')
      ]);

      if (!statsRes.ok || !usersRes.ok || !jobsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [statsData, usersData, jobsData] = await Promise.all([
        statsRes.json(),
        usersRes.json(),
        jobsRes.json()
      ]);

      setStats({
        totalUsers: statsData.totalUsers,
        subscribedUsers: statsData.subscribedUsers,
        totalJobs: statsData.totalJobs,
        todayJobs: statsData.todayJobs,
        newUsers: usersData,
        recentJobs: jobsData,
        loading: false
      });
    } catch (error) {
      console.error('Failed to load data:', error);
      setResultMsg(prev => ({ ...prev, notify: 'Ma\'lumotlarni yuklab bo\'lmadi' }));
    } finally {
      setLoadingState(prev => ({ ...prev, refresh: false }));
    }
  };

  // Load data on mount and when session changes
  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchData();
    }
  }, [session]);

  // Handle admin actions
  const handleAction = async (
    key: 'delete' | 'fake' | 'unsubscribe' | 'notify',
    endpoint: string,
    method: 'POST' | 'DELETE' | 'PATCH'
  ) => {
    const confirmMessages = {
      delete: "Rostdan ham barcha ish e'lonlarini o'chirmoqchimisiz?",
      fake: "Test e'lonlar yaratilsinmi?",
      unsubscribe: "Barcha foydalanuvchilarni obunadan chiqarasizmi?",
      notify: "Obunachilarga ogohlantiruvchi xabar yuborilsinmi?",
    };

    if (!confirm(confirmMessages[key])) return;

    setLoadingState(prev => ({ ...prev, [key]: true }));
    setResultMsg(prev => ({ ...prev, [key]: '' }));

    try {
      const response = await fetch(`/api/admin/${endpoint}`, { 
        method,
        headers: { 'Content-Type': 'application/json' },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Server xatosi');
      }

      setResultMsg(prev => ({
        ...prev,
        [key]: data.message || 'Muvaffaqiyatli amalga oshirildi',
      }));
      
      // Refresh data after action
      await fetchData();
      
    } catch (error) {
      console.error('Action failed:', error);
      setResultMsg(prev => ({
        ...prev,
        [key]: error instanceof Error ? error.message : 'Tarmoq xatosi yuz berdi',
      }));
    } finally {
      setLoadingState(prev => ({ ...prev, [key]: false }));
    }
  };

  // Handle job actions (approve, edit, delete)
  const handleJobAction = async (jobId: string, action: 'approve' | 'edit' | 'delete') => {
    try {
      const endpointMap = {
        approve: `/api/admin/jobs/${jobId}/approve`,
        edit: `/api/admin/jobs/${jobId}`,
        delete: `/api/admin/jobs/${jobId}`
      };
      
      const methodMap = {
        approve: 'PATCH',
        edit: 'PATCH',
        delete: 'DELETE'
      };
      
      const response = await fetch(endpointMap[action], {
        method: methodMap[action],
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`${action} action failed`);
      }

      await fetchData();
    } catch (error) {
      console.error('Job action failed:', error);
      setResultMsg(prev => ({
        ...prev,
        notify: `Ish e'loni ${action} qilishda xato: ${error instanceof Error ? error.message : 'Nomalum xato'}`
      }));
    }
};
  // Loading state
  if (status === 'loading' || stats.loading) {
    return <div className={styles.loading}>Yuklanmoqda...</div>;
  }

  // Unauthenticated state
  if (!session) {
    return (
      <div className={styles.error}>
        <h2>❌ Foydalanuvchi tizimga kirmagan</h2>
        <p>Iltimos, admin hisobi bilan tizimga kiring</p>
        <button 
          onClick={() => router.push('/login?callbackUrl=/admin')}
          className={styles.primaryButton}
        >
          Login qilish
        </button>
      </div>
    );
  }

  // Unauthorized state (not admin)
  if (session.user?.role !== 'admin') {
    return (
      <div className={styles.error}>
        <h2>❌ Admin huquqlari yo'q</h2>
        <p>Sizning rol: <strong>{session.user?.role || 'undefined'}</strong></p>
        <p>Email: <strong>{session.user?.email}</strong></p>
        <div className={styles.buttonGroup}>
          <button 
            onClick={() => window.location.reload()}
            className={styles.secondaryButton}
          >
            Sessiyani yangilash
          </button>
          <button 
            onClick={() => router.push('/')}
            className={styles.primaryButton}
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  // Main admin dashboard
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🛠 Admin Dashboard</h1>
        <button 
          onClick={fetchData}
          className={styles.refreshButton}
          disabled={loadingState.refresh}
        >
          {loadingState.refresh ? 'Yangilanmoqda...' : '🔄 Yangilash'}
        </button>
      </div>
      
      <div className={styles.userInfo}>
        <p>Xush kelibsiz, <strong>{session.user?.name}</strong></p>
        <p>Email: <strong>{session.user?.email}</strong></p>
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👤</div>
          <div className={styles.statContent}>
            <h3>Umumiy foydalanuvchilar</h3>
            <p className={styles.statValue}>{stats.totalUsers}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📩</div>
          <div className={styles.statContent}>
            <h3>Obuna bo'lganlar</h3>
            <p className={styles.statValue}>{stats.subscribedUsers}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📄</div>
          <div className={styles.statContent}>
            <h3>Umumiy e'lonlar</h3>
            <p className={styles.statValue}>{stats.totalJobs}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🗓</div>
          <div className={styles.statContent}>
            <h3>Bugun joylanganlar</h3>
            <p className={styles.statValue}>{stats.todayJobs}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Sections */}
      <div className={styles.recentActivity}>
        <div className={styles.recentSection}>
          <h3>Yangi qo'shilgan foydalanuvchilar ({stats.newUsers.length})</h3>
          <div className={styles.userList}>
            {stats.newUsers.length > 0 ? (
              stats.newUsers.map(user => (
                <div key={user._id} className={styles.userItem}>
                  <div className={styles.userAvatar}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.userDetails}>
                    <p><strong>{user.name}</strong></p>
                    <p>{user.email}</p>
                    <p className={styles.userMeta}>
                      {new Date(user.createdAt).toLocaleString()} | 
                      {user.isSubscribed ? ' ✅ Obuna' : ' ❌ Obuna emas'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noData}>Yangi foydalanuvchilar mavjud emas</p>
            )}
          </div>
        </div>

        <div className={styles.recentSection}>
          <h3>Yangi joylangan e'lonlar ({stats.recentJobs.length})</h3>
          <div className={styles.jobList}>
            {stats.recentJobs.length > 0 ? (
              stats.recentJobs.map(job => (
                <div key={job._id} className={styles.jobItem}>
                  <div className={styles.jobType}>{job.work_type}</div>
                  <div className={styles.jobDetails}>
                    <h4>{job.work_name}</h4>
                    <p>{job.location} | {job.salary}</p>
                    <p className={styles.jobMeta}>
                      {new Date(job.createdAt).toLocaleString()} | 
                      {job.accepts_foreigners ? ' 🌍 Chet elliklar uchun' : ''}
                    </p>
                  </div>
                  <div className={styles.jobActions}>
                    <button 
                      onClick={() => handleJobAction(job._id, 'approve')}
                      className={styles.smallButton}
                    >
                      ✅ Tasdiqlash
                    </button>
                    <button 
                      onClick={() => handleJobAction(job._id, 'edit')}
                      className={styles.smallButton}
                    >
                      ✏️ Tahrirlash
                    </button>
                    <button 
                      onClick={() => handleJobAction(job._id, 'delete')}
                      className={styles.smallButton}
                    >
                      ❌ O'chirish
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noData}>Yangi e'lonlar mavjud emas</p>
            )}
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className={styles.adminActions}>
        <h3>Tezkor Amallar</h3>
        <div className={styles.actionButtons}>
          <button
            onClick={() => handleAction('delete', 'clear-jobs', 'DELETE')}
            disabled={loadingState.delete}
            className={styles.deleteButton}
          >
            {loadingState.delete ? 'Ochirilmoqda...' : '🗑 Barcha ishlarni ochirish'}
          </button>
          
          <button
            onClick={() => handleAction('fake', 'fake-jobs', 'POST')}
            disabled={loadingState.fake}
            className={styles.secondaryButton}
          >
            {loadingState.fake ? 'Yaratilmoqda...' : '🧪 Test elonlarini yaratish'}
          </button>
          
          <button
            onClick={() => handleAction('unsubscribe', 'unsubscribe-all', 'PATCH')}
            disabled={loadingState.unsubscribe}
            className={styles.warningButton}
          >
            {loadingState.unsubscribe ? 'Jarayon...' : '📭 Barchani obunadan chiqarish'}
          </button>
          
          <button
            onClick={() => handleAction('notify', 'notify-users', 'POST')}
            disabled={loadingState.notify}
            className={styles.primaryButton}
          >
            {loadingState.notify ? 'Yuborilmoqda...' : '📢 Xabar yuborish (email)'}
          </button>
        </div>
        
        {/* Action Results */}
        <div className={styles.actionResults}>
          {resultMsg.delete && <p className={styles.result}>{resultMsg.delete}</p>}
          {resultMsg.fake && <p className={styles.result}>{resultMsg.fake}</p>}
          {resultMsg.unsubscribe && <p className={styles.result}>{resultMsg.unsubscribe}</p>}
          {resultMsg.notify && <p className={styles.result}>{resultMsg.notify}</p>}
        </div>
      </div>
    </main>
  );
}