import ErrorResponse from '../lib/errors/error-response';

export default function checkContentTypeHeaderIsSet(req, res, next) {
  if (req.method !== 'POST' && req.method !== 'PUT') next();

  if (req.headers['content-length'] !== '0' && !req.headers['content-type']) {
    next(
      new ErrorResponse(
        'header-not-set',
        400,
        'The "Content-Type" header is not set',
        'The "Content-Type" header must be set for request with a non-empty payload'
      )
    );

    return;
  }

  next();
}
