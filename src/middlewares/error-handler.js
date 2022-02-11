import { response } from 'express';
import {
  setErrorResponse,
  setHttpStatusCode
} from '../helpers/error-handler-helpers';

export default function errorHandler(error, req, res, next) {
  if (response.headersSent) {
    next(error);
    return;
  }
  // const errorMessage = getErrorMessage(error);

  const errorResponse = setErrorResponse(error);
  const statusCode = setHttpStatusCode(error);

  res.status(statusCode).json({
    status: false,
    ...errorResponse
  });
}
