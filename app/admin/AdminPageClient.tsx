


// 'use client';

// import { useSession } from 'next-auth/react';
// import { useState, useEffect } from 'react';
// import styles from '@/styles/admin.module.css';
// import { useRouter } from 'next/navigation';
// import EditJobModal from 'app/components/EditJobModal';
// import { toast } from 'react-toastify';
// import UserManagementModal from 'app/components/EditUserModal'; // <- Qo'shildi

// interface User {
//     profileCompleted: any;
//     role: string;
//     _id: string;
//     name: string;
//     email: string;
//     createdAt: string;
//     isSubscribed: boolean;
// }

// interface Job {
//     _id: string;
//     work_name: string;
//     work_type: string;
//     location: string;
//     salary: string;
//     createdAt: string;
//     accepts_foreigners: boolean;
// }

// interface Stats {
//     totalUsers: number;
//     subscribedUsers: number;
//     totalJobs: number;
//     todayJobs: number;
//     newUsers: User[];
//     recentJobs: Job[];
//     loading: boolean;
// }

// export default function AdminPageClient() {
//     const { data: session, status } = useSession();
//     const router = useRouter();
//     const [editingJob, setEditingJob] = useState<Job | null>(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [editingUser, setEditingUser] = useState<User | null>(null);

//     const [loadingState, setLoadingState] = useState({
//         delete: false,
//         fake: false,
//         unsubscribe: false,
//         notify: false,
//         refresh: false
//     });

//     const [resultMsg, setResultMsg] = useState({
//         delete: '',
//         fake: '',
//         unsubscribe: '',
//         notify: '',
//     });

//     const [stats, setStats] = useState<Stats>({
//         totalUsers: 0,
//         subscribedUsers: 0,
//         totalJobs: 0,
//         todayJobs: 0,
//         newUsers: [],
//         recentJobs: [],
//         loading: true
//     });
//     // Fetch data function
//     const fetchData = async () => {
//         try {
//             setLoadingState(prev => ({ ...prev, refresh: true }));
//             const [statsRes, usersRes, jobsRes] = await Promise.all([
//                 fetch('/api/admin/stats'),
//                 fetch('/api/admin/recent-users'),
//                 fetch('/api/admin/recent-jobs')
//             ]);

//             if (!statsRes.ok || !usersRes.ok || !jobsRes.ok) {
//                 throw new Error('Failed to fetch data');
//             }

//             const [statsData, usersData, jobsData] = await Promise.all([
//                 statsRes.json(),
//                 usersRes.json(),
//                 jobsRes.json()
//             ]);

//             setStats({
//                 totalUsers: statsData.totalUsers,
//                 subscribedUsers: statsData.subscribedUsers,
//                 totalJobs: statsData.totalJobs,
//                 todayJobs: statsData.todayJobs,
//                 newUsers: usersData,
//                 recentJobs: jobsData,
//                 loading: false
//             });
//         } catch (error) {
//             console.error('Failed to load data:', error);
//             setResultMsg(prev => ({ ...prev, notify: 'Ma\'lumotlarni yuklab bo\'lmadi' }));
//         } finally {
//             setLoadingState(prev => ({ ...prev, refresh: false }));
//         }
//     };

//     // Load data on mount and when session changes
//     useEffect(() => {
//         if (session?.user?.role === 'admin') {
//             fetchData();
//         }
//     }, [session]);

//     // Handle admin actions
//     const handleAction = async (
//         key: 'delete' | 'fake' | 'unsubscribe' | 'notify',
//         endpoint: string,
//         method: 'POST' | 'DELETE' | 'PATCH'
//     ) => {
//         const confirmMessages = {
//             delete: "Rostdan ham barcha ish e'lonlarini o'chirmoqchimisiz?",
//             fake: "Test e'lonlar yaratilsinmi?",
//             unsubscribe: "Barcha foydalanuvchilarni obunadan chiqarasizmi?",
//             notify: "Obunachilarga ogohlantiruvchi xabar yuborilsinmi?",
//         };

//         if (!confirm(confirmMessages[key])) return;

//         setLoadingState(prev => ({ ...prev, [key]: true }));
//         setResultMsg(prev => ({ ...prev, [key]: '' }));

