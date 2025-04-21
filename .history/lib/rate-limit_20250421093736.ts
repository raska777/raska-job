// lib/rate-limit.ts

// Har bir IP uchun so'rovlar sonini saqlash uchun Map
const limits = new Map<string, { count: number; expiresAt: number }>();

export async function rateLimit(ip: string | null) {
  // Agar IP bo'lmasa, cheklov qo'ymaymiz
  if (!ip) {
    return { isRateLimited: false };
  }

  // So'rovlar chegarasi (5 ta/1 daqiqa)
  const limit = 5;
  const window = 60 * 1000; // 1 daqiqa (millisekundlarda)

  const now = Date.now();
  const entry = limits.get(ip);

  if (entry) {
    // Agar hali vaqt o'tmagan bo'lsa
    if (now < entry.expiresAt) {
      // Agar chegaradan oshib ketgan bo'lsa
      if (entry.count >= limit) {
        return { isRateLimited: true };
      }
      // So'rovlar sonini oshiramiz
      limits.set(ip, { ...entry, count: entry.count + 1 });
    } else {
      // Vaqt o'tgan bo'lsa, eski yozuvni o'chiramiz
      limits.delete(ip);
      // Yangi yozuv qo'shamiz
      limits.set(ip, { count: 1, expiresAt: now + window });
    }
  } else {
    // Yangi IP uchun yozuv yaratamiz
    limits.set(ip, { count: 1, expiresAt: now + window });
  }

  return { isRateLimited: false };
}

// Har soat Mapni tozalash uchun funksiya
function cleanupLimits() {
  const now = Date.now();
  for (const [ip, entry] of limits.entries()) {
    if (now >= entry.expiresAt) {
      limits.delete(ip);
    }
  }
}

// Har soat Mapni tozalash
setInterval(cleanupLimits, 60 * 60 * 1000); // Soatiga 1 marta