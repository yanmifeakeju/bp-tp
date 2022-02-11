import ErrorResponse from '../lib/errors/error-response';
import ValidationError from '../lib/errors/validation-error';

/**
 *
 * @param {Error} error
 * @return {string} - string representation of the error object
 */
export function getErrorMessage(error) {
  if (error.stack) {
    return error.stack;
  }

  if (error.toString === 'function') {
    return error.toString();
  }

  return 'No string represent of this error';
}

/**
 *
 * @param {number} statusCode
 * @returns {boolean} - true if statusCode falls between 400 and 500
 */
export function isErrorStatusCode(statusCode) {
  return statusCode >= 400 && statusCode < 600;
}

export function setHttpStatusCode(error) {
  if (error.type === 'entity.parse.failed' && error.expose) {
    return 400;
  }

  const statusCodeFromError = error.status || error.statusCode;

  // If the error object already specified it statusCode
  if (isErrorStatusCode(statusCodeFromError)) {
    return statusCodeFromError;
  }

  return 500;
}

/**
 *
 * @param {Error} err
 * @returns string - appropriate error message
 */
export function setErrorResponse(err) {
  if (err.type === 'entity.parse.failed' && err.expose) {
    return {
      code: 'parse-error',
      message: 'Payload is not valid JSON',
      description: `the request payload ${err.body} is not valid json`
    };
  }

  if (err instanceof ValidationError) {
    return {
      code: 'validation-error',
      message: err.message,
      errors: err.errors
    };
  }

  if (err instanceof ErrorResponse) {
    return {
      code: err.code,
      message: err.message,
      description: err.description
    };
  }

  return null;
}
