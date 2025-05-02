// // // app/components/UserManagementModal.tsx
// // 'use client';

// // import { useState } from 'react';
// // import { toast } from 'react-toastify';
// // import styles from 'styles/editUser.module.css';

// // interface User {
// //   _id: string;
// //   name: string;
// //   email: string;
// //   role: string;
// //   isSubscribed: boolean;
// //   createdAt: string;
// //   subscribedAt?: string;
// //   subscriptionUpdatedAt?: string;
// //   profileCompleted?: boolean;
// // }

// // interface UserManagementModalProps {
// //   user: User;
// //   onClose: () => void;
// //   onUpdate: () => Promise<void>;
// //   onDelete: (userId: string) => Promise<void>;
// // }

// // export default function UserManagementModal({
// //   user,
// //   onClose,
// //   onUpdate,
// //   onDelete,
// // }: UserManagementModalProps) {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [activeTab, setActiveTab] = useState<'info' | 'subscription' | 'danger'>('info');

// //   const handleSubscriptionToggle = async (subscribe: boolean) => {
// //     if (!confirm(`Rostan ham foydalanuvchini obunasini ${subscribe ? "yoqmoqchi" : "o'chirmoqchi"}misiz?`)) {
// //       return;
// //     }
  
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch(`/api/admin/users/${user._id}/subscription`, {
// //         method: 'PATCH',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ subscribe }),
// //       });
  
// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.error || 'Obunani yangilashda xatolik');
// //       }
  
// //       const data = await response.json();
      
// //       // Local stateni yangilaymiz
// //       setCurrentUser(prev => ({
// //         ...prev,
// //         isSubscribed: subscribe,
// //         subscribedAt: subscribe ? new Date().toISOString() : prev.subscribedAt,
// //         subscriptionUpdatedAt: new Date().toISOString()
// //       }));
  
// //       toast.success(data.message);
// //       await onUpdate(); // Parent componentni yangilash
// //     } catch (error) {
// //       toast.error(error instanceof Error ? error.message : 'Obunani yangilashda xatolik');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleDeleteUser = async () => {
// //     if (!confirm(`Haqiqatan ham "${user.name}" foydalanuvchisini o'chirmoqchimisiz?`)) {
// //       return;
// //     }

// //     setIsLoading(true);
// //     try {
// //       await onDelete(user._id);
// //       toast.success('Foydalanuvchi muvaffaqiyatli o\'chirildi');
// //       onClose();
// //     } catch (error) {
// //       toast.error(error instanceof Error ? error.message : 'Foydalanuvchini o\'chirishda xatolik');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const renderUserInfoTab = () => (
// //     <div className={styles.userInfo}>
// //       <div className={styles.infoRow}>
// //         <span className={styles.infoLabel}>ID:</span>
// //         <span className={styles.infoValue}>{user._id}</span>
// //       </div>
// //       <div className={styles.infoRow}>
// //         <span className={styles.infoLabel}>Ism:</span>
// //         <span className={styles.infoValue}>{user.name}</span>
// //       </div>
// //       <div className={styles.infoRow}>
// //         <span className={styles.infoLabel}>Email:</span>
// //         <span className={styles.infoValue}>{user.email}</span>
// //       </div>
// //       <div className={styles.infoRow}>
// //         <span className={styles.infoLabel}>Rol:</span>
// //         <span className={styles.infoValue}>
// //           {user.role === 'admin' ? 'Administrator' : 
// //            user.role === 'employer' ? 'Ish beruvchi' : 'Oddiy foydalanuvchi'}
// //         </span>
// //       </div>
// //       <div className={styles.infoRow}>
// //         <span className={styles.infoLabel}>Yaratilgan sana:</span>
// //         <span className={styles.infoValue}>
// //           {new Date(user.createdAt).toLocaleString()}
// //         </span>
// //       </div>
// //       {user.profileCompleted && (
// //         <div className={styles.infoRow}>
// //           <span className={styles.infoLabel}>Profil holati:</span>
// //           <span className={styles.infoValue}>
// //             {user.profileCompleted ? 'Tasdiqlangan' : 'Tasdiqlanmagan'}
// //           </span>
// //         </div>
// //       )}
// //     </div>
// //   );

// //   const renderSubscriptionTab = () => (
// //     <div className={styles.subscriptionTab}>
// //       <div className={styles.subscriptionStatus}>
// //         <h3>Obuna holati</h3>
// //         <p className={user.isSubscribed ? styles.subscribed : styles.unsubscribed}>
// //           {user.isSubscribed ? '✅ Aktiv obuna' : '❌ Obuna yopiq'}
// //         </p>
// //         {user.subscribedAt && (
// //           <p className={styles.subscriptionDate}>
// //             Obuna boshlangan: {new Date(user.subscribedAt).toLocaleDateString()}
// //           </p>
// //         )}
// //         {user.subscriptionUpdatedAt && (
// //           <p className={styles.subscriptionDate}>
// //             Soʻnggi yangilanish: {new Date(user.subscriptionUpdatedAt).toLocaleDateString()}
// //           </p>
// //         )}
// //       </div>

// //       <div className={styles.subscriptionActions}>
// //         {user.isSubscribed ? (
// //           <button
// //             onClick={() => handleSubscriptionToggle(false)}
// //             className={styles.unsubscribeButton}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? 'Amalga oshirilmoqda...' : 'Obunani bekor qilish'}
// //           </button>
// //         ) : (
// //           <button
// //             onClick={() => handleSubscriptionToggle(true)}
// //             className={styles.subscribeButton}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? 'Amalga oshirilmoqda...' : 'Obunaga qoʻshish'}
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );

// //   const renderDangerZoneTab = () => (
// //     <div className={styles.dangerZone}>
// //       <h3>⚠️ Xavfli zona</h3>
// //       <button
// //         onClick={handleDeleteUser}
// //         className={styles.deleteButton}
// //         disabled={isLoading}
// //       >
// //         {isLoading ? 'Oʻchirilmoqda...' : 'Foydalanuvchini oʻchirish'}
// //       </button>
// //       <p className={styles.warningText}>
// //         Bu amal foydalanuvchi va uning barcha maʼlumotlarini butunlay oʻchiradi!
// //       </p>
// //     </div>
// //   );

// //   return (
// //     <div className={styles.modalOverlay}>
// //       <div className={styles.modalContent}>
// //         <div className={styles.modalHeader}>
// //           <h2>Foydalanuvchini boshqarish: {user.name}</h2>
// //           <button
// //             onClick={onClose}
// //             className={styles.closeButton}
// //             disabled={isLoading}
// //             aria-label="Modalni yopish"
// //           >
// //             &times;
// //           </button>
// //         </div>

// //         <div className={styles.tabContainer}>
// //           <button
// //             className={`${styles.tabButton} ${activeTab === 'info' ? styles.activeTab : ''}`}
// //             onClick={() => setActiveTab('info')}
// //             disabled={isLoading}
// //           >
// //             Asosiy maʼlumotlar
// //           </button>
// //           <button
// //             className={`${styles.tabButton} ${activeTab === 'subscription' ? styles.activeTab : ''}`}
// //             onClick={() => setActiveTab('subscription')}
// //             disabled={isLoading}
// //           >
// //             Obuna
// //           </button>
// //           <button
// //             className={`${styles.tabButton} ${activeTab === 'danger' ? styles.activeTab : ''}`}
// //             onClick={() => setActiveTab('danger')}
// //             disabled={isLoading}
// //           >
// //             Xavfli amallar
// //           </button>
// //         </div>

// //         {activeTab === 'info' && renderUserInfoTab()}
// //         {activeTab === 'subscription' && renderSubscriptionTab()}
// //         {activeTab === 'danger' && renderDangerZoneTab()}

// //         <div className={styles.modalFooter}>
// //           <button
// //             onClick={onClose}
// //             className={styles.secondaryButton}
// //             disabled={isLoading}
// //           >
// //             Yopish
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // app/components/UserManagementModal.tsx
// 'use client';

// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import styles from 'styles/editUser.module.css';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   isSubscribed: boolean;
//   createdAt: string;
//   subscribedAt?: string;
//   subscriptionUpdatedAt?: string;
//   profileCompleted?: boolean;
// }

// interface UserManagementModalProps {
//   user: User;
//   onClose: () => void;
//   onUpdate: () => Promise<void>;
//   onDelete: (userId: string) => Promise<void>;
// }

// export default function UserManagementModal({
//   user,
//   onClose,
//   onUpdate,
//   onDelete,
// }: UserManagementModalProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState<'info' | 'subscription' | 'danger'>('info');
//   const [currentUser, setCurrentUser] = useState<User>(user);

//   const handleSubscriptionToggle = async (subscribe: boolean) => {
//     if (!confirm(`Rostan ham foydalanuvchini obunasini ${subscribe ? "yoqmoqchi" : "o'chirmoqchi"}misiz?`)) {
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch(`/api/admin/users/${currentUser._id}/subscription`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ subscribe }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Obunani yangilashda xatolik');
//       }

//       const data = await response.json();
      
//       // Local stateni yangilash
//       setCurrentUser(prev => ({
//         ...prev,
//         isSubscribed: subscribe,
//         ...(subscribe && { subscribedAt: new Date().toISOString() }),
//         subscriptionUpdatedAt: new Date().toISOString()
//       }));

//       toast.success(data.message);
//       await onUpdate(); // Parent komponentni yangilash
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : 'Obunani yangilashda xatolik');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteUser = async () => {
//     if (!confirm(`Haqiqatan ham "${currentUser.name}" foydalanuvchisini o'chirmoqchimisiz?`)) {
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await onDelete(currentUser._id);
//       toast.success('Foydalanuvchi muvaffaqiyatli o\'chirildi');
//       onClose();
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : 'Foydalanuvchini o\'chirishda xatolik');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderUserInfoTab = () => (
//     <div className={styles.userInfo}>
//       <div className={styles.infoRow}>
//         <span className={styles.infoLabel}>ID:</span>
//         <span className={styles.infoValue}>{currentUser._id}</span>
//       </div>
//       <div className={styles.infoRow}>
//         <span className={styles.infoLabel}>Ism:</span>
//         <span className={styles.infoValue}>{currentUser.name}</span>
//       </div>
//       <div className={styles.infoRow}>
//         <span className={styles.infoLabel}>Email:</span>
//         <span className={styles.infoValue}>{currentUser.email}</span>
//       </div>
//       <div className={styles.infoRow}>
//         <span className={styles.infoLabel}>Rol:</span>
//         <span className={styles.infoValue}>
//           {currentUser.role === 'admin' ? 'Administrator' : 
//            currentUser.role === 'employer' ? 'Ish beruvchi' : 'Oddiy foydalanuvchi'}
//         </span>
//       </div>
//       <div className={styles.infoRow}>
//         <span className={styles.infoLabel}>Yaratilgan sana:</span>
//         <span className={styles.infoValue}>
//           {new Date(currentUser.createdAt).toLocaleString()}
//         </span>
//       </div>
//       {currentUser.profileCompleted && (
//         <div className={styles.infoRow}>
//           <span className={styles.infoLabel}>Profil holati:</span>
//           <span className={styles.infoValue}>
//             {currentUser.profileCompleted ? 'Tasdiqlangan' : 'Tasdiqlanmagan'}
//           </span>
//         </div>
//       )}
//     </div>
//   );

//   const renderSubscriptionTab = () => (
//     <div className={styles.subscriptionTab}>
//       <div className={styles.subscriptionStatus}>
//         <h3>Obuna holati</h3>
//         <p className={currentUser.isSubscribed ? styles.subscribed : styles.unsubscribed}>
//           {currentUser.isSubscribed ? '✅ Aktiv obuna' : '❌ Obuna yopiq'}
//         </p>
//         {currentUser.subscribedAt && (
//           <p className={styles.subscriptionDate}>
//             Obuna boshlangan: {new Date(currentUser.subscribedAt).toLocaleDateString()}
//           </p>
//         )}
//         {currentUser.subscriptionUpdatedAt && (
//           <p className={styles.subscriptionDate}>
//             Soʻnggi yangilanish: {new Date(currentUser.subscriptionUpdatedAt).toLocaleDateString()}
//           </p>
//         )}
//       </div>

//       <div className={styles.subscriptionActions}>
//         {currentUser.isSubscribed ? (
//           <button
//             onClick={() => handleSubscriptionToggle(false)}
//             className={styles.unsubscribeButton}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Amalga oshirilmoqda...' : 'Obunani bekor qilish'}
//           </button>
//         ) : (
//           <button
//             onClick={() => handleSubscriptionToggle(true)}
//             className={styles.subscribeButton}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Amalga oshirilmoqda...' : 'Obunaga qoʻshish'}
//           </button>
//         )}
//       </div>
//     </div>
//   );

//   const renderDangerZoneTab = () => (
//     <div className={styles.dangerZone}>
//       <h3>⚠️ Xavfli zona</h3>
//       <button
//         onClick={handleDeleteUser}
//         className={styles.deleteButton}
//         disabled={isLoading}
//       >
//         {isLoading ? 'Oʻchirilmoqda...' : 'Foydalanuvchini oʻchirish'}
//       </button>
//       <p className={styles.warningText}>
//         Bu amal foydalanuvchi va uning barcha maʼlumotlarini butunlay oʻchiradi!
//       </p>
//     </div>
//   );

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <div className={styles.modalHeader}>
//           <h2>Foydalanuvchini boshqarish: {currentUser.name}</h2>
//           <button
//             onClick={onClose}
//             className={styles.closeButton}
//             disabled={isLoading}
//             aria-label="Modalni yopish"
//           >
//             &times;
//           </button>
//         </div>

//         <div className={styles.tabContainer}>
//           <button
//             className={`${styles.tabButton} ${activeTab === 'info' ? styles.activeTab : ''}`}
//             onClick={() => setActiveTab('info')}
//             disabled={isLoading}
//           >
//             Asosiy maʼlumotlar
//           </button>
//           <button
//             className={`${styles.tabButton} ${activeTab === 'subscription' ? styles.activeTab : ''}`}
//             onClick={() => setActiveTab('subscription')}
//             disabled={isLoading}
//           >
//             Obuna
//           </button>
//           <button
//             className={`${styles.tabButton} ${activeTab === 'danger' ? styles.activeTab : ''}`}
//             onClick={() => setActiveTab('danger')}
//             disabled={isLoading}
//           >
//             Xavfli amallar
//           </button>
//         </div>

//         {activeTab === 'info' && renderUserInfoTab()}
//         {activeTab === 'subscription' && renderSubscriptionTab()}
//         {activeTab === 'danger' && renderDangerZoneTab()}

//         <div className={styles.modalFooter}>
//           <button
//             onClick={onClose}
//             className={styles.secondaryButton}
//             disabled={isLoading}
//           >
//             Yopish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/components/UserManagementModal.tsx
'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from 'styles/editUser.module.css';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isSubscribed: boolean;
  createdAt: string;
  subscribedAt?: string;
  subscriptionUpdatedAt?: string;
  profileCompleted?: boolean;
}

