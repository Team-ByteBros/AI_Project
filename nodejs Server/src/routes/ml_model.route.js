import { Router } from "express";
import { predict } from "../controller/ml_model.controller.js";

const router = Router()

router.route('/predict').get(predict)

export default router