import { tokenVerifier } from "../utils/jwt.js";
import { StatusCodes } from "http-status-codes";
import ErrorResponse from "../utils/errors/index.js";

const { PRECONDITION_FAILED, NOT_FOUND } = StatusCodes;

const Auth = async (req, _res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new ErrorResponse("No token provided", NOT_FOUND);
    }

    const token = authHeader.split(" ")[1];
    let decodedToken = await tokenVerifier(token);

    if (!decodedToken.id) {
        throw new ErrorResponse("Access Denied! Token Expired", PRECONDITION_FAILED);
    }

    req.user = decodedToken;
    next();
};

export default Auth;
