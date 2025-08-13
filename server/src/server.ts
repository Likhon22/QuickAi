/* eslint-disable no-undef */
import { app } from "./app.js";
import DatabaseConfig from "./app/config/database.js";
import config from "./app/config/index.js";

async function startServer(): Promise<void> {
  try {
    const db = DatabaseConfig.getInstance();
    const connection = await db.testConnection();
    if (!connection.success) {
      console.log(`Database connection failed: ${connection.error}`);
      process.exit(1);
    }
    console.log(
      `Database connection successful: ${connection.version}  latency: ${connection.latency}ms timestamp: ${connection.timestamp}`
    );
     app.listen(config.port, () => {
       console.log(`🚀 Server running on http://localhost:${config.port}`);
     });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

startServer();
