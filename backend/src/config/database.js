require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min =
  "O valor '{VALUE}' é menor que o limite mínimo de '{MIN}'"
mongoose.Error.messages.Number.max =
  "O valor '{VALUE}' é maior que o valor máximo de '{MAX}'"
mongoose.Error.messages.String.enum =
  "'{VALUE}' não é válido para o atributo '{PATH}'"

module.exports = mongoose
