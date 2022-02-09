import express from 'express';
import checkContentTypeHeaderIsApplicationJson from './middlewares/check-content-type-header-is-application-json';
import checkContentTypeHeaderIsSet from './middlewares/check-content-type-header-is-set';
import checkEmptyRequestPayload from './middlewares/check-empty-payload';

const app = express();
app.use(express.json());
app.use(checkEmptyRequestPayload);
app.use(checkContentTypeHeaderIsSet);
app.use(checkContentTypeHeaderIsApplicationJson);

app.post('/users', (req, res) => {
  res.send();
});

app.get('/', (req, res) => {
  res.send('Set up');
});

app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed' && error.expose) {
    res.status(400);
    res.json({ message: 'Payload is not in valid JSON format' });
    return;
  }
  next();
});

app.listen(process.env.PORT, process.stdout.write(`App initialized on ${process.env.PORT}\n`));
