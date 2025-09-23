from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import joblib
import numpy as np

# uvicorn main:app --reload command to start the server

app = FastAPI()

# Load models on startup
solar_model = joblib.load('models/solar_model.joblib')
total_model = joblib.load('models/total_model.joblib')

class PredictionInput(BaseModel):
    solar_features: List[float]
    total_features: List[float]

@app.post("/predict")
async def predict(data: PredictionInput):
    solar_features = np.array([data.solar_features])
    total_features = np.array([data.total_features])

    solar_pred = solar_model.predict(solar_features)[0]
    total_pred = total_model.predict(total_features)[0]

    # Convert numpy types to Python native types
    solar_pred = float(solar_pred)
    total_pred = float(total_pred)

    return {
        "solar_prediction": solar_pred,
        "total_prediction": total_pred
    }
