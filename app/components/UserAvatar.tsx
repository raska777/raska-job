

// app/components/UserAvatar.tsx
'use client';

import styles from '@/styles/admin.module.css';

interface UserAvatarProps {
  user: {
    name?: string | null;
    email?: string | null;
    isSubscribed: boolean;
    role?: string;
  };
}

export default function UserAvatar({ user }: UserAvatarProps) {
  const getInitial = () => {
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <div className={styles.userAvatarContainer}>
      <div className={styles.userAvatar}>
        {getInitial()}
        <span className={`${styles.statusIndicator} ${user.isSubscribed ? styles.subscribed : styles.unsubscribed}`} 
              title={user.isSubscribed ? "Obuna aktiv" : "Obuna yopiq"}></span>
      </div>
      {user.role === 'admin' && <span className={styles.adminBadge} title="Administrator">👑</span>}
    </div>
  );
}