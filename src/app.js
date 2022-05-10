import "dotenv/config";
import "express-async-errors";
import express from "express";
import logger from "./utils/logger.js";
import ErrorHandler from "./middleware/error-handler.js";
import v1Router from "./v1/index.js"

const app = express();

process.on("uncaughtException", err => {
    logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    logger.error(err);
    process.exit(1);
});

app.use(express.json());

app.use("/api/v1", v1Router);

app.use(ErrorHandler);

export default app;
