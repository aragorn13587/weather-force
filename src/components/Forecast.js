import React, { useEffect, useState } from "react";

const Forecast = ({ setForecastView, lat, lon }) => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_API_KEY}&units=M`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch forecast data");
        }
        const data = await response.json();
        setForecast(data.data);
      } catch (err) {
        setError("Unable to fetch forecast data");
      }
    };

    fetchForecast();
  }, [lat, lon]);

  return (
    <div className="p-4 bg-blue-600 text-white min-h-screen">
      <button
        onClick={() => setForecastView(false)}
        className="mb-4 bg-white text-blue-600 px-4 py-2 rounded"
      >
        Back to Home
      </button>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="p-4 bg-blue-700 rounded shadow-lg text-center"
            >
              <p>{new Date(day.datetime).toLocaleDateString()}</p>
              <p>{day.temp}°C</p>
              <img
                src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                alt="weather icon"
              />
              <p>{day.weather.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
