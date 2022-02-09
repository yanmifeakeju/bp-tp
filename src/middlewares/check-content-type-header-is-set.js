export default function checkContentTypeHeaderIsSet(req, res, next) {
  if (req.method !== 'POST' && req.method !== 'PUT') next();

  if (req.headers['content-length'] !== '0' && !req.headers['content-type']) {
    res.status(400);
    res.json({ message: 'The "Content-Type" header must be set for request with a non-empty payload' });
    return;
  }

  next();
}
