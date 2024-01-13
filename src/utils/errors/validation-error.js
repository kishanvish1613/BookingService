const {StatusCodes} = require('http-status-codes');

class ValidationError extends Error {
    constructor(error){
        super();
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        this.name = "ValidationError";
        this.message = "Not able to validates the data sent in the request";
        this.explantion = explantion;
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = ValidationError;