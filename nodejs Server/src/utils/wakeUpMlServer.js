import fetch from "node-fetch";

export const wakeMLServer = async () => {
  try {
    const fastApiBaseUrl = "https://ai-project-jgzr.onrender.com";

    console.log("[ML Server] Waking up FastAPI server...");
    const res = await fetch(fastApiBaseUrl);

    if (!res.ok) {
      console.error(`[ML Server] Wake request failed: ${res.status}`);
      return false;
    }

    console.log("[ML Server] Wake request sent successfully. Waiting for server to start...");
    await new Promise(res => setTimeout(res, 5000)); // wait 5 seconds
    console.log("[ML Server] ML server should now be awake ");
    return true;
  } catch (error) {
    console.error("[ML Server] Error waking server:", error);
    return false;
  }
};
