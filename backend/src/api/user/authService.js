const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const User = require('./user')
const secret = process.env.JWT_SECRET

const router = express.Router()

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%]).{8,}/

const sendErrorFromDB = (res, dbErrors) => {
  if (dbErrors.errors) {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({ errors })
  }
  return res.status(400).json({ errors: [dbErrors.message || 'Erro desconhecido'] })
}

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ errors: ['Usuário/Senha inválidos'] })
    }

    const token = jwt.sign({ id: user._id, name: user.name }, secret, {
      expiresIn: '1d',
    })

    res.json({ name: user.name, email: user.email, token })
  } catch (err) {
    return sendErrorFromDB(res, err)
  }
})

// VALIDAR TOKEN
router.post('/validateToken', (req, res) => {
  const token = req.body.token || ''
  jwt.verify(token, secret, (err, decoded) => {
    return res.status(200).json({ valid: !err })
  })
})

// SIGNUP
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (!email.match(emailRegex)) {
    return res.status(400).json({ errors: ['O e-mail informado é inválido'] })
  }

  if (!password.match(passwordRegex)) {
    return res.status(400).json({
      errors: [
        'A senha deve conter uma letra maiúscula, uma minúscula, um número e um caractere especial (mínimo 8 caracteres).',
      ],
    })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ errors: ['As senhas não conferem'] })
  }

  try {
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ errors: ['Usuário já cadastrado'] })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hash })
    await user.save()

    // Autentica após cadastro
    const token = jwt.sign({ id: user._id, name: user.name }, secret, {
      expiresIn: '1d',
    })

    res.status(201).json({ name: user.name, email: user.email, token })
  } catch (err) {
    return sendErrorFromDB(res, err)
  }
})

module.exports = router
