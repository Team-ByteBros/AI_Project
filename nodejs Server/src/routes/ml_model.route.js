import { Router } from "express";
import { predict,predictAndSave24Hr,getCurrentHourEnergyPrediction,getPredictionOf24Hours,getPredictionDataPast7days } from "../controller/ml_model.controller.js";

const router = Router()

// router.route('/predict').get(predict) //to get prediction of the total and solar prediction
// router.route('/predictAndSave24Hr').get(predictAndSave24Hr)
router.route('/fetchPredictionCurrentHour').get(getCurrentHourEnergyPrediction)
router.route('/fetchPrediction24Hours').get(getPredictionOf24Hours)
router.route('/fetchPrediction7daysPast').get(getPredictionDataPast7days)

export default router