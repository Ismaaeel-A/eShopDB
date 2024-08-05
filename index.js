import express from 'express'
import path from 'path'

//CREATE AN EXPRESS APP
const app = express()
const port = +process.env.PORT || 4000
const router = express.Router()

//MIDDLEWARE
app.use(router, express.static('./static'))

//ENDPOINT
router.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})