interface UserManagementModalProps {
  user: User;
  onClose: () => void;
  onUpdate: () => Promise<void>;
  onDelete: (userId: string) => Promise<void>;
}

export default function UserManagementModal({
  user,
  onClose,
  onUpdate,
  onDelete,
}: UserManagementModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'subscription' | 'danger'>('info');
  const [currentUser, setCurrentUser] = useState<User>(user); // Local state qo'shildi

  const handleSubscriptionToggle = async (subscribe: boolean) => {
    if (!confirm(`Rostan ham foydalanuvchini obunasini ${subscribe ? "yoqmoqchi" : "o'chirmoqchi"}misiz?`)) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${currentUser._id}/subscription`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscribe }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Obunani yangilashda xatolik');
      }

      const data = await response.json();
      
      // Local stateni yangilash
      setCurrentUser(prev => ({
        ...prev,
        isSubscribed: subscribe,
        ...(subscribe && { subscribedAt: new Date().toISOString() }),
        subscriptionUpdatedAt: new Date().toISOString()
      }));

      toast.success(data.message);
      await onUpdate(); // Parent komponentni yangilash
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Obunani yangilashda xatolik');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!confirm(`Haqiqatan ham "${currentUser.name}" foydalanuvchisini o'chirmoqchimisiz?`)) {
      return;
    }

    setIsLoading(true);
    try {
      await onDelete(currentUser._id);
      toast.success('Foydalanuvchi muvaffaqiyatli o\'chirildi');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Foydalanuvchini o\'chirishda xatolik');
    } finally {
      setIsLoading(false);
    }
  };

  const renderUserInfoTab = () => (
    <div className={styles.userInfo}>
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>ID:</span>
        <span className={styles.infoValue}>{currentUser._id}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Ism:</span>
        <span className={styles.infoValue}>{currentUser.name}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Email:</span>
        <span className={styles.infoValue}>{currentUser.email}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Rol:</span>
        <span className={styles.infoValue}>
          {currentUser.role === 'admin' ? 'Administrator' : 
           currentUser.role === 'employer' ? 'Ish beruvchi' : 'Oddiy foydalanuvchi'}
        </span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Yaratilgan sana:</span>
        <span className={styles.infoValue}>
          {new Date(currentUser.createdAt).toLocaleString()}
        </span>
      </div>
      {currentUser.profileCompleted && (
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Profil holati:</span>
          <span className={styles.infoValue}>
            {currentUser.profileCompleted ? 'Tasdiqlangan' : 'Tasdiqlanmagan'}
          </span>
        </div>
      )}
    </div>
  );

  const renderSubscriptionTab = () => (
    <div className={styles.subscriptionTab}>
      <div className={styles.subscriptionStatus}>
        <h3>Obuna holati</h3>
        <p className={currentUser.isSubscribed ? styles.subscribed : styles.unsubscribed}>
          {currentUser.isSubscribed ? '✅ Aktiv obuna' : '❌ Obuna yopiq'}
        </p>
        {currentUser.subscribedAt && (
          <p className={styles.subscriptionDate}>
            Obuna boshlangan: {new Date(currentUser.subscribedAt).toLocaleDateString()}
          </p>
        )}
        {currentUser.subscriptionUpdatedAt && (
          <p className={styles.subscriptionDate}>
            Soʻnggi yangilanish: {new Date(currentUser.subscriptionUpdatedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className={styles.subscriptionActions}>
        {currentUser.isSubscribed ? (
          <button
            onClick={() => handleSubscriptionToggle(false)}
            className={styles.unsubscribeButton}
            disabled={isLoading}
          >
            {isLoading ? 'Amalga oshirilmoqda...' : 'Obunani bekor qilish'}
          </button>
        ) : (
          <button
            onClick={() => handleSubscriptionToggle(true)}
            className={styles.subscribeButton}
            disabled={isLoading}
          >
            {isLoading ? 'Amalga oshirilmoqda...' : 'Obunaga qoʻshish'}
          </button>
        )}
      </div>
    </div>
  );

  const renderDangerZoneTab = () => (
    <div className={styles.dangerZone}>
      <h3>⚠️ Xavfli zona</h3>
      <button
        onClick={handleDeleteUser}
        className={styles.deleteButton}
        disabled={isLoading}
      >
        {isLoading ? 'Oʻchirilmoqda...' : 'Foydalanuvchini oʻchirish'}
      </button>
      <p className={styles.warningText}>
        Bu amal foydalanuvchi va uning barcha maʼlumotlarini butunlay oʻchiradi!
      </p>
    </div>
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Foydalanuvchini boshqarish: {currentUser.name}</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            disabled={isLoading}
            aria-label="Modalni yopish"
          >
            &times;
          </button>
        </div>

        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === 'info' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('info')}
            disabled={isLoading}
          >
            Asosiy maʼlumotlar
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'subscription' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('subscription')}
            disabled={isLoading}
          >
            Obuna
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'danger' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('danger')}
            disabled={isLoading}
          >
            Xavfli amallar
          </button>
        </div>

        {activeTab === 'info' && renderUserInfoTab()}
        {activeTab === 'subscription' && renderSubscriptionTab()}
        {activeTab === 'danger' && renderDangerZoneTab()}

        <div className={styles.modalFooter}>
          <button
            onClick={onClose}
            className={styles.secondaryButton}
            disabled={isLoading}
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}