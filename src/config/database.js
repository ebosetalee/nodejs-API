import "dotenv/config";
import logger from "../utils/logger.js";
import mongoose from "mongoose";

export async function connectToDB() {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            logger.debug("Connected to Database....");
        })
        .catch(err => {
            logger.error("Error: ", err);
            throw err;
        });
}

export function close() {
    logger.debug("Disconnecting Database....");
    return mongoose.disconnect();
}
