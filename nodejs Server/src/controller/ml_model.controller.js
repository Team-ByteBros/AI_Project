import { fetchFeatures } from "./ml_model_features.controller.js";
import { supabase } from "../config/supabase.js";

const predict = async (req,res) => {
  try {
    // Fetch features from your weather controller
    const { solarFeatures, totalFeatures } = await fetchFeatures();
    if (!solarFeatures || !totalFeatures) {
  return res.status(503).json({ error: "Features not ready. Please retry." });
}

  const solarFeaturesArray = [
  solarFeatures.humidity,
  solarFeatures.sealevelpressure,
  solarFeatures.visibility,
  solarFeatures.solarradiation,
  solarFeatures.solarenergy,
  solarFeatures.uvindex,
  solarFeatures.Solar_rolling3,
  solarFeatures.Solar_lag1,
  solarFeatures.Solar_lag24,
  solarFeatures.hour,
  solarFeatures.time_of_day_morning,
  solarFeatures.time_of_day_afternoon,
  solarFeatures.time_of_day_evening,
  solarFeatures.time_of_day_night,
  solarFeatures.conditions_Clear,
  solarFeatures.conditions_Overcast,
  solarFeatures.conditions_Partially_cloudy,
  solarFeatures.conditions_Rain_Overcast,
  solarFeatures.conditions_Rain_Partially_cloudy,
];


const totalFeaturesArray = [
  totalFeatures.sealevelpressure,
  totalFeatures.humidity,
  totalFeatures.Total_rolling3,
  totalFeatures.Total_lag1,
  totalFeatures.Total_lag24,
  totalFeatures.hour,
  totalFeatures.time_of_day_morning,
  totalFeatures.time_of_day_afternoon,
  totalFeatures.time_of_day_evening,
  totalFeatures.time_of_day_night,
];



    // Log arrays to check before sending
    // console.log("Solar Features Array:", solarFeaturesArray);
    // console.log("Total Features Array:", totalFeaturesArray);

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        solar_features: solarFeaturesArray,
        total_features: totalFeaturesArray,
      }),
    });

    // Log raw text if JSON parse fails
    const text = await response.text();
    console.log("FastAPI response:", text);

    // Parse JSON only if valid
    const predictions = JSON.parse(text);

    return res.status(200).json(predictions)

  } catch (error) {
    console.error("Error calling prediction server:", error);
    return null
    // res.status(500).json({ error: error.message });
  }
};


const predictAndSave24Hr = async(req,res)=>{
  //first we will check that for todays prediction has been done or not //to get todays time in UTC created function
  //we will do this by checking todays date and 0 hr entry present or not
  //if present we will do nothing
  //if not present then we will use function to predict the energy 
  //energy will be predicted for each hour then it will be saved in the database until 24 hr

  try {
     const {data,error} = await supabase.
  from('Total_Energy_Dataset')
  .select('*')
  .gt('time',getUTCDateTime())

  } catch (error) {
    
  }
 

}

function getUTCDateTime() {
  const now = new Date();

  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day} 00:00:00+00`;
}






export {predict,predictAndSave24Hr}