'use client';
import { useState } from 'react';

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
            va o‘z profilingizni yuritishingiz mumkin. Barcha ma’lumotlar himoyalangan
            va zamonaviy texnologiyalar asosida ishlaydi.
          </p>
          <div className="mt-4 flex gap-4">
            <a href="/privacy" className="text-blue-600 hover:underline text-sm">Maxfiylik</a>
            <a href="/terms" className="text-blue-600 hover:underline text-sm">Shartlar</a>
            <a href="/contact" className="text-blue-600 hover:underline text-sm">Aloqa</a>
          </div>
        </div>
      )}
    </div>
  );
}
