class ErrorResponse extends Error {
  constructor(code, statusCode, message, description) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.description = description;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorResponse);
    }
  }
}

export default ErrorResponse;
