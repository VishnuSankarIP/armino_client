import React from 'react';
import CurrentWeather from './components/Currentweather';
import WeatherHistory from './components/Historyweather';

export default function App() {
  return (
  
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-yellow-100 p-4 sm:p-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
    <CurrentWeather />
    <WeatherHistory />
  </div>
</div>


  );
}
