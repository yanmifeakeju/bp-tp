import express from 'express';

const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.json({ message: 'Payload should not be empty' });
    return;
  }
  res.send();
});

app.get('/', (req, res) => {
  res.send('Set up');
});

app.listen(process.env.PORT, process.stdout.write(`App initialized on ${process.env.PORT}`));
