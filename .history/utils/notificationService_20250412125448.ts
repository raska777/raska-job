// utils/notificationService.ts
export const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      
      if (res.ok && data && Array.isArray(data.notifications)) {
        return data.notifications;  // Yaxshi javob bo'lsa, ma'lumotni qaytarish
      } else {
        console.error("Notification endpoint error", data);
        return [];  // Yomon javob bo'lsa, bo'sh array qaytaring
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];  // Xato yuz bersa, bo'sh array qaytaring
    }
  };
  