import logger from "../../utils/logger.js";
import ErrorResponse from "../../utils/errors/index.js";
import { StatusCodes } from "http-status-codes";
import { hash } from "../../utils/index.js";
import { generateJwtToken } from "../../utils/jwt.js";
import User from "../models/user.js";

const { CREATED, CONFLICT } = StatusCodes;

export const createUser = async (req, res) => {
    logger.debug("Creating new user...");

    const data = req.body;

    const userAvailable = await User.findOne({ $or: [{ email: data.email }, { username: data.username }] });

    if (userAvailable) {
        throw new ErrorResponse("User available", CONFLICT);
    }

    data.password = await hash(data.password);

    const user = await User.create(data);

    Reflect.deleteProperty(user._doc, "password");

    const token = await generateJwtToken(data);

    return res.status(CREATED).json({ message: "User Created Successfully", data: { token, user } });
};
