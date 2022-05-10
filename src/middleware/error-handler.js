import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger.js";
const { INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST, PRECONDITION_FAILED } = StatusCodes;

const ErrorHandler = (err, req, res, next) => {
    logger.error(err);
    let error = {
        statusCode: err.statusCode || INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong try again later"
    };

    if (err.name == "ValidationError") {
        if (typeof err.message == "string") {
            error.message = err.message.replace(/"/g, "");
        } else {
            error.message = Object.values(err.errors)
                .map(value => value.message)
                .join(",");
        }

        error.statusCode = PRECONDITION_FAILED;
    }
    if (err.code === 11000) {
        error.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        error.statusCode = BAD_REQUEST;
    }
    if (err.name == "CastError") {
        if (err.path.match(/id/i)) {
            error.message = `No item found with id : ${err.value}`;
        } else {
            logger.debug(err.message.match(/Cast/i));
            error.message = err.message.replace(/"/g, "");
        }
        error.statusCode = NOT_FOUND;
    }

    return res.status(error.statusCode).json({ message: error.message });
};

export default ErrorHandler;
