import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import Forecast from "./components/Forecast";
import Search from "./components/Search";
import History from "./components/History";

function App() {
  const [forecastView, setForecastView] = useState(false);
  const [searchView, setSearchView] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [weather, setWeather] = useState(null);

  return (
    <div className="App">
      {forecastView ? (
        <Forecast
          setForecastView={setForecastView}
          lat={location.lat}
          lon={location.lon}
        />
      ) : searchView ? (
        <Search
          setWeather={(data) => {
            setWeather(data);
            setSearchView(false);
          }}
          setSearchView={setSearchView}
        />
      ) : weather ? (
        <History lat={location.lat} lon={location.lon} />
      ) : (
        <HomeScreen setForecastView={setForecastView} />
      )}
      <button
        onClick={() => setSearchView(true)}
        className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Search Weather
      </button>
    </div>
  );
}

export default App;
