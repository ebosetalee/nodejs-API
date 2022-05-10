import ErrorResponse from "./index.js";

class ValidationError extends ErrorResponse {
    constructor(message, statusCode, metadata) {
        super(message, statusCode);
        this.metadata = metadata;
    }
}

export default ValidationError;
