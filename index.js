import express from 'express'
import path from 'path'
import {
    connection as db
} from './config/index.js'
// import { urlencoded } from 'body-parser'

//CREATE AN EXPRESS APP
const app = express()
const port = +process.env.PORT || 4000
const router = express.Router()

//MIDDLEWARE
app.use(router, express.static('./static'), express.json(), express.urlencoded({
    extended: true
}))

//ENDPOINT
router.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})

router.get('/users', (req, res) => {
    try {
        const strQry = `
            select firstName, lastName, age, emailAdd
            from Users;
            `
        db.query(strQry, (err, results) => {
            `Unable to fetch all users`
            if (err) throw new Error(err);
            res.json({
                status: res.statusCode,
                results
            })
        })
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
        console.log('nope');
    }
})

router.get('/user/:id', (req, res) => {
    try {
        const strQry = `
            select userID, firstName, lastName, age, emailAdd
            from Users WHERE userID = ${req.params.id};
            `

        db.query(strQry, (err, result) => {
            `Unable to fetch user`
            if (err) throw new Error(err);
            res.json({
                status: res.statusCode,
                result: result[0]
            })
        })

        db.query
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
})

router.get('*', (req, res ) => {
    res.json({
        status: 404,
        msg: 'resouce not found'
    })
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})