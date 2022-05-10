class ErrorResponse extends Error {
    /**
     * @param {string} message
     * @param {any} statusCode
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

export default ErrorResponse;
