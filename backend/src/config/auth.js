const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  } else {
    const token =
      req.body.token || req.query.token || req.headers['authorization']
    if (!token) {
      return res.status(403).send({ errors: ['Nenhum token fornecido.'] })
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(403)
          .send({ errors: ['Falha ao autenticar o token.'] })
      } else {
        req.decoded = decoded
        next()
      }
    })
  }
}