//         try {
//             const response = await fetch(`/api/admin/${endpoint}`, {
//                 method,
//                 headers: { 'Content-Type': 'application/json' },
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.error || 'Server xatosi');
//             }

//             setResultMsg(prev => ({
//                 ...prev,
//                 [key]: data.message || 'Muvaffaqiyatli amalga oshirildi',
//             }));

//             // Refresh data after action
//             await fetchData();

//         } catch (error) {
//             console.error('Action failed:', error);
//             setResultMsg(prev => ({
//                 ...prev,
//                 [key]: error instanceof Error ? error.message : 'Tarmoq xatosi yuz berdi',
//             }));
//         } finally {
//             setLoadingState(prev => ({ ...prev, [key]: false }));
//         }
//     };

//     // Handle job actions (approve, edit, delete)
//     const handleJobAction = async (jobId: string, action: 'approve' | 'edit' | 'delete') => {
//         if (action === 'edit') {
//             const jobToEdit = stats.recentJobs.find(job => job._id === jobId);
//             if (jobToEdit) setEditingJob(jobToEdit);
//             return;
//         }

//         try {
//             const endpointMap = {
//                 approve: `/api/admin/jobs/${jobId}/approve`,
//                 edit: `/api/admin/jobs/${jobId}`,
//                 delete: `/api/admin/jobs/${jobId}`,
//             };

//             const methodMap = {
//                 approve: 'PATCH',
//                 edit: 'PATCH',
//                 delete: 'DELETE',
//             };

//             const res = await fetch(endpointMap[action], {
//                 method: methodMap[action],
//                 headers: { 'Content-Type': 'application/json' },
//             });

//             if (!res.ok) {
//                 throw new Error('Xatolik yuz berdi');
//             }

//             await fetchData(); // reload data
//         } catch (error) {
//             console.error('Job action failed:', error);
//         }
//     };

//     // Loading state
//     if (status === 'loading' || stats.loading) {
//         return <div className={styles.loading}>Yuklanmoqda...</div>;
//     }

//     // Unauthenticated state
//     if (!session) {
//         return (
//             <div className={styles.error}>
//                 <h2>❌ Foydalanuvchi tizimga kirmagan</h2>
//                 <p>Iltimos, admin hisobi bilan tizimga kiring</p>
//                 <button
//                     onClick={() => router.push('/login?callbackUrl=/admin')}
//                     className={styles.primaryButton}
//                 >
//                     Login qilish
//                 </button>
//             </div>
//         );
//     }

