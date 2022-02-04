import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Set up');
});

app.listen(3000, process.stdout.write('App initialization'));
