'use client';
import { useState } from 'react';
import { FaTelegramPlane, FaGithub, FaYoutube } from 'react-icons/fa';

export default function CollapsibleFooter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-10 text-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        {isOpen ? '❌ Yopish' : 'ℹ️ Sayt haqida'}
      </button>

      {isOpen && (
        <div className="mt-4 p-6 bg-gray-100 rounded-xl shadow-lg max-w-2xl mx-auto text-left transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2">RaskaJob haqida</h3>
          <p className="text-sm text-gray-600">
            Ushbu platforma orqali siz ish e’lonlari joylashingiz, ish topishingiz
            va o‘z profilingizni yuritishingiz mumkin.
          </p>

          <div className="mt-4 flex gap-4 text-sm">
            <a href="/privacy" className="text-blue-600 hover:underline">Maxfiylik</a>
            <a href="/terms" className="text-blue-600 hover:underline">Shartlar</a>
            <a href="/contact" className="text-blue-600 hover:underline">Aloqa</a>
          </div>

          {/* 🔗 Ijtimoiy tarmoqlar */}
          <div className="mt-6 flex gap-6 text-2xl justify-center text-gray-700">
            <a href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaTelegramPlane />
            </a>
            <a href="https://github.com/your_repo" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
              <FaGithub />
            </a>
            <a href="https://youtube.com/your_channel" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <FaYoutube />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
