const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const cors = require('cors');
const {
  validateLogin,
  validateUser,
} = require('./validate/validateRequest');

const routes = require('./routes/index');
const {
  createUser,
  login,
} = require('./controllers/users');
const InternalServerError = require('./middlewares/error');

const { DB_ADDRESS } = require('./config');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
mongoose.connect(DB_ADDRESS);

app.use(cookieParser());
app.use(express.json());

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use(routes);

app.use(errors());
app.use(InternalServerError);

app.listen(PORT, (err) => {
  if (err) console.error('Unable to connect the server: ', err);
  console.log(`🌍 Server listening on port ${PORT}`);
});
