'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Yangi URL yaratamiz
    const query = new URLSearchParams();
    if (title) query.append('title', title);
    if (location) query.append('location', location);

    // Asosiy sahifaga qidiruv parametrlari bilan o'tamiz
    router.push(`/?${query.toString()}`);
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Brand */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        RaskaJob
      </Link>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Ish nomi..."
          className="border px-3 py-1 rounded w-full md:w-48"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="border px-3 py-1 rounded w-full md:w-48"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Barcha shaharlar</option>
          <option value="Seoul">Seoul</option>
          <option value="Busan">Busan</option>
          <option value="Incheon">Incheon</option>
          <option value="Daegu">Daegu</option>
          <option value="Daejeon">Daejeon</option>
          <option value="Gwangju">Gwangju</option>
          <option value="Suwon">Suwon</option>
          <option value="Ulsan">Ulsan</option>
          <option value="Changwon">Changwon</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
          Qidirish
        </button>
      </form>

      {/* Auth Links */}
      <div className="flex gap-4 items-center">
        {session ? (
          <Link
            href="/profile"
            className="text-blue-600 hover:underline font-medium"
          >
            Profil
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-700 hover:underline"
            >
              Kirish
            </Link>
            <Link
              href="/register"
              className="text-gray-700 hover:underline"
            >
              Ro‘yxatdan o‘tish
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
