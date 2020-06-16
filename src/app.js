import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import debug from 'debug';
import morgan from 'morgan';
import routes from './routes';

const app = express();
const log = debug('dev');
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

if (isProduction) {
  app.use(errorhandler());
}

app.get('/', (req, res) => res.status(301).redirect('/api/v1'));

app.use('/api/v1', routes);

app.use('*', (req, res) =>
  res.status(404).json({
    status: res.statusCode,
    error: 'Resource not found. Double check the url and try again',
  })
);

app.use((err, req, res, next) => {
  if (!isProduction) log(err.stack);
  if (res.headersSent) return next(err);
  return res.status(err.status || 500).json({
    status: res.statusCode,
    error: isProduction ? 'Internal server error' : err.message,
  });
});

app.listen(port, () => {
  log(`Running on port ${port}`);
});

export default app;
