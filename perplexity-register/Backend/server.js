import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
// import { ask } from "./src/services/ai.service.js";
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const httpServer = http.createServer(app);

initSocket(httpServer);

const startServer = async () => {
  try {
    await connectDB();


    httpServer.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error.message);
    process.exit(1);
  }
};

startServer();
