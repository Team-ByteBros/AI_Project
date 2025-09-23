import { Router } from "express";
import { predict,predictAndSave24Hr } from "../controller/ml_model.controller.js";

const router = Router()

router.route('/predict').get(predict) //to get prediction of the total and solar prediction
router.route('/predictAndSave24Hr').get(predictAndSave24Hr)

export default router