//     // Unauthorized state (not admin)
//     if (session.user?.role !== 'admin') {
//         return (
//             <div className={styles.error}>
//                 <h2>❌ Admin huquqlari yo'q</h2>
//                 <p>Sizning rol: <strong>{session.user?.role || 'undefined'}</strong></p>
//                 <p>Email: <strong>{session.user?.email}</strong></p>
//                 <div className={styles.buttonGroup}>
//                     <button
//                         onClick={() => window.location.reload()}
//                         className={styles.secondaryButton}
//                     >
//                         Sessiyani yangilash
//                     </button>
//                     <button
//                         onClick={() => router.push('/')}
//                         className={styles.primaryButton}
//                     >
//                         Bosh sahifaga qaytish
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const filteredJobs = stats.recentJobs.filter(job =>
//         job.work_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.location.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleSubscriptionToggle = async (userId: string, subscribe: boolean) => {
//         try {
//             const res = await fetch(`/api/admin/users/${userId}/subscription`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ subscribe }),
//             });

//             let data;
//             try {
//                 data = await res.json(); // ✅ JSON sifatida parse qilishga urinamiz
//             } catch (err) {
//                 console.log("user id topilmadi", err)
//                 const text = await res.text(); // ❌ Agar JSON bo‘lmasa, oddiy matn sifatida o‘qiymiz
//                 throw new Error(`Noto‘g‘ri javob: ${text}`);
//             }

//             if (!res.ok) throw new Error(data.error || 'Xatolik yuz berdi');

//             toast.success(data.message || '✅ Holat yangilandi');
//             await fetchData(); // 🔄 yangilash
//         } catch (error) {
//             console.error("Obuna yangilash xatolik:", error);
//             toast.error((error as Error).message || 'Obuna holatini yangilashda xatolik');
//         }
//     };

    
      
//       const handleDeleteUser = async (userId: string) => {
//         try {
//           const response = await fetch(`/api/admin/users/${userId}`, {
//             method: 'DELETE'
//           });
//           if (!response.ok) throw new Error('O\'chirish amali muvaffaqiyatsiz');
//           await fetchData();
//           toast.success('Foydalanuvchi o\'chirildi');
//         } catch (error) {
//           toast.error((error as Error).message);
//         }
//       };
//     // Main admin dashboard
//     return (
//         <main className={styles.container}>
//             <div className={styles.header}>
//                 <h1 className={styles.title}>🛠 Admin Dashboard</h1>
//                 <button
//                     onClick={fetchData}
//                     className={styles.refreshButton}
//                     disabled={loadingState.refresh}
//                 >
//                     {loadingState.refresh ? 'Yangilanmoqda...' : '🔄 Yangilash'}
//                 </button>
//             </div>

//             <div className={styles.userInfo}>
//                 <p>Xush kelibsiz, <strong>{session.user?.name}</strong></p>
//                 <p>Email: <strong>{session.user?.email}</strong></p>
//             </div>

//             {/* Statistics Cards */}
//             <div className={styles.statsGrid}>
//                 <div className={styles.statCard}>
//                     <div className={styles.statIcon}>👤</div>
//                     <div className={styles.statContent}>
//                         <h3>Umumiy foydalanuvchilar</h3>
//                         <p className={styles.statValue}>{stats.totalUsers}</p>
//                     </div>
//                 </div>

//                 <div className={styles.statCard}>
//                     <div className={styles.statIcon}>📩</div>
//                     <div className={styles.statContent}>
//                         <h3>Obuna bo'lganlar</h3>
//                         <p className={styles.statValue}>{stats.subscribedUsers}</p>
//                     </div>
//                 </div>

//                 <div className={styles.statCard}>
//                     <div className={styles.statIcon}>📄</div>
//                     <div className={styles.statContent}>
//                         <h3>Umumiy e'lonlar</h3>
//                         <p className={styles.statValue}>{stats.totalJobs}</p>
//                     </div>
//                 </div>

//                 <div className={styles.statCard}>
//                     <div className={styles.statIcon}>🗓</div>
//                     <div className={styles.statContent}>
//                         <h3>Bugun joylanganlar</h3>
//                         <p className={styles.statValue}>{stats.todayJobs}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Recent Activity Sections */}
//             <div className={styles.recentActivity}>
//                 <div className={styles.recentSection}>
//                     <h3>Yangi qo'shilgan foydalanuvchilar ({stats.newUsers.length})</h3>
//                     <div className={styles.userList}>
//   {stats.newUsers.length > 0 ? (
//     stats.newUsers.map(user => (
//       <div key={user._id} className={styles.userItem}>
//         <div className={styles.userAvatarContainer}>
//           <div className={styles.userAvatar}>
//             {user.name.charAt(0).toUpperCase()}
//             <span className={`${styles.statusIndicator} ${user.isSubscribed ? styles.subscribed : styles.unsubscribed}`} 
//                   title={user.isSubscribed ? "Obuna aktiv" : "Obuna yopiq"}></span>
//           </div>
//           {user.role === 'admin' && <span className={styles.adminBadge} title="Administrator">👑</span>}
//         </div>
        
//         <div className={styles.userDetails}>
//           <div className={styles.userMainInfo}>
//             <div>
//               <h3 className={styles.userName}>
//                 {user.name}
//                 {user.profileCompleted ? (
//                   <span className={styles.verifiedBadge} title="Tasdiqlangan profil">✓</span>
//                 ) : (
//                   <span className={styles.unverifiedBadge} title="Profil to'liq to'ldirilmagan">!</span>
//                 )}
//               </h3>
//               <p className={styles.userEmail}>
//                 <a href={`mailto:${user.email}`}>{user.email}</a>
                
//               </p>
//             </div>
            
//             <div className={styles.userMeta}>
//               <span className={styles.userRoleBadge}>
//                 {user.role === 'admin' ? '👑 Admin' : 
//                  user.role === 'employer' ? '💼 Ish beruvchi' : '👤 Foydalanuvchi'}
//               </span>
//               <span className={styles.userJoinDate}>
//                 📅 {new Date(user.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//           </div>

//           <div className={styles.userActions}>
//             <div className={styles.subscriptionStatus}>
//             <div className={styles.subscriptionStatus}>
//               <span className={`${styles.statusText} ${user.isSubscribed ? styles.active : styles.inactive}`}>
//                 {user.isSubscribed ? (
//                   <>
//                     <span className={styles.statusDot}></span>
//                     Obuna aktiv
//                   </>
//                 ) : (
//                   <>
//                     <span className={styles.statusDot}></span>
//                     Obuna yopiq
//                   </>
//                 )}
//               </span>
//             </div>
//             </div>
            
//             <div className={styles.actionButtons}>
//   <button
//     onClick={() => setEditingUser(user)}
//     className={`${styles.actionButton} ${styles.editButton}`}
//     title="Foydalanuvchini tahrirlash"
//   >
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//     </svg>
//     Tahrirlash
//   </button>
  
//   <button
//     onClick={() => handleSubscriptionToggle(user._id, !user.isSubscribed)}
//     className={`${styles.actionButton} ${
//       user.isSubscribed ? styles.unsubscribeButton : styles.subscribeButton
//     }`}
//     title={user.isSubscribed ? "Obunani bekor qilish" : "Obunaga qo'shish"}
//   >
//     {user.isSubscribed ? (
//       <>
//         <span className={styles.statusDot}></span>
//         Obunani o'chirish
//       </>
//     ) : (
//       <>
//         <span className={styles.statusDot}></span>
//         Obunani yoqish
//       </>
//     )}
//   </button>
// </div>
//           </div>
//         </div>
//       </div>
//     ))
//   ) : (
//     <div className={styles.noUsers}>
//       <div className={styles.noDataIllustration}>
//         <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//           <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//           <circle cx="8.5" cy="7" r="4"></circle>
//           <line x1="18" y1="8" x2="23" y2="13"></line>
//           <line x1="23" y1="8" x2="18" y2="13"></line>
//         </svg>
//       </div>
//       <h3 className={styles.noDataTitle}>Yangi foydalanuvchilar mavjud emas</h3>
//       <p className={styles.noDataDescription}>Yaqin orada yangi ro'yxatdan o'tgan foydalanuvchilar shu yerda ko'rinadi</p>
//       <button 
//         onClick={fetchData} 
//         className={`${styles.refreshButton} ${styles.small}`}
//       >
//         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//           <path d="M23 4v6h-6"></path>
//           <path d="M1 20v-6h6"></path>
//           <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
//         </svg>
//         Yangilash
//       </button>
//     </div>
//   )}
// </div>
//                 </div>

//                 <div className={styles.recentSection}>
//                     <h3>Yangi joylangan e'lonlar ({stats.recentJobs.length})</h3>
//                     <input
//                             type="text"
//                             placeholder="🔍 E'lon nomi yoki joylashuv"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className={styles.searchInput}
//                         />
//                     <div className={styles.jobList}>
                        
//                         {filteredJobs.map(job => (
//                             <div key={job._id} className={styles.jobItem}>
//                                 <div className={styles.jobType}>{job.work_type}</div>
//                                 <div className={styles.jobDetails}>
//                                     <h4>{job.work_name}</h4>
//                                     <p>{job.location} | {job.salary}</p>
//                                     <p className={styles.jobMeta}>
//                                         {new Date(job.createdAt).toLocaleString()} |
//                                         {job.accepts_foreigners ? ' 🌍 Chet elliklar uchun' : ''}
//                                     </p>
//                                 </div>
//                                 <div className={styles.jobActions}>
//                                     <button
//                                         onClick={() => handleJobAction(job._id, 'approve')}
//                                         className={styles.smallButton}
//                                     >
//                                         ✅ Tasdiqlash
//                                     </button>
//                                     <button
//                                         onClick={() => handleJobAction(job._id, 'edit')}
//                                         className={styles.smallButton}
//                                     >
//                                         ✏️ Tahrirlash
//                                     </button>
//                                     <button
//                                         onClick={() => handleJobAction(job._id, 'delete')}
//                                         className={styles.smallButton}
//                                     >
//                                         ❌ O'chirish
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}

