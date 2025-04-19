// app/components/Navbar.tsx
import { useState } from 'react';

const Navbar = ({ onSearch, onCitySelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const cities = ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Qidiruv so'rovini yuborish
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    onCitySelect(city); // Shaharni yuborish
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <select
          className="bg-gray-700 p-2 rounded"
          value={selectedCity}
          onChange={handleCityChange}
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
          onChange={handleSearchChange}
        />

        <button className="bg-blue-500 text-white p-2 rounded">Qidirish</button>
      </div>
    </nav>
  );
};

export default Navbar;
