import express from 'express'
import bodyParser from 'body-parser'
import { verifyAToken } from '../middleware/AuthenticateUser.js'
import { products } from '../model/index.js'

const productRouter = express.Router()

productRouter.use(bodyParser.json())


productRouter.get('/', (req, res) => {
    products.fetchProducts(req, res)
})

productRouter.get('/recent', (req, res) => {
    products.recentProducts(req, res)
})

productRouter.get('/:id', (req, res) => {
    products.fetchProduct(req, res)
})

productRouter.post('/add', (req, res) => {
    products.addProduct(req, res)
})

productRouter.patch('/:id', (req, res) => {
    products.editProducts(req, res)
})

productRouter.delete('/:id', (req, res) => {
    products.deleteProducts(req, res)
})

export {
    productRouter
}


