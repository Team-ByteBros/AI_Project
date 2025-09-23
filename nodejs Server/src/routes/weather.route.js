import {fetchWeather3Days ,fetchWeatherToday} from "../controller/weather.controller.js";
import { Router } from "express";

const router = Router()

router.route('/getWeather3Days').get(fetchWeather3Days)
router.route('/getWeatherToday').get(fetchWeatherToday)


export default router

