import React, { useState } from "react";
import "./App.css";
import { Weather } from "./Weather";

function App() {
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  //   fetch("https://jsonplaceholder.typicode.com/todos/1")
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));

  const [city, setCity] = useState("");
  // console.log(city)
  const [error, setError] = useState<string | null>(null);
  console.log(error);
  const [weather, setWeather] = useState<{
    temp: number;
    description: string;
  } | null>(null);

  const fetchWeather = () => {
    const apiKey = "680ac370ce4c776fcbd3cb7f05c328f8";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          setError("City not found");
          setWeather(null);
        } else {
          setWeather({
            temp: json.main.temp,
            description: json.weather[0].description,
          });
          setError(null);
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setError("An error occurred");
        setWeather(null);
      });
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.currentTarget.value);
          }}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {weather && (
        <Weather temp={weather.temp} description={weather.description} />
      )}
    </div>
  );
}

export default App;
