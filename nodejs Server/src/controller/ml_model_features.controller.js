import { getWeatherData } from "./weather.controller.js";
import { json } from "express";
import { supabase } from "../config/supabase.js";

const fetchFeatures = async () => {

  try {

    const data = await getWeatherData()

    const now = new Date();
    const hour = now.getHours();

    // Find the weather data for the current hour
    const todayHours = data.days[0].hours;
    const currentHourWeather = todayHours.find(
      (it) => parseInt(it.datetime.split(":")[0], 10) === hour
    );

    console.log("Current hour weather:", currentHourWeather);
    const formattedDataSolar = await buildSolarFeatures(currentHourWeather)
    const formattedDataTotal = await buildTotalEnergyFeatures(currentHourWeather)

    console.log('features', JSON.stringify(formattedDataSolar, null, 2));

    return {
      solarFeatures : formattedDataSolar,
      totalFeatures : formattedDataTotal
    };
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null
  }
};


const buildSolarFeatures = async (weather) => {
    try {
        // Extract hour as integer
  const hour = parseInt(weather.datetime.split(":")[0], 10);

  // Time of day encoding
  const time_of_day = {
    time_of_day_morning: hour >= 6 && hour < 12 ? 1 : 0,
    time_of_day_afternoon: hour >= 12 && hour < 17 ? 1 : 0,
    time_of_day_evening: hour >= 17 && hour < 21 ? 1 : 0,
    time_of_day_night: hour >= 21 || hour < 6 ? 1 : 0,
  };

  // One-hot encode conditions
  const conditions = {
    conditions_Clear: weather.conditions === "Clear" ? 1 : 0,
    conditions_Overcast: weather.conditions === "Overcast" ? 1 : 0,
    conditions_Partially_cloudy: weather.conditions === "Partially cloudy" ? 1 : 0,
    conditions_Rain_Overcast: weather.conditions === "Rain, Overcast" ? 1 : 0,
    conditions_Rain_Partially_cloudy: weather.conditions === "Rain, Partially cloudy" ? 1 : 0,
  };

  const {Solar_lag1,Solar_lag24} = await fetchLagFeaturesSolar()
  console.log('solar lags',Solar_lag1)
  const{Solar_rolling3} = await fetchRolling3Solar()
  
   if (Solar_lag1 == null || Solar_lag24 == null || Solar_rolling3 == null) {
      throw new Error("Lag/Rolling features are missing. Please retry.");
    }


  return {
    humidity: weather.humidity,
    sealevelpressure: weather.pressure,
    visibility: weather.visibility,
    solarradiation: weather.solarradiation,
    solarenergy: weather.solarenergy,
    uvindex: weather.uvindex,
    Solar_rolling3, // You’d calculate this if you have past 3-hour rolling data
    Solar_lag1 ,     // Needs historical lag data
    Solar_lag24 ,    // Needs yesterday’s data
     hour,
    ...time_of_day,
    ...conditions,
  };

    } catch (error) {
         console.error("Error building solar energy features:", error.message);
    throw error; // rethrow so caller can handle (refresh/retry)
    }
  
};



const buildTotalEnergyFeatures = async (weather) =>{
    try {
        // Extract hour as integer
  const hour = parseInt(weather.datetime.split(":")[0], 10);

  // Time of day encoding
  const time_of_day = {
    time_of_day_morning: hour >= 6 && hour < 12 ? 1 : 0,
    time_of_day_afternoon: hour >= 12 && hour < 17 ? 1 : 0,
    time_of_day_evening: hour >= 17 && hour < 21 ? 1 : 0,
    time_of_day_night: hour >= 21 || hour < 6 ? 1 : 0,
  };

  // One-hot encode conditions
  const conditions = {
    conditions_Clear: weather.conditions === "Clear" ? 1 : 0,
    conditions_Overcast: weather.conditions === "Overcast" ? 1 : 0,
    conditions_Partially_cloudy: weather.conditions === "Partially cloudy" ? 1 : 0,
    conditions_Rain_Overcast: weather.conditions === "Rain, Overcast" ? 1 : 0,
    conditions_Rain_Partially_cloudy: weather.conditions === "Rain, Partially cloudy" ? 1 : 0,
  };

  const {Total_lag1,Total_lag24} = await fetchLagFeaturesTotal()
  const {Total_rolling3} = await fetchRolling3Total()

if (Total_lag1 == null || Total_lag24 == null || Total_rolling3 == null) {
      throw new Error("Lag/Rolling features are missing. Please retry.");
    }

  return {  
    sealevelpressure: weather.pressure,
    humidity: weather.humidity,
    Total_rolling3, // You’d calculate this if you have past 3-hour rolling data
    Total_lag1,     // Needs historical lag data
    Total_lag24,    // Needs yesterday’s data
     hour,
    ...time_of_day,
  };
        
    } catch (
        error
    ) {
         console.error("Error building total energy features:", error.message);
    throw error; // rethrow so caller can handle (refresh/retry)
        
    }


}

