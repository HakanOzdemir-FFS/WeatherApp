import React, { useState, useEffect } from "react";

import "./WeatherCard.css";

function WeatherCard(props) {
  const cityName = props.onSetCityName;
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    function WeatherApi() {
      const api_key = "b77df33a0f3ac5b4b707dc648f48d8d4";
      const apiLink = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}&units=metric`;

      fetch(apiLink)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const noonForecasts = data.list.filter((forecast) =>
            forecast.dt_txt.includes("12:00:00")
          );
          const resultWeather = [data.list[0], ...noonForecasts];
          console.table(resultWeather);
          const dailyForecasts = resultWeather.map((forecastItem) => {
            const localDate = new Date(forecastItem.dt_txt);

            const options = {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
            };

            const formattedDate = new Intl.DateTimeFormat(
              "en-US",
              options
            ).format(localDate);

            return {
              weather: forecastItem.weather[0].main,
              icon: `http://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`,
              name: data.city.name,
              degree: Math.floor(forecastItem.main.temp),
              date: formattedDate,
              shortDate: formattedDate.split(",")[0],
              country: data.city.country,
            };
          });

          setWeatherData(dailyForecasts);
        })
        .catch((error) => {
          console.error("Hata:", error);
        });
    }
    WeatherApi();
  }, [cityName]);

  const indexesToShow = [0, 2, 3, 4, 5];

  return (
    <div className="card">
      {props.children}
      <div className="card__city-name">
        {weatherData[0]?.name}, {weatherData[0]?.country}
      </div>
      <div className="card__weather-time">{weatherData[0]?.date}</div>
      <div className="card__weather-degree">
        {weatherData[0]?.degree}&deg; C Now
      </div>
      <div className="card__weather-symbol">
        <img
          className="card-weather-symbol__icon"
          src={weatherData[0]?.icon}
          alt={weatherData[0]?.weather}
        />
      </div>
      <div className="card__bottom">
        {indexesToShow.map((index) => {
          const dailyForecast = weatherData[index];
          if (!dailyForecast) return null;

          return (
            <div key={index} className="card__bottom__card card__bottom__card">
              <div className="card__bottom__card__date">
                {dailyForecast?.shortDate}
              </div>
              <img
                className="card__bottom__card__img"
                src={dailyForecast?.icon}
                alt={dailyForecast?.weather}
              />
              <div className="card__bottom__card__degree">
                {dailyForecast?.degree}&deg; C
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherCard;
