// app/components/Navbar.tsx
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon']; // Shaharlar ro‘yxatini qo‘shing

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      
      <div className="flex space-x-4">
        <select
          className="bg-gray-700 p-2 rounded"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Shaharni tanlang</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Qidiruv..."
          className="bg-gray-700 p-2 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className="bg-blue-500 text-white p-2 rounded">Qidirish</button>
      </div>
    </nav>
  );
};

export default Navbar;
