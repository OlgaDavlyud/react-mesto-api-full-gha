require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  validateLogin,
  validateUser,
} = require('./validate/validateRequest');
const { DB_ADDRESS } = require('./config');
const routes = require('./routes/index');
const {
  createUser,
  login,
} = require('./controllers/users');
const InternalServerError = require('./middlewares/error');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
mongoose.connect(DB_ADDRESS);

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(InternalServerError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
