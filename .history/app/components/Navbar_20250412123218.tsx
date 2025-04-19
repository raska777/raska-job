import { useState } from 'react';

const Navbar = ({ onCitySelect, onSearch, onSalaryRangeChange, onWorkTypeChange }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [workType, setWorkType] = useState('');

  const cities = ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'];
  const workTypes = ['Full-Time', 'Part-Time', 'Contract'];

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    onCitySelect(city);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSalaryChange = (e) => {
    const salary = e.target.value;
    setSalaryRange(salary);
    onSalaryRangeChange(salary);
  };

  const handleWorkTypeChange = (e) => {
    const type = e.target.value;
    setWorkType(type);
    onWorkTypeChange(type);
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

        <select
          className="bg-gray-700 p-2 rounded"
          value={salaryRange}
          onChange={handleSalaryChange}
        >
          <option value="">Maoshni tanlang</option>
          <option value="Low">Past</option>
          <option value="Medium">O'rtacha</option>
          <option value="High">Yuqori</option>
        </select>

        <select
          className="bg-gray-700 p-2 rounded"
          value={workType}
          onChange={handleWorkTypeChange}
        >
          <option value="">Ish turini tanlang</option>
          {workTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>

        <button className="bg-blue-500 text-white p-2 rounded">Qidirish</button>
      </div>
    </nav>
  );
};

export default Navbar;
