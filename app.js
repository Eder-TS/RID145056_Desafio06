import express from 'express'
import bd from './src/configs/baseDeDados.js'

const app = express()
const port = 3000

app.use(express.json())

bd.run('CREATE TABLE ecommerce (column TEXT)')
app.get('/', (req, res) => {
  res.send('Olá Mundo!')
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})