//                         {stats.recentJobs.length > 0 ? (
//                             stats.recentJobs.map(job => (
//                                 <div key={job._id} className={styles.jobItem}>
//                                     <div className={styles.jobType}>{job.work_type}</div>
//                                     <div className={styles.jobDetails}>
//                                         <h4>{job.work_name}</h4>
//                                         <p>{job.location} | {job.salary}</p>
//                                         <p className={styles.jobMeta}>
//                                             {new Date(job.createdAt).toLocaleString()} |
//                                             {job.accepts_foreigners ? ' 🌍 Chet elliklar uchun' : ''}
//                                         </p>
//                                     </div>
//                                     <div className={styles.jobActions}>
//                                         <button
//                                             onClick={() => handleJobAction(job._id, 'approve')}
//                                             className={styles.smallButton}
//                                         >
//                                             ✅ Tasdiqlash
//                                         </button>
//                                         <button
//                                             onClick={() => handleJobAction(job._id, 'edit')}
//                                             className={styles.smallButton}
//                                         >
//                                             ✏️ Tahrirlash
//                                         </button>
//                                         <button
//                                             onClick={() => handleJobAction(job._id, 'delete')}
//                                             className={styles.smallButton}
//                                         >
//                                             ❌ O'chirish
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className={styles.noData}>Yangi e'lonlar mavjud emas</p>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Admin Actions */}
//             <div className={styles.adminActions}>
//                 <h3>Tezkor Amallar</h3>
//                 <div className={styles.actionButtons}>
//                     <button
//                         onClick={() => handleAction('delete', 'clear-jobs', 'DELETE')}
//                         disabled={loadingState.delete}
//                         className={styles.deleteButton}
//                     >
//                         {loadingState.delete ? 'Ochirilmoqda...' : '🗑 Barcha ishlarni ochirish'}
//                     </button>

