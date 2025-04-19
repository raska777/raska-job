'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NotificationBell from "../components/NotificayionBell";
import SettingsForm from "../components/SettingForm";
import "styles/global.css"


export default function ProfilePage() {
  const { data: session } = useSession();
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  return (
    <div className="p-8">
      {/* 🔙 Butun sahifa uchun ortga tugma */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-400 text-white rounded"
      >
        🔙 Ortga qaytish
      </button>

      {session ? (
        <div>
          {/* Header qismi */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="User profile"
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <span className="text-xl text-white">👤</span>
                )}
              </div>
              <Link href="/post" className="hover:text-blue-500">
                ➕ E’lon berish
              </Link>

              <div>
                <h2 className="text-2xl font-bold">
                  {session.user?.name || "Foydalanuvchi"}
                </h2>
                <p className="text-gray-500">{session.user?.email}</p>
              </div>
            </div>
            <NotificationBell />
          </div>

          {/* Mening e'lonlarim */}
          <div className="mt-6 space-y-3">
            <Link
              href="/my-jobs"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Mening e'lonlarim
            </Link>

            {/* Sozlamalar tugmasi */}
            <button
              onClick={() => setShowSettings(true)}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
            >
              ⚙️ Sozlamalar
            </button>
          </div>

          {/* SettingsForm */}
          {showSettings && (
            <div className="mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="mb-4 px-4 py-2 bg-gray-500 text-white rounded"
              >
                🔙 Ortga
              </button>

              <SettingsForm />
            </div>
          )}

          {/* Chiqish */}
          <div className="mt-6">
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Chiqish
            </button>
          </div>
        </div>
      ) : (
        <p>⛔ Siz tizimga kirmagansiz</p>
      )}
    </div>
  );
}
