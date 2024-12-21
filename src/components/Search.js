import React, { useState } from "react";

const Search = ({ setWeather, setSearchView }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const searchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${query}&key=${process.env.REACT_APP_WEATHER_API_KEY}&units=M`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      const weather = data.data[0];
      setSearchResult(weather);
      setWeather(weather);
      setError(null);
    } catch (err) {
      setError("Unable to fetch weather data");
      setSearchResult(null);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Search Weather</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full max-w-md"
      />
      <button
        onClick={searchWeather}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {searchResult && (
        <div className="mt-4 p-4 bg-white rounded shadow w-full max-w-md">
          <h3 className="text-xl font-bold">{searchResult.city_name}</h3>
          <p>{searchResult.weather.description}</p>
          <p>{searchResult.temp}°C</p>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${searchResult.weather.icon}.png`}
            alt="Weather Icon"
            className="mx-auto"
          />
        </div>
      )}
      <button
        onClick={() => setSearchView(false)}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Search;
