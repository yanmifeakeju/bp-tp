export default function checkEmptyRequestPayload(req, res, next) {
  if (req.method !== 'POST' && req.method !== 'PUT') next();

  if (req.headers['content-length'] === '0') {
    res.status(400);
    res.json({ message: 'Payload should not be empty' });
    return;
  }
  next();
}
