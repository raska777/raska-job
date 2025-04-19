'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function SettingsForm() {
  const { data: session, status } = useSession();
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // session yuklanganda formani to‘ldiramiz
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session]);

  const handleUpdate = async () => {
    console.log({ name, email, password });
    alert('⚙️ Profil yangilandi (demo)');
    setEditMode(false);
  };

  if (status === 'loading') {
    return <p>⏳ Yuklanmoqda...</p>;
  }

  if (!session) {
    return <p>⛔ Tizimga kirmagansiz</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Ism</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!editMode}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!editMode}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Yangi parol</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!editMode}
        />
      </div>

      {!editMode ? (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setEditMode(true)}
        >
          ✏️ Tahrirlash
        </button>
      ) : (
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            💾 Saqlash
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => setEditMode(false)}
          >
            🔙 Ortga
          </button>
        </div>
      )}
    </div>
  );
}
