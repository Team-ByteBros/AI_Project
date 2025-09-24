import { fetchFeatures } from "./ml_model_features.controller.js";
import { supabase } from "../config/supabase.js";

const getCurrentHourEnergyPrediction = async (req, res) => {
  //first will get call to 24hr save function it will check if the predictions are saved or not
  // if not first predictions will get generated will be stored
  //then in supabase get the data for current hour

  try {
    const {location} = req.body
    await predictAndSave24Hr(location);

    // Get current UTC date and hour
    const now = new Date();
    const currentUTCHour = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        0,
        0,
        0
      )
    );
    const currentHourISO = currentUTCHour.toISOString();

    const { data: totalEnergy, error } = await supabase
      .from("Total_Energy_Dataset")
      .select("Total", "time")
      .eq("time", currentHourISO);

    if (error) {
      return res.status(500).json({
        message: "error while fetching 1 hr data",
        error: error.message,
      });
    }

    const { data: solarEnergy, error: solarError } = await supabase
      .from("Solar_Dataset")
      .select("Solar", "time")
      .eq("time", currentHourISO);

    if (solarError) {
      return res.status(500).json({
        message: "error while fetching 1 hr data",
        error: solarError.message,
      });
    }

    return res.status(200).json({
      totalEnergy,
      solarEnergy,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error while fetching 1 hr data",
      error: error.message,
    });
  }
};

const getPredictionOf24Hours = async (req, res) => {
  //first will check if the values exist or not
  //if not it will create prediction
  //it will check for 24 hours data for that day
  //then it will send to the user

  try {
    const {location} = req.body
    await predictAndSave24Hr(location);
    // Get current UTC date
    const now = new Date();

    const startOfDayUTC = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0
      )
    );
    const endOfDayUTC = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        23,
        0,
        0
      )
    );

    const startISO = startOfDayUTC.toISOString(); // e.g. 2025-09-24T00:00:00.000Z
    const endISO = endOfDayUTC.toISOString(); // e.g., "2025-09-23T23:00:00.000Z"

    const { data: totalEnergyData, error: totalEnergyError } = await supabase
      .from("Total_Energy_Dataset")
      .select("Total", "time")
      .gte("time", startISO)
      .lte("time", endISO)
      .order("time", { ascending: true });

    if (totalEnergyError) {
      return res.status(500).json({
        message: "error while fetching 24 hr data",
        error: totalEnergyError.message,
      });
    }

    const { data: solarData, error: solarError } = await supabase
      .from("Solar_Dataset")
      .select("Solar", "time")
      .gte("time", startISO)
      .lte("time", endISO)
      .order("time", { ascending: true });

    if (solarError) {
      return res.status(500).json({
        message: "error while fetching 24 hr data",
        error: solarError.message,
      });
    }

    return res.status(200).json({
      totalEnergyData,
      solarData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error while fetching 24 hr data",
      error: error.message,
    });
  }
};

const getPredictionDataPast7days = async (req, res) => {
  try {
    //first get time of now
    //get time of 7 day before
    //fetch hourly data of each day

    const now = new Date();

    const pastdate = new Date();
    pastdate.setDate(now.getDate() - 7);

    const { data: totalData, error: totalError } = await supabase
      .from("Total_Energy_Dataset")
      .select("time, Total")
      .gte("time", pastdate.toISOString())
      .lte("time", now.toISOString())
      .order("time", { ascending: true });

    const formatted = totalData?.map((row) => {
      const date = new Date(row.time);
      return {
        day: date.toISOString().split("T")[0], // YYYY-MM-DD
        hour: date.getHours(), // 0–23
        total: row.Total,
      };
    });

    const sorted = formatted.sort((a, b) => {
  if (a.day === b.day) {
    return a.hour - b.hour; // same day → sort by hour
  }
  return new Date(a.day) - new Date(b.day); // different day → sort by date
});

    // assume `formatted` is already sorted by day/hour
const grouped = sorted.reduce((acc, row) => {
  if (!acc[row.day]) {
    acc[row.day] = []; // create array if new date
  }
  acc[row.day].push({
    hour: row.hour,
    total: row.total
  });
  return acc;
}, {});


    return res.status(200).json({
      grouped
    });
  } catch (error) {
    return res.status(500).json({
      error: "error while fetching 7 days data",
      message: error.message,
    });
  }
};

const predict = async (hour,location) => {
  try {
     const fastApiBaseUrl = "https://ai-project-jgzr.onrender.com";

    // Step 1: Wake FastAPI server
    console.log("Waking FastAPI server...");
    await fetch(fastApiBaseUrl);

    // Step 2: Wait a short moment for server to start
    await new Promise(res => setTimeout(res, 3000)); // wait 3 seconds

    // Fetch features from your weather controller
    const { solarFeatures, totalFeatures } = await fetchFeatures(hour,location);
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

    const response = await fetch(
      "https://ai-project-jgzr.onrender.com/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          solar_features: solarFeaturesArray,
          total_features: totalFeaturesArray,
        }),
      }
    );

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

const predictAndSave24Hr = async (location) => {
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

    if (data.length > 0 && data) {
      return { message: "data is available in database" };
    }

    for (let hour = 0; hour < 24; hour++) {
      const { predictions, solarFeaturesArray, totalFeaturesArray } =
        await predict(hour,location);
      // Build UTC time for each hour
      const now = new Date();
      const dateStr = `${now.getUTCFullYear()}-${String(
        now.getUTCMonth() + 1
      ).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
      const timeForHour = `${dateStr} ${String(hour).padStart(
        2,
        "0"
      )}:00:00+00`;

      const { data: totalenergydata, error: totalenergyerror } = await supabase
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

      const { data: solarData, error: solarError } = await supabase
        .from("Solar_Dataset")
        .insert([
          {
            time: timeForHour,
            Solar: predictions.solar_prediction, // predicted solar energy
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
        ]);
    }
    return { message: "successfully save in database" };
  } catch (error) {
    return { error: error.message };
  }
};

function getUTCDateTime() {
  const now = new Date();

  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day} 00:00:00+00`;
}

export {
  predict,
  predictAndSave24Hr,
  getCurrentHourEnergyPrediction,
  getPredictionOf24Hours,
  getPredictionDataPast7days,
};
