import React, { useEffect, useState } from "react";

const History = ({ lat, lon }) => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_API_KEY}&units=M`
        );
        if (!response.ok) throw new Error("Failed to fetch historical data");
        const data = await response.json();
        setHistory(data.data);
      } catch (err) {
        setError("Unable to fetch historical data");
      }
    };

    fetchHistory();
  }, [lat, lon]);

  return (
    <div className="p-4 bg-gray-100 text-black">
      <h2 className="text-xl font-bold">Historical Weather Data</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((day, index) => (
            <div
              key={index}
              className="p-4 bg-gray-200 rounded shadow-lg text-center"
            >
              <p>{new Date(day.datetime).toLocaleDateString()}</p>
              <p>High: {day.max_temp}°C</p>
              <p>Low: {day.min_temp}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
