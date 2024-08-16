import path from 'path'
import { productRouter } from './controller/ProductController.js'
import { userRouter, express } from './controller/UserController.js'
// import { urlencoded } from 'body-parser'

//CREATE AN EXPRESS APP
const app = express()
const port = +process.env.PORT || 4000

//MIDDLEWARE
app.use('/user', userRouter)
app.use('/products',productRouter)
app.use( express.static('./static'), express.json(), express.urlencoded({
    extended: true
}))

//ENDPOINT
app.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})