import dotenv from "dotenv";
import { app } from "./app.js";
import { wakeMLServer } from "./utils/wakeUpMlServer.js";

dotenv.config({ path: "./.env" });

const startServer = async () => {
  const port = process.env.PORT || 8000;

  app.listen(port, async () => {
    console.log(`Server is running at port: ${port}`);

    // Wake the ML server
    await wakeMLServer();
  });
};

startServer();
