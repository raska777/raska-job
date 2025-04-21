// 'use client';

// import { useSession } from 'next-auth/react';
// import { useState, useEffect } from 'react';

// export default function SettingsForm() {
//   const { data: session, status } = useSession();
//   const [editMode, setEditMode] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     isSubscribed: false,
//   });

//   // Sessiyadan foydalanuvchi ma'lumotlarini yuklaymiz
//   useEffect(() => {
//     if (session?.user) {
//       setFormData({
//         name: session.user.name || '',
//         email: session.user.email || '',
//         password: '',
//         isSubscribed: false, // Bu qiymatni backenddan olish mumkin
//       });

//       // Backenddan `isSubscribed` qiymatini olish (agar mavjud bo‘lsa)
//       fetch(`/api/user-info?email=${session.user.email}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (data?.isSubscribed !== undefined) {
//             setFormData((prev) => ({ ...prev, isSubscribed: data.isSubscribed }));
//           }
//         })
//         .catch((err) => console.error("Foydalanuvchi ma'lumotini olishda xatolik:", err));
//     }
//   }, [session]);

//   const handleUpdate = async () => {
//     try {
//       const res = await fetch('/api/settings', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           name: formData.name,
//           password: formData.password,
//           isSubscribed: formData.isSubscribed,
//         }),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         alert('✅ Sozlamalar yangilandi');
//         setEditMode(false);
//       } else {
//         alert('❌ Xatolik: ' + result.error);
//       }
//     } catch (error) {
//       console.error("Sozlamalarni saqlashda xatolik:", error);
//       alert("⚠️ Sozlamalarni saqlab bo‘lmadi");
//     }
//   };

//   if (status === 'loading') return <p>⏳ Yuklanmoqda...</p>;
//   if (!session) return <p>⛔ Tizimga kirmagansiz</p>;

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <div className="mb-4">
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             checked={formData.isSubscribed}
//             onChange={(e) =>
//               setFormData({ ...formData, isSubscribed: e.target.checked })
//             }
//             disabled={!editMode}
//           />
//           <span>Yangi ish e’lonlaridan email orqali xabardor bo‘lish</span>
//         </label>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Ism</label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           disabled={!editMode}
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Email</label>
//         <input
//           type="email"
//           className="w-full p-2 border rounded"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           disabled
//         />
//       </div>

//       <div className="mb-6">
//         <label className="block text-sm font-medium mb-1">Yangi parol</label>
//         <input
//           type="password"
//           className="w-full p-2 border rounded"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           disabled={!editMode}
//         />
//       </div>

//       {!editMode ? (
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded"
//           onClick={() => setEditMode(true)}
//         >
//           ✏️ Tahrirlash
//         </button>
//       ) : (
//         <div className="flex space-x-4">
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             onClick={handleUpdate}
//           >
//             💾 Saqlash
//           </button>
//           <button
//             className="bg-gray-400 text-white px-4 py-2 rounded"
//             onClick={() => setEditMode(false)}
//           >
//             🔙 Ortga
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function SettingsForm() {
  const { data: session, status } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isSubscribed: false,
  });

  // Foydalanuvchi ma'lumotlarini yuklash
  useEffect(() => {
    if (session?.user) {
      setLoading(true);
      
      // Google foydalanuvchisi ekanligini tekshirish
      const googleUser = session.user.provider === 'google';
      setIsGoogleUser(googleUser);

      // Avval formani tozalash
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        password: '',
        isSubscribed: false,
      });

      // Backenddan foydalanuvchi ma'lumotlarini olish
      fetch('/api/user-info')
        .then(async (res) => {
          if (!res.ok) throw new Error('Failed to fetch user info');
          return await res.json();
        })
        .then((data) => {
          setFormData({
            name: data.name || session.user.name || '',
            email: session.user.email || '',
            password: '',
            isSubscribed: data.isSubscribed || false,
          });
        })
        .catch((err) => {
          console.error("Foydalanuvchi ma'lumotini olishda xatolik:", err);
          // Agar ma'lumot olishda xatolik bo'lsa, sessiondagi asosiy ma'lumotlarni ko'rsatish
          setFormData({
            name: session.user.name || '',
            email: session.user.email || '',
            password: '',
            isSubscribed: false,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [session]);

  const handleUpdate = async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          ...(!isGoogleUser && { password: formData.password }), // Google foydalanuvchilari uchun parolni yuborma
          isSubscribed: formData.isSubscribed,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert('✅ Sozlamalar yangilandi');
        setEditMode(false);
        // Yangilangan ma'lumotlarni qayta yuklash
        window.location.reload();
      } else {
        alert('❌ Xatolik: ' + (result.error || 'Noma\'lum xatolik'));
      }
    } catch (error) {
      console.error("Sozlamalarni saqlashda xatolik:", error);
      alert("⚠️ Sozlamalarni saqlab bo'lmadi");
    }
  };

  if (status === 'loading' || loading) return <p className="text-center py-8">⏳ Yuklanmoqda...</p>;
  if (!session) return <p className="text-center py-8">⛔ Tizimga kirmagansiz</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sozlamalar</h2>
      
      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isSubscribed}
            onChange={(e) =>
              setFormData({ ...formData, isSubscribed: e.target.checked })
            }
            disabled={!editMode}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-700">Yangi ish e'lonlaridan email orqali xabardor bo'lish</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Ism</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={!editMode}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          value={formData.email}
          readOnly
        />
        {isGoogleUser && (
          <p className="text-xs text-gray-500 mt-1">Google hisobi orqali ulanilgan</p>
        )}
      </div>

      {!isGoogleUser && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Yangi parol</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={!editMode}
            placeholder={editMode ? "O'zgartirmaslik uchun bo'sh qoldiring" : ""}
          />
          {editMode && (
            <p className="text-xs text-gray-500 mt-1">Parolni o'zgartirmaslik uchun maydonni bo'sh qoldiring</p>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-3 mt-8">
        {!editMode ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            onClick={() => setEditMode(true)}
          >
            ✏️ Tahrirlash
          </button>
        ) : (
          <>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition-colors"
              onClick={() => setEditMode(false)}
            >
              🔙 Bekor qilish
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              onClick={handleUpdate}
            >
              Saqlash
            </button>
          </>
        )}
      </div>
    </div>
  );
}
