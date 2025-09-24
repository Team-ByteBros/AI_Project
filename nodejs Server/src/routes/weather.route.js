import {fetchWeather3Days ,fetchWeatherToday} from "../controller/weather.controller.js";
import { Router } from "express";

const router = Router()

router.route('/getWeather3Days').post(fetchWeather3Days)
router.route('/getWeatherToday').post(fetchWeatherToday)


export default router

