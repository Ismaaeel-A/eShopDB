import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { products } from '../model/Products.js'

const productRouter = express.Router()
productRouter.use(bodyParser.json())


productRouter.get('/products', (req, res) => {
    products.fetchProducts(req, res)
})

productRouter.get('/:id', (req, res) => {
    products.fetchProduct(req, res)
})

productRouter.post('/add', (req, res) => {
    products.addProduct(req, res)
})

productRouter.patch('/product/:id', (req, res) => {
    products.editProducts(req, res)
})

productRouter.delete('/product/:id', (req, res) => {
    products.deleteProducts(req, res)
})

export {
    express,
    productRouter

}




















export {
    express,
    productRouter
}