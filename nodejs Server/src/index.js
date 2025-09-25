import dotenv from "dotenv";
import { app } from "./app.js";
import { wakeMLServer } from "./utils/wakeUpMlServer.js";
import cron from "node-cron";
import axios from "axios";

dotenv.config({ path: "./.env" });

const startServer = async () => {
  const port = process.env.PORT || 8000;

  app.listen(port, async () => {
    console.log(`Server is running at port: ${port}`);

    // Wake the ML server
  });
};

const FASTAPI_URL = "https://ai-project-jgzr.onrender.com/health"; // make sure you have a simple health route

cron.schedule("*/12 * * * *", async () => {
  try {
    await axios.get(FASTAPI_URL);
    console.log("Pinged FastAPI to keep alive");
  } catch (err) {
    console.error("Ping failed:", err.message);
  }
});

startServer();
