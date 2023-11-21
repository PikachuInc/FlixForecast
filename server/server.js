import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

// import router
//import apiRouter from './routes/api';

const app = express();

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle requests for static files
// app.use(express.static(path.resolve(__dirname, '../src')));
// app.use(express.static('../src'));

app.get('/', (req, res, next) => {
  return res.sendFile(path.resolve(__dirname,'../index.html'));
});

// define route handlers
// app.use('/api', apiRouter);

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

//error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

// module.exports = app;

export default app;
