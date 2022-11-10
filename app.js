require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const router = require('./routes');
const err = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const dataBaseUrl = require('./utils/config');

const { PORT = 3000, NODE_ENV, DATA_BASE_URL } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DATA_BASE_URL : dataBaseUrl);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(err);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
