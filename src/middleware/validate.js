import ValidationError from "../utils/errors/validation-error.js";
import { StatusCodes } from "http-status-codes";

const { PRECONDITION_FAILED } = StatusCodes;

const validate =
    (schema, stripUnknown = false) =>
    (req, _res, next) => {
        const { value, error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true, stripUnknown });

        if (error) {
            const errorDetails = error.details.map(detail => detail.message).join(", ");

            throw new ValidationError(`Invalid input: ${errorDetails}`, PRECONDITION_FAILED, {
                failed_fields: error.details.map(err => err.path.join("."))
            });
        }

        Object.assign(req, value);
        return next();
    };

export default validate;
