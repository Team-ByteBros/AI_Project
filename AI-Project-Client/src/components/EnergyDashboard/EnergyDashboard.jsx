import React from 'react';
import styles from './EnergyDashboard.module.css';
import HourPredictionCard from './HourPredictionCard'; 
import TotalPredictionCard from './TotalPredictionCard';
import WeatherCard from './WeatherCard';
import ThreeDayForecastCard from './ThreeDayWeatherCard';
import SevenDayEnergyCard from './SevenDayEnergyCard';
import {TodayEnergyGraph, TodaySolarGraph} from './TodayEnergyGraph';
import { useState, useEffect } from 'react';

const EnergyDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPrediction: null,
    hourPrediction: null,
    weatherData: null,
    forecastData: null,
    energyHistory: null,
    loading: true,
    error: null
  });

  const server = "http://localhost:3000/api/v1/"

const API_ENDPOINTS = {
  totalPrediction: server + 'ml_model/fetchPrediction24Hours',
  hourPrediction: server + 'ml_model/fetchPredictionCurrentHour', 
  weather: server + 'weather/getWeatherToday',
  forecast: server + 'weather/getWeather3Days',
  energyHistory: server + 'ml_model/fetchPrediction7daysPast'
};

const fetchData = async () => {
  try {
    setDashboardData(prev => ({ ...prev, loading: true, error: null }));

    const requestBody = JSON.stringify({ "location": "Pune" });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody
    };

    // Fetch all data concurrently
    const [
      totalResponse,
      hourResponse, 
      weatherResponse,
      forecastResponse,
      energyResponse
    ] = await Promise.all([
      fetch(API_ENDPOINTS.totalPrediction, requestOptions),
      fetch(API_ENDPOINTS.hourPrediction, requestOptions),
      fetch(API_ENDPOINTS.weather, requestOptions),
      fetch(API_ENDPOINTS.forecast, requestOptions),
      fetch(API_ENDPOINTS.energyHistory, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    ]);

    if (!totalResponse.ok || !hourResponse.ok || !weatherResponse.ok || 
        !forecastResponse.ok || !energyResponse.ok) {
      throw new Error('One or more API requests failed');
    }

    const [
      totalPredictionData,
      hourPredictionData,
      weatherData,
      forecastData,
      energyHistoryData
    ] = await Promise.all([
      totalResponse.json(),
      hourResponse.json(),
      weatherResponse.json(),
      forecastResponse.json(),
      energyResponse.json()
    ]);

    console.log(energyHistoryData)

    // const { totalEnergyData, solarData } = totalPredictionData;
    // const { totalEnergy, solarEnergy } = hourPredictionData;
    // // const weather = weatherData;
    // const { days } = forecastData;
    // const { grouped } = energyHistoryData;

    setDashboardData({
      totalPrediction : totalPredictionData,
      hourPrediction : hourPredictionData,
      weatherData,
      forecastData,
      energyHistory : energyHistoryData,
      loading: false,
      error: null
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    setDashboardData(prev => ({
      ...prev,
      loading: false,
      error: error.message
    }));
  }
};


  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Set up periodic refresh every 5 minutes (300000ms)
    const refreshInterval = setInterval(fetchData, 300000);

    // Cleanup interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  // Optional: Refresh data when user returns to tab
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (!document.hidden) {
  //       fetchData();
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  //   return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  // }, []);

  if (dashboardData.loading) {
    return (
      <div className={styles.dashboard}>
        <h1 className={styles.title}>Energy Forecasting Dashboard</h1>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '1.2rem',
          color: '#129b5e'
        }}>
          Loading dashboard data...
        </div>
      </div>
    );
  }

  if (dashboardData.error) {
    return (
      <div className={styles.dashboard}>
        <h1 className={styles.title}>Energy Forecasting Dashboard</h1>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '1.1rem',
          color: '#d32f2f'
        }}>
          <p>Error loading dashboard data: {dashboardData.error}</p>
          <button 
            onClick={fetchData}
            style={{
              padding: '0.8rem 1.5rem',
              background: '#129b5e',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '1rem'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
     <div className={styles.dashboard}>
      <h1 className={styles.title}>Energy Forecasting Dashboard</h1>
      <div className={styles.grid}>
  <TotalPredictionCard data={dashboardData.totalPrediction} />
  <HourPredictionCard data={dashboardData.hourPrediction} />
  <WeatherCard weatherData={dashboardData.weatherData} />
  <ThreeDayForecastCard forecastData={dashboardData.forecastData} />
  {/* <TodayEnergyGraph />
  <TodaySolarGraph /> */}
  <SevenDayEnergyCard data={dashboardData.energyHistory} />
</div>
    </div>
  );
};

export default EnergyDashboard;
