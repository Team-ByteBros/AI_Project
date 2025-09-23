import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true}
))

app.use(express.json({
    limit : "16kb"
}))

app.use(express.urlencoded({//this is for parsing urlencoded data
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))


import weatherRoutes from './routes/weather.route.js'
import mlModelRoutes from './routes/ml_model.route.js'
// import predictionRouter from './routes/prediction.route.js' //not using this

app.use('/api/v1/weather',weatherRoutes)
app.use('/api/v1/ml_model',mlModelRoutes)
// app.use('/api/v1/predict',predictionRouter)

export {app}