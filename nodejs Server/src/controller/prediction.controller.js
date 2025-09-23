//not using prediction model


// import { predict } from "./ml_model.controller.js";
// import { getWeatherData } from "./weather.controller.js";
// import { GoogleGenAI } from "@google/genai";

// const ai =new GoogleGenAI({})

// const getPrediction = async(req,res) =>{
//     try {
//         const {batteryCharging} = req.body || 0
//         const {solar_prediction,total_prediction} = await predict()
//         const weatherData = await getWeatherData()
//         console.log('prediction',weatherData.days[0].temp)
//         const response = await ai.models.generateContent({
//             model : 'gemini-2.5-flash',
//             contents : `You are an energy management assistant. Here is the current weather data:
// - Temperature: ${weatherData.days[0].temp}°C
// - Humidity: ${weatherData.days[0].humidity}%
// - Solar Radiation: ${weatherData.days[0].solarradiation} W/m²
// - UV Index: ${weatherData.days[0].uvindex}
// - Cloud Cover: ${weatherData.days[0].cloudcover}

// Predicted solar energy consumption for next 24 hours: ${solar_prediction} kWh
// Predicted total (Solar+Phase) household energy consumption for next 24 hours: ${total_prediction} kWh
// Current battery charge: ${batteryCharging} kWh

// how much solar energy and how much phase energy should be used considering battery charging and weather , predicted usage is given according to previous trends of user.
// give me ans in json as phase_energy_pred and solar_energy_pred
//         `.trim()

//         // Provide recommendations on Explain your reasoning and present recommendations in kWh.at 

//         })
        
//         return res.status(200).json(response.text)        
//     } catch (error) {
//           console.error("Error generating prediction:", error);
//         return res.status(500).json({ error: "Failed to generate prediction" });   
//     }
// }

// export {getPrediction}