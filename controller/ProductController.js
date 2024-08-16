import express from 'express'
import bodyParser from 'body-parser'
import { verifyAToken } from '../middleware/AuthenticateUser.js'
import { products } from '../model/index.js'

const productRouter = express.Router()

productRouter.use(bodyParser.json())


productRouter.get('/', verifyAToken, (req, res) => {
    products.fetchProducts(req, res)
})

productRouter.get('/recent', verifyAToken,(req, res) => {
    products.recentProducts(req, res)
})

productRouter.get('/:id', verifyAToken,(req, res) => {
    products.fetchProduct(req, res)
})

productRouter.post('/add', verifyAToken,(req, res) => {
    products.addProduct(req, res)
})

productRouter.patch('/:id', verifyAToken,(req, res) => {
    products.editProducts(req, res)
})

productRouter.delete('/:id', verifyAToken,(req, res) => {
    products.deleteProducts(req, res)
})

export {
    productRouter
}


