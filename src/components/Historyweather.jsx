
import React, { useState } from 'react';
import axios from '../config/axiosInstance';

const cities = ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'];

function Historyweather() {
  const [city, setCity] = useState('Delhi');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    setError('');
    setHistory([]);

    if (!from || !to) {
      setError('Please select both from and to dates.');
      return;
    }

    try {
      const res = await axios.get(`/history`, {
        params: { city, from, to },
      });
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch weather history.');
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div className="max-w-lg p-3 sm:p-4 bg-white/30 backdrop-blur-md rounded-2xl shadow-md max-h-[70vh] overflow-y-auto">
        <h2 className="text-base font-semibold mb-3 text-center">Weather History</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border px-2 py-1 rounded-md text-sm"
          >
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border px-2 py-1 rounded-md text-sm"
          />

          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border px-2 py-1 rounded-md text-sm"
          />

          <button
            onClick={fetchHistory}
            className="bg-green-500 text-white text-sm px-2 py-1 rounded-md hover:bg-green-600"
          >
            View
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded-md">
            {error}
          </div>
        )}

        {/* History Results */}
        {history.length > 0 && (
          <div className="mt-4 space-y-2">
            {history.map((entry, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-50 px-2 py-1 rounded text-sm"
              >
                <div>
                  <strong>{new Date(entry.date).toLocaleDateString()}</strong>
                  <p className="text-xs capitalize">{entry.description}</p>
                </div>
                <div className="font-medium">{entry.temperature}°C</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Historyweather;

