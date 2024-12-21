import React, { useEffect, useState } from "react";

const HomeScreen = ({ setForecastView }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("M"); // 'M' for Celsius, 'I' for Fahrenheit
  const [broadcast, setBroadcast] = useState(null);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_API_KEY}&units=${unit}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setWeather(data.data[0]);
      setBroadcast(
        `Weather updated: ${data.data[0].temp}°${unit === "M" ? "C" : "F"}`
      );
    } catch (err) {
      setError("Unable to fetch weather data");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
      () => setError("Location access denied")
    );
  }, [unit]);

  return (
    <div className="flex flex-col items-center p-4 bg-blue-500 text-white min-h-screen">
      {error ? (
        <p>{error}</p>
      ) : weather ? (
        <>
          {broadcast && (
            <p className="bg-yellow-400 text-black p-2 rounded">{broadcast}</p>
          )}
          <h1 className="text-4xl font-bold">{weather.city_name}</h1>
          <p className="text-lg">{weather.weather.description}</p>
          <p className="text-2xl">
            {weather.temp}°{unit === "M" ? "C" : "F"}
          </p>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
            alt="weather icon"
          />
          <button
            onClick={() => setForecastView(true)}
            className="mt-4 bg-white text-blue-500 px-4 py-2 rounded"
          >
            View 7-Day Forecast
          </button>
          <button
            onClick={() => setUnit(unit === "M" ? "I" : "M")}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Switch to {unit === "M" ? "Fahrenheit" : "Celsius"}
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomeScreen;
