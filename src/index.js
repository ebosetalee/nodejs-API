import app from "./app.js";
import { connectToDB } from "./config/database.js";
import logger from "./utils/logger.js";

const port = process.env.PORT || 4044;

connectToDB()
    .then(() => {
        app.listen(port, () => {
            logger.debug(`server is runnng on port: ${port}`);
        });
    })
    .catch(() => {
        logger.error("Database connection failed");
    });

process.on("unhandledRejection", err => {
    logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
    logger.error(err);
    process.exit(1);
});
