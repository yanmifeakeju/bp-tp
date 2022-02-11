import ErrorResponse from '../lib/errors/error-response';

export default function checkEmptyRequestPayload(req, res, next) {
  if (req.method !== 'POST' && req.method !== 'PUT') next();

  if (req.headers['content-length'] === '0') {
    next(
      new ErrorResponse(
        'header-not-set',
        400,
        'Payload should not be empty',
        'Empty payload not allowed'
      )
    );

    return;
  }
  next();
}
