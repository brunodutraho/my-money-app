const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, 'Email inválido'],
    },
    password: { type: String, min: 6, max: 12, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
