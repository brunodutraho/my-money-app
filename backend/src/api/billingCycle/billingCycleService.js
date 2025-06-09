// src/api/billingCycle/billingCycleService.js
const express = require('express')
const BillingCycle = require('./billingCycle')
const router = express.Router()

// Listar todos (com paginação)
router.get('/', async (req, res) => {
  const skip = parseInt(req.query.skip) || 0
  const limit = parseInt(req.query.limit) || 50
  const sort = req.query.sort || 'name'
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {}

  try {
    const docs = await BillingCycle.find(filter).skip(skip).limit(limit).sort(sort)
    res.json(docs)
  } catch (err) {
    res.status(500).json({ errors: [err.message] })
  }
})

// Criar
router.post('/', async (req, res) => {
  try {
    const billingCycle = new BillingCycle(req.body)
    const saved = await billingCycle.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ errors: [err.message] })
  }
})

// Atualizar
router.put('/:id', async (req, res) => {
  try {
    const updated = await BillingCycle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(400).json({ errors: [err.message] })
  }
})

// Deletar
router.delete('/:id', async (req, res) => {
  try {
    await BillingCycle.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ errors: [err.message] })
  }
})

// Contar registros
router.get('/count', async (req, res) => {
  try {
    const count = await BillingCycle.countDocuments()
    res.json({ value: count })
  } catch (err) {
    res.status(500).json({ errors: [err.message] })
  }
})

// Resumo (sumário de créditos e débitos)
router.get('/summary', async (req, res) => {
  try {
    const result = await BillingCycle.aggregate([
      {
        $project: {
          credit: { $sum: '$credits.value' },
          debt: { $sum: '$debts.value' },
        },
      },
      {
        $group: {
          _id: null,
          credit: { $sum: '$credit' },
          debt: { $sum: '$debt' },
        },
      },
      {
        $project: { _id: 0, credit: 1, debt: 1 },
      },
    ])
    res.json(result[0] || { credit: 0, debt: 0 })
  } catch (err) {
    res.status(500).json({ errors: [err.message] })
  }
})

module.exports = router
