
//weather api call global
//3 days data
const getWeatherData = async(location)=>{
  // const location = "bangalore";
  
  const startDate = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
  const tempDate = new Date()
   tempDate.setDate(tempDate.getDate()+3)
  const endDate = tempDate.toISOString().split('T')[0]
  
  const unitGroup = "metric";

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=${unitGroup}&contentType=json&include=days,hours&key=${process.env.WEATHER_API_KEY}`;
  try {
    const response = await fetch(url)
    if(!response.ok){
      throw new Error(await response.text())
    }

    const data = response.json()
    return data

  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null
  }
}

//separate api to call for weather features
const fetchWeather3Days = async(req, res)=>{
  const {location} = req.body
  const data = await getWeatherData(location)
  return res.status(200).json(
    data
  )
}

const fetchWeatherToday = async(req,res) =>{
  try {
    const {location} = req.body
     const data = await getWeatherData(location)
     const todayDate = new Date().toISOString().split("T")[0]
  const todaydata = data.days.find(day=>day.datetime===todayDate)
  return res.status(200).json(
    todaydata
  )
    
  } catch (error) {
    return res.status(500).json({
      error : "error while fetching weather info for today",
      message : error.message
    })
  }
 
}


export {fetchWeather3Days ,getWeatherData,fetchWeatherToday};
