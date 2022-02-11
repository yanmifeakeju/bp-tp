import express from 'express';
import checkContentTypeHeaderIsApplicationJson from './middlewares/check-content-type-header-is-application-json';
import checkContentTypeHeaderIsSet from './middlewares/check-content-type-header-is-set';
import checkEmptyRequestPayload from './middlewares/check-empty-payload';
import usersRouter from './entities/users';
import errorHandler from './middlewares/error-handler';

const app = express();
app.use(express.json());
app.use(checkEmptyRequestPayload);
app.use(checkContentTypeHeaderIsSet);
app.use(checkContentTypeHeaderIsApplicationJson);

app.use('/v1/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Set up');
});

app.use(errorHandler);

app.listen(process.env.PORT, process.stdout.write(`App initialized on ${process.env.PORT}\n`));
