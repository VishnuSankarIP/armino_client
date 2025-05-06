import React, { useState } from 'react';
import axios from '../config/axiosInstance';

const cities = ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'];

function Currentweather() {
  const [city, setCity] = useState('Delhi');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setError(''); 
    setData(null); 
    try {
      const res = await axios.get(`/weather/${city}`);
      setData(res.data);
    } catch (err) {
      console.error('Error fetching weather:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to fetch weather data. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <div className="bg-[#FFE5BD] p-8 rounded-[40px] shadow-lg w-full max-w-sm text-center text-[#DB875B]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Today</h3>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="text-sm border rounded-md px-2 py-1 text-[#DB875B]"
          >
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchWeather}
          className="mb-6 bg-[#DB875B] text-white px-4 py-2 rounded-full hover:bg-[#c97348]"
        >
          Get Weather
        </button>

       
        {error && (
          <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
        )}

  
        {data && (
          <div>
            <div className="flex justify-center items-center text-6xl font-bold mb-2">
              <span className="text-5xl mr-2">
                <img
                  src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                  alt="weather-icon"
                />
              </span>
              {data.temperature}°
            </div>
            <p className="text-xl font-semibold mb-2 capitalize">{data.description}</p>
            <p className="text-md mb-1">{city} </p>
            <p className="text-sm mb-1">{new Date(data.date).toDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Currentweather;

