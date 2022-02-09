export default function checkContentTypeHeaderIsApplicationJson(req, res, next) {
  if (req.method !== 'POST' && req.method !== 'PUT') next();

  if (Number(req.headers['content-length']) > 0 && req.headers['content-type'] && req.headers['content-type'] !== 'application/json') {
    res.status(415);
    res.json({ message: 'The "Content-Type" header must always be "application/json"' });
    return;
  }

  next();
}
