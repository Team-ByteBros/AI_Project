import { Router } from "express";
import { predict } from "../controller/ml_model.controller.js";

const router = Router()

router.route('/predict').get(predict) //to get prediction of the total and solar prediction

export default router