import ErrorResponse from '../lib/errors/error-response';

const checkContentTypeHeaderIsApplicationJson = (req, res, next) => {
  if (req.method !== 'POST' && req.method !== 'PUT') next();

  if (
    Number(req.headers['content-length']) > 0 &&
    req.headers['content-type'] &&
    req.headers['content-type'] !== 'application/json'
  ) {
    next(
      new ErrorResponse(
        'incorrect-content-header',
        415,
        '"Content-Type" header is not "application/json"',
        'The "Content-Type" header must always be "application/json"'
      )
    );
    return;
  }

  next();
};

export default checkContentTypeHeaderIsApplicationJson;
