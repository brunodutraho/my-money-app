const express = require('express')
const router = express.Router()

// Rota protegida para retornar dados do usuário autenticado
router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ errors: ['Usuário não autenticado.'] })
  }

  res.json({
    id: req.user.id,
    name: req.user.name,
    message: 'Perfil acessado com sucesso.',
  })
})

module.exports = router