//                     <button
//                         onClick={() => handleAction('fake', 'fake-jobs', 'POST')}
//                         disabled={loadingState.fake}
//                         className={styles.secondaryButton}
//                     >
//                         {loadingState.fake ? 'Yaratilmoqda...' : '🧪 Test elonlarini yaratish'}
//                     </button>

//                     <button
//                         onClick={() => handleAction('unsubscribe', 'unsubscribe-all', 'PATCH')}
//                         disabled={loadingState.unsubscribe}
//                         className={styles.warningButton}
//                     >
//                         {loadingState.unsubscribe ? 'Jarayon...' : '📭 Barchani obunadan chiqarish'}
//                     </button>

//                     <button
//                         onClick={() => handleAction('notify', 'notify-users', 'POST')}
//                         disabled={loadingState.notify}
//                         className={styles.primaryButton}
//                     >
//                         {loadingState.notify ? 'Yuborilmoqda...' : '📢 Xabar yuborish (email)'}
//                     </button>
//                 </div>

//                 {/* Action Results */}
//                 <div className={styles.actionResults}>
//                     {resultMsg.delete && <p className={styles.result}>{resultMsg.delete}</p>}
//                     {resultMsg.fake && <p className={styles.result}>{resultMsg.fake}</p>}
//                     {resultMsg.unsubscribe && <p className={styles.result}>{resultMsg.unsubscribe}</p>}
//                     {resultMsg.notify && <p className={styles.result}>{resultMsg.notify}</p>}
//                 </div>
//             </div>
//             {editingJob && (
//   <EditJobModal
//     job={editingJob}
//     onClose={() => setEditingJob(null)}
//     onSave={fetchData}
//   />
// )}

// {editingUser && (
//   <UserManagementModal
//     user={editingUser}
//     onClose={() => setEditingUser(null)}
//     onUpdate={fetchData}
//     onDelete={handleDeleteUser}
//   />
// )}

//         </main>

//     );
// }