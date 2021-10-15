import React, { useState } from "react";
import "./App.css";

const api = {
  key: "45700639236c147cba8a68d6122ec0f7",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const datebuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp < 50
            ? "app cold"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="input a city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{datebuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                Currently:{Math.round(weather.main.temp)}°F
              </div>
              <div>feels like:{Math.round(weather.main.feels_like)}°F</div>
              <div>Humidity:{weather.main.humidity}%</div>
              <div className="weather">{weather.weather[0].description}</div>
              <div
                className={
                  typeof weather.weather[0].icon != "undefined"
                    ? weather.weather[0].icon === "03n"
                      ? "nclouds"
                      : weather.weather[0].icon === "04n"
                      ? "nbroken"
                      : weather.weather[0].icon === "01n"
                      ? "nclear"
                      : weather.weather[0].icon === "02n"
                      ? "nfew"
                      : weather.weather[0].icon === "09n"
                      ? "nshower"
                      : weather.weather[0].icon === "10n"
                      ? "nrain"
                      : weather.weather[0].icon === "11n"
                      ? "nthunder"
                      : weather.weather[0].icon === "13n"
                      ? "nsnow"
                      : weather.weather[0].icon === "50n"
                      ? "nmist"
                      : weather.weather[0].icon === "01d"
                      ? "dclear"
                      : weather.weather[0].icon === "02d"
                      ? "dfew"
                      : weather.weather[0].icon === "03d"
                      ? "dclouds"
                      : weather.weather[0].icon === "04d"
                      ? "dbroken"
                      : weather.weather[0].icon === "09d"
                      ? "dshower"
                      : weather.weather[0].icon === "10d"
                      ? "drain"
                      : weather.weather[0].icon === "11d"
                      ? "dthunder"
                      : weather.weather[0].icon === "13d"
                      ? "dsnow"
                      : weather.weather[0].icon === "50d"
                      ? "dmist"
                      : "invis"
                    : "invis"
                }
              ></div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
