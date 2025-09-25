import React, { useState, useEffect } from 'react';
import styles from './EnergyDashboard.module.css';

const WeatherCard = ({weatherData}) => {
//   const [weatherData, setWeatherData] = useState({
//     "datetime": "2025-09-24",
//     "datetimeEpoch": 1758652200,
//     "tempmax": 26.4,
//     "tempmin": 19.1,
//     "temp": 22,
//     "feelslikemax": 26.4,
//     "feelslikemin": 19.1,
//     "feelslike": 22,
//     "dew": 19.4,
//     "humidity": 85.8,
//     "precip": 0.3,
//     "precipprob": 100,
//     "precipcover": 12.5,
//     "preciptype": [
//         "rain"
//     ],
//     "snow": 0,
//     "snowdepth": 0,
//     "windgust": 18.7,
//     "windspeed": 14,
//     "winddir": 260.3,
//     "pressure": 1009.6,
//     "cloudcover": 56.9,
//     "visibility": 21.7,
//     "solarradiation": 259.1,
//     "solarenergy": 22.4,
//     "uvindex": 9,
//     "severerisk": 10,
//     "sunrise": "06:23:49",
//     "sunriseEpoch": 1758675229,
//     "sunset": "18:29:15",
//     "sunsetEpoch": 1758718755,
//     "moonphase": 0.08,
//     "conditions": "Rain, Partially cloudy",
//     "description": "Partly cloudy throughout the day with afternoon rain.",
//     "icon": "rain",
//     "stations": [
//         "remote"
//     ],
//     "source": "comb",
//     "hours": [
//         {
//             "datetime": "00:00:00",
//             "datetimeEpoch": 1758652200,
//             "temp": 19.6,
//             "feelslike": 19.6,
//             "humidity": 96.33,
//             "dew": 19,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 11.5,
//             "windspeed": 8.6,
//             "winddir": 251,
//             "pressure": 1012,
//             "visibility": 17.7,
//             "cloudcover": 40.7,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-night",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "01:00:00",
//             "datetimeEpoch": 1758655800,
//             "temp": 19.5,
//             "feelslike": 19.5,
//             "humidity": 96.93,
//             "dew": 19,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 11.9,
//             "windspeed": 8.3,
//             "winddir": 251.4,
//             "pressure": 1011,
//             "visibility": 18.3,
//             "cloudcover": 40.4,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-night",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "02:00:00",
//             "datetimeEpoch": 1758659400,
//             "temp": 19.4,
//             "feelslike": 19.4,
//             "humidity": 96.93,
//             "dew": 18.9,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 11.5,
//             "windspeed": 8.6,
//             "winddir": 249.3,
//             "pressure": 1010,
//             "visibility": 15.7,
//             "cloudcover": 39.6,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-night",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "03:00:00",
//             "datetimeEpoch": 1758663000,
//             "temp": 19.2,
//             "feelslike": 19.2,
//             "humidity": 96.93,
//             "dew": 18.7,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 10.4,
//             "windspeed": 7.9,
//             "winddir": 243.9,
//             "pressure": 1010,
//             "visibility": 18.7,
//             "cloudcover": 46.1,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-night",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "04:00:00",
//             "datetimeEpoch": 1758666600,
//             "temp": 19.2,
//             "feelslike": 19.2,
//             "humidity": 95.72,
//             "dew": 18.5,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 9.4,
//             "windspeed": 7.6,
//             "winddir": 247.3,
//             "pressure": 1010,
//             "visibility": 24.1,
//             "cloudcover": 54.4,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-night",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "05:00:00",
//             "datetimeEpoch": 1758670200,
//             "temp": 19.1,
//             "feelslike": 19.1,
//             "humidity": 95.72,
//             "dew": 18.4,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 9,
//             "windspeed": 7.6,
//             "winddir": 252,
//             "pressure": 1010,
//             "visibility": 24.1,
//             "cloudcover": 61.6,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-night",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "06:00:00",
//             "datetimeEpoch": 1758673800,
//             "temp": 19.8,
//             "feelslike": 19.8,
//             "humidity": 90.5,
//             "dew": 18.2,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 12.2,
//             "windspeed": 8.6,
//             "winddir": 260.4,
//             "pressure": 1010,
//             "visibility": 24.1,
//             "cloudcover": 73,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-night",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "07:00:00",
//             "datetimeEpoch": 1758677400,
//             "temp": 19.6,
//             "feelslike": 19.6,
//             "humidity": 90.48,
//             "dew": 18,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 10.8,
//             "windspeed": 8.3,
//             "winddir": 257,
//             "pressure": 1010,
//             "visibility": 24.1,
//             "cloudcover": 62.9,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-day",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "08:00:00",
//             "datetimeEpoch": 1758681000,
//             "temp": 20.1,
//             "feelslike": 20.1,
//             "humidity": 89.95,
//             "dew": 18.4,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 11.5,
//             "windspeed": 8.3,
//             "winddir": 252.9,
//             "pressure": 1011,
//             "visibility": 24.1,
//             "cloudcover": 47.2,
//             "solarradiation": 53,
//             "solarenergy": 0.2,
//             "uvindex": 1,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-day",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "09:00:00",
//             "datetimeEpoch": 1758684600,
//             "temp": 21.4,
//             "feelslike": 21.4,
//             "humidity": 85.67,
//             "dew": 18.9,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 13,
//             "windspeed": 8.6,
//             "winddir": 253.2,
//             "pressure": 1012,
//             "visibility": 24.1,
//             "cloudcover": 26.5,
//             "solarradiation": 250,
//             "solarenergy": 0.9,
//             "uvindex": 3,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-day",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "10:00:00",
//             "datetimeEpoch": 1758688200,
//             "temp": 23.1,
//             "feelslike": 23.1,
//             "humidity": 79.2,
//             "dew": 19.3,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 15.5,
//             "windspeed": 10.1,
//             "winddir": 258.1,
//             "pressure": 1012,
//             "visibility": 24.1,
//             "cloudcover": 13.8,
//             "solarradiation": 509,
//             "solarenergy": 1.8,
//             "uvindex": 5,
//             "severerisk": 10,
//             "conditions": "Clear",
//             "icon": "clear-day",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "11:00:00",
//             "datetimeEpoch": 1758691800,
//             "temp": 24.7,
//             "feelslike": 24.7,
//             "humidity": 72.83,
//             "dew": 19.5,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 16.6,
//             "windspeed": 11.5,
//             "winddir": 273.2,
//             "pressure": 1011,
//             "visibility": 24.1,
//             "cloudcover": 12.2,
//             "solarradiation": 716,
//             "solarenergy": 2.6,
//             "uvindex": 7,
//             "severerisk": 10,
//             "conditions": "Clear",
//             "icon": "clear-day",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "12:00:00",
//             "datetimeEpoch": 1758695400,
//             "temp": 25.7,
//             "feelslike": 25.7,
//             "humidity": 70.35,
//             "dew": 19.9,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 16.9,
//             "windspeed": 13,
//             "winddir": 274.9,
//             "pressure": 1010,
//             "visibility": 24.1,
//             "cloudcover": 20.8,
//             "solarradiation": 860,
//             "solarenergy": 3.1,
//             "uvindex": 9,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-day",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "13:00:00",
//             "datetimeEpoch": 1758699000,
//             "temp": 26.4,
//             "feelslike": 26.4,
//             "humidity": 68.76,
//             "dew": 20.2,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 16.9,
//             "windspeed": 14,
//             "winddir": 275.8,
//             "pressure": 1009,
//             "visibility": 24.1,
//             "cloudcover": 37.7,
//             "solarradiation": 928,
//             "solarenergy": 3.3,
//             "uvindex": 9,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-day",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "14:00:00",
//             "datetimeEpoch": 1758702600,
//             "temp": 26.4,
//             "feelslike": 26.4,
//             "humidity": 69.61,
//             "dew": 20.4,
//             "precip": 0.1,
//             "precipprob": 100,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": [
//                 "rain"
//             ],
//             "windgust": 16.6,
//             "windspeed": 13.7,
//             "winddir": 270.2,
//             "pressure": 1008,
//             "visibility": 24.1,
//             "cloudcover": 53.5,
//             "solarradiation": 875,
//             "solarenergy": 3.2,
//             "uvindex": 9,
//             "severerisk": 10,
//             "conditions": "Rain, Partially cloudy",
//             "icon": "rain",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "15:00:00",
//             "datetimeEpoch": 1758706200,
//             "temp": 26.1,
//             "feelslike": 26.1,
//             "humidity": 70.42,
//             "dew": 20.3,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": [
//                 "rain"
//             ],
//             "windgust": 16.6,
//             "windspeed": 13.7,
//             "winddir": 270.7,
//             "pressure": 1007,
//             "visibility": 24.1,
//             "cloudcover": 40.2,
//             "solarradiation": 710,
//             "solarenergy": 2.6,
//             "uvindex": 7,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-day",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "16:00:00",
//             "datetimeEpoch": 1758709800,
//             "temp": 25.7,
//             "feelslike": 25.7,
//             "humidity": 72.11,
//             "dew": 20.3,
//             "precip": 0.1,
//             "precipprob": 100,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": [
//                 "rain"
//             ],
//             "windgust": 17.6,
//             "windspeed": 14,
//             "winddir": 271,
//             "pressure": 1007,
//             "visibility": 24.1,
//             "cloudcover": 58.5,
//             "solarradiation": 632,
//             "solarenergy": 2.3,
//             "uvindex": 6,
//             "severerisk": 10,
//             "conditions": "Rain, Partially cloudy",
//             "icon": "rain",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "17:00:00",
//             "datetimeEpoch": 1758713400,
//             "temp": 25,
//             "feelslike": 25,
//             "humidity": 74.71,
//             "dew": 20.2,
//             "precip": 0.1,
//             "precipprob": 100,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": [
//                 "rain"
//             ],
//             "windgust": 18.7,
//             "windspeed": 14,
//             "winddir": 270.2,
//             "pressure": 1007,
//             "visibility": 24.1,
//             "cloudcover": 93.5,
//             "solarradiation": 457,
//             "solarenergy": 1.6,
//             "uvindex": 5,
//             "severerisk": 10,
//             "conditions": "Rain, Overcast",
//             "icon": "rain",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "18:00:00",
//             "datetimeEpoch": 1758717000,
//             "temp": 23.8,
//             "feelslike": 23.8,
//             "humidity": 80.78,
//             "dew": 20.3,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 17.6,
//             "windspeed": 10.8,
//             "winddir": 263.4,
//             "pressure": 1007,
//             "visibility": 24.1,
//             "cloudcover": 96,
//             "solarradiation": 229,
//             "solarenergy": 0.8,
//             "uvindex": 2,
//             "severerisk": 10,
//             "conditions": "Overcast",
//             "icon": "cloudy",
//             "stations": [
//                 "remote"
//             ],
//             "source": "obs"
//         },
//         {
//             "datetime": "19:00:00",
//             "datetimeEpoch": 1758720600,
//             "temp": 22.1,
//             "feelslike": 22.1,
//             "humidity": 87.89,
//             "dew": 20,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 11.5,
//             "windspeed": 9,
//             "winddir": 258.3,
//             "pressure": 1008,
//             "visibility": 24.1,
//             "cloudcover": 100,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Overcast",
//             "icon": "cloudy",
//             "stations": null,
//             "source": "fcst"
//         },
//         {
//             "datetime": "20:00:00",
//             "datetimeEpoch": 1758724200,
//             "temp": 21.2,
//             "feelslike": 21.2,
//             "humidity": 92.3,
//             "dew": 19.9,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 12.2,
//             "windspeed": 9,
//             "winddir": 251.1,
//             "pressure": 1009,
//             "visibility": 24.1,
//             "cloudcover": 96.6,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Overcast",
//             "icon": "cloudy",
//             "stations": null,
//             "source": "fcst"
//         },
//         {
//             "datetime": "21:00:00",
//             "datetimeEpoch": 1758727800,
//             "temp": 20.7,
//             "feelslike": 20.7,
//             "humidity": 94,
//             "dew": 19.7,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 11.5,
//             "windspeed": 8.6,
//             "winddir": 247.5,
//             "pressure": 1010,
//             "visibility": 16.5,
//             "cloudcover": 98.7,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Overcast",
//             "icon": "cloudy",
//             "stations": null,
//             "source": "fcst"
//         },
//         {
//             "datetime": "22:00:00",
//             "datetimeEpoch": 1758731400,
//             "temp": 20.4,
//             "feelslike": 20.4,
//             "humidity": 95.17,
//             "dew": 19.6,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 11.2,
//             "windspeed": 8.3,
//             "winddir": 246.8,
//             "pressure": 1010,
//             "visibility": 13.3,
//             "cloudcover": 84.2,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-night",
//             "stations": null,
//             "source": "fcst"
//         },
//         {
//             "datetime": "23:00:00",
//             "datetimeEpoch": 1758735000,
//             "temp": 20,
//             "feelslike": 20,
//             "humidity": 96.34,
//             "dew": 19.4,
//             "precip": 0,
//             "precipprob": 0,
//             "snow": 0,
//             "snowdepth": 0,
//             "preciptype": null,
//             "windgust": 9.4,
//             "windspeed": 7.6,
//             "winddir": 243.6,
//             "pressure": 1010,
//             "visibility": 11.9,
//             "cloudcover": 66.5,
//             "solarradiation": 0,
//             "solarenergy": 0,
//             "uvindex": 0,
//             "severerisk": 10,
//             "conditions": "Partially cloudy",
//             "icon": "partly-cloudy-night",
//             "stations": null,
//             "source": "fcst"
//         }
//     ]
// });

  const [currentHour, setCurrentHour] = useState(0);

  useEffect(() => {
    const now = new Date();
    setCurrentHour(now.getHours());
  }, []);

  const getCurrentHourData = () => {
    if (weatherData.hours && weatherData.hours.length > currentHour) {
      return weatherData.hours[currentHour];
    }
    return weatherData.hours?.[0] || {};
  };

  const currentData = getCurrentHourData();

  const getWeatherIcon = (conditions) => {
    if (conditions?.toLowerCase().includes('rain')) return '🌧️';
    if (conditions?.toLowerCase().includes('cloudy')) return '☁️';
    if (conditions?.toLowerCase().includes('clear')) return '☀️';
    if (conditions?.toLowerCase().includes('partly')) return '⛅';
    return '🌤️';
  };

  return (
    <div className={`${styles.card} ${styles.weather}`}>
      <div className={styles.cardHeader}>
        <span className={styles.icon}>🌤️</span>
        Weather Forecast
      </div>
      
      <div className={styles.column}>
        {/* Daily Weather Overview */}
        <div className={`${styles.weather} ${styles.desc}`}>
          {weatherData.description}
        </div>
        
        <div className={`${styles.weather} ${styles.temp}`}>
          {weatherData.temp}°C
        </div>

        {/* Daily Stats */}
        <div className={`${styles.weather} ${styles.details}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.5rem' }}>
            <span>High: {weatherData.tempmax}°C</span>
            <span>Low: {weatherData.tempmin}°C</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.5rem' }}>
            <span>Precipitation: {weatherData.precip}mm</span>
            <span>Rain Chance: {weatherData.precipprob}%</span>
          </div>
        </div>

        {/* Current Hour Data */}
        <div className={`${styles.weather} ${styles.next}`}>
          <div style={{ 
            background: '#f3fff6', 
            padding: '0.8rem', 
            borderRadius: '0.7rem', 
            border: '1px solid #b6f7dd', 
            width: '100%',
            marginTop: '0.8rem'
          }}>
            <div style={{ 
              fontWeight: '600', 
              marginBottom: '0.5rem', 
              color: '#107045',
              textAlign: 'center'
            }}>
              Current Hour ({currentHour}:00)
            </div>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span>Temp: {currentData.temp}°C</span>
                <span>{getWeatherIcon(currentData.conditions)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span>Precipitation: {currentData.precip}mm</span>
                <span>Chance: {currentData.precipprob}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span>Cloud Cover: {currentData.cloudcover}%</span>
              </div>
              <div style={{ textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic', color: '#18ab6d' }}>
                {currentData.conditions}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
