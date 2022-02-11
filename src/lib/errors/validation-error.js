class ValidationError extends Error {
  constructor(message, errors = undefined) {
    super(message);
    this.statusCode = 400;
    this.errors = errors;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

export default ValidationError;
