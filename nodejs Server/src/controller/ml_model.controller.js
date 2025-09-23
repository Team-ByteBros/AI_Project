import { fetchFeatures } from "./ml_model_features.controller.js";
import { supabase } from "../config/supabase.js";

const predict = async (hour) => {
  try {
    // Fetch features from your weather controller
    const { solarFeatures, totalFeatures } = await fetchFeatures(hour);
    if (!solarFeatures || !totalFeatures) {
      return json({ error: "Features not ready. Please retry." });
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

    const response = await fetch("https://ai-project-jgzr.onrender.com/predict", {
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

    return { predictions, solarFeaturesArray, totalFeaturesArray };
  } catch (error) {
    console.error("Error calling prediction server:", error);
    return null;
    // res.status(500).json({ error: error.message });
  }
};

const predictAndSave24Hr = async (req, res) => {
  //first we will check that for todays prediction has been done or not //to get todays time in UTC created function
  //we will do this by checking todays date and 0 hr entry present or not
  //if present we will do nothing
  //if not present then we will use function to predict the energy
  //energy will be predicted for each hour then it will be saved in the database until 24 hr

  try {
    const { data, error } = await supabase
      .from("Total_Energy_Dataset")
      .select("*")
      .gt("time", getUTCDateTime());
    console.log("data", data);

    if (data.length>0 && data) {
      return res.status(200).json("data is available in database");
    }

    for (let hour = 0; hour < 24; hour++) {
      const { predictions, solarFeaturesArray, totalFeaturesArray } = await predict(hour);
      // Build UTC time for each hour
      const now = new Date();
      const dateStr = `${now.getUTCFullYear()}-${String(
        now.getUTCMonth() + 1
      ).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
      const timeForHour = `${dateStr} ${String(hour).padStart(
        2,
        "0"
      )}:00:00+00`;

      const { data : totalenergydata, error : totalenergyerror} = await supabase
        .from("Total_Energy_Dataset")
        .insert([
          {
            time: timeForHour,
            Total: predictions.total_prediction, // predicted value from FastAPI
            sealevelpressure: totalFeaturesArray[0],
            humidity: totalFeaturesArray[1],
            Total_rolling3: totalFeaturesArray[2],
            Total_lag1: totalFeaturesArray[3],
            Total_lag24: totalFeaturesArray[4],
            hour: totalFeaturesArray[5],
            time_of_day_morning: totalFeaturesArray[6],
            time_of_day_afternoon: totalFeaturesArray[7],
            time_of_day_evening: totalFeaturesArray[8],
            time_of_day_night: totalFeaturesArray[9],
          },
        ]);

        const {data : solarData,error : solarError} = await supabase
        .from('Solar_Dataset')
        .insert([
          {
          time: timeForHour,
          Solar: predictions.solar_prediction,        // predicted solar energy
          humidity: solarFeaturesArray[0],
          sealevelpressure: solarFeaturesArray[1],
          visibility: solarFeaturesArray[2],
          solarradiation: solarFeaturesArray[3],
          solarenergy: solarFeaturesArray[4],
          uvindex: solarFeaturesArray[5],
          conditions: solarFeaturesArray.slice(14, 19).join(","), // conditions_Clear, Overcast, etc.
          Solar_rolling3: solarFeaturesArray[6],
          Solar_lag1: solarFeaturesArray[7],
          Solar_lag24: solarFeaturesArray[8],
          hour: solarFeaturesArray[9],
          time_of_day_morning: solarFeaturesArray[10],
          time_of_day_afternoon: solarFeaturesArray[11],
          time_of_day_evening: solarFeaturesArray[12],
          time_of_day_night: solarFeaturesArray[13],
        },
        ])

    }
    return res.status(200).json({message : "successfully save in database"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

function getUTCDateTime() {
  const now = new Date();

  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day} 00:00:00+00`;
}

export { predict, predictAndSave24Hr };
