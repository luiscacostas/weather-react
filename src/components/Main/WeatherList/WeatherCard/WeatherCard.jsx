import React from "react";
import './WeatherCard.css'

const WeatherCard = ({
  dataItem:{visibility, dt_txt},
  dataTemp:{temp_max, temp_min},
  dataWind:{speed, deg},
  dataWeather:{icon}}
) => {

  const url = `https://openweathermap.org/img/wn/${icon}.png`

  const convertToCelsius = (temperature) => {
    return Math.floor(temperature - 273);
  };
 
  return <article className="contenedor_weather">
    <div className="weather-card-header">
      <p className="weather-date">Fecha {dt_txt}</p>
    </div>
    <div className="weather-card-body">
      <img className="weather-icon" src={url} alt="clima" />
      <div className="weather-info">
        <p className="weather-temperature">Temperatura {convertToCelsius(temp_min)}°C - {convertToCelsius(temp_max)}°C</p>
        <p className="weather-wind">Velocidad del Viento {speed}Km/h</p>
      </div>
    </div>
  </article>
};

export default WeatherCard;