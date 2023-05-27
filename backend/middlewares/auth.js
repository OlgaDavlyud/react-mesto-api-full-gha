const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;
  const { authorization } = req.headers;

  if (!authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError('Требуется авторизация'));
  }

  const token = authorization.split('Bearer ')[1];
  let payload;

  // if (!token) {
  //   next(new UnauthorizedError('Необходима авторизация'));
  //   return;
  // }

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
