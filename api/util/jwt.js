const jwt = require('jsonwebtoken');

exports.getSignJwt = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

exports.verifyEmail = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}