//as in dataaset we have values from 2021 
// const fetchLagFeaturesSolar = async(currentTime)=>{
//     const now = new Date(currentTime)

//     const lag1 = floorToHour(new Date(now))
//     lag1.setHours(now.getHours()-1)
//     console.log('lag1',lag1)

//     const lag24 = floorToHour(new Date(now))
//     lag24.setDate(now.getDate()-1)

//     //query from supabase

//     const{data : lag1Data, error : lag1Error}= await
//     supabase.from('Model_Dataset')
//     .select('Solar')
//     .eq('time',lag1.toISOString())

//     if(lag1Error) console.error('Lag1 fetch error: ',lag1Error)


//     //query fetching for lag24

//     const{data : lag24Data ,error : lag24Error} = await supabase
//     .from('Model_Dataset')
//     .select('Solar')
//     .eq('time', lag24.toISOString())

//     if(lag24Error) console.error('lag24 fetch error : ',lag24Error)
    
//     return {
//         Solar_lag1 : lag1Data?.[0]?.Solar ?? null,
//         Solar_lag24 : lag24Data?.[0]?.Solar ?? null
//     }

// }

const fetchLagFeaturesSolar = async () => {
  // Last 25 entries sorted by time (so we can get lag1 and lag24)
  const { data, error } = await supabase
    .from("Solar_Dataset")
    .select('"Solar",time')
    .order("time", { ascending: false })
    .limit(25);


  if (error) {
    console.error("Error fetching lag features:", error);
    return { Solar_lag1: null, Solar_lag24: null };
  }

  return {
    Solar_lag1: data[0]?.Solar?? null,   // 1 step behind
    Solar_lag24: data[23]?.Solar ?? null, // 24 steps behind
  };
};


const fetchRolling3Solar = async () => {
  const { data, error } = await supabase
    .from("Solar_Dataset")
    .select('"Solar",time')
    .order("time", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching rolling3:", error);
    return { Solar_rolling3: null };
  }

  const avg =
    data.reduce((sum, row) => sum + (row.Solar ?? 0), 0) / data.length;

  return { Solar_rolling3: avg };
};


const fetchLagFeaturesTotal = async () => {
  // Last 25 entries sorted by time (so we can get lag1 and lag24)
  const { data, error } = await supabase
    .from("Total_Energy_Dataset")
    .select('"Total",time')
    .order("time", { ascending: false })
    .limit(25);


  if (error) {
    console.error("Error fetching lag features:", error);
    return { Total_lag1: null, Total_lag24: null };
  }

  return {
    Total_lag1: data[0]?.Total?? null,   // 1 step behind
    Total_lag24: data[23]?.Total ?? null, // 24 steps behind
  };
};


const fetchRolling3Total = async () => {
  const { data, error } = await supabase
    .from("Total_Energy_Dataset")
    .select('"Total",time')
    .order("time", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching rolling3:", error);
    return { Total_rolling3: null };
  }

  const avg =
    data.reduce((sum, row) => sum + (row.Total ?? 0), 0) / data.length;

  return { Total_rolling3: avg };
};

export {fetchFeatures}