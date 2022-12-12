const express = require("express")
const cors = require('cors');
const { randomUUID } = require('crypto')

const app = express()
app.use(cors())

app.use(express.json());


const products = {
  products: [
    { name: 'Bola', price: 10, id: 'rf48fj4-43dbrf-4m123v-4224vk' },
  ]
}

app.get("/products", (request, response) => {
  return response.json(products)
})

app.post("/products", (request, response) => {
  const { name, price } = request.body
  const newProduct = {
    name,
    price,
    id: randomUUID()
  }
  products.products.push(newProduct)
  return response.json(products)
})

app.delete("/products/:id", (request, response) => {
  const { id } = request.params
  const productIndex = products.products.findIndex((product) => product.id === id)

  products.products.splice(productIndex, 1)
  return response.json({ message: "Produto removido com sucesso!" })
})

app.listen(7001, () => console.log('Listening on port 7001'))