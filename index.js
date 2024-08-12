import express from 'express'
import path from 'path'
import {
    connection as db
} from './config/index.js'
import {
    createToken
} from './middleware/AuthenticateUser.js'
import {
    hash
} from 'bcrypt'
import bodyParser from 'body-parser'

// import { urlencoded } from 'body-parser'

//CREATE AN EXPRESS APP
const app = express()
const port = +process.env.PORT || 4000
const router = express.Router()

//MIDDLEWARE
app.use(router, express.static('./static'), express.json(), express.urlencoded({
    extended: true
}))

router.use(bodyParser.json())

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

router.post('/register', async (req, res) => {
    try {
        let data = req.body
        if (data.pwd) {
            data.pwd = await hash(data.pwd, 12)
            // PAYLOAD
            let user = {
                emailAdd: data.emailAdd,
                pwd: data.pwd
            }

            let strQry = `
        INSERT INTO Users SET ?;
        `

            db.query(strQry, [data], (err) => {
                if (err) {
                    res.json({
                        status: res.statusCode,
                        msg: 'This email is already in use.'
                    })
                } else {
                    const token = createToken(user)
                    res.json({
                        token,
                        msg: 'You are now registered.'
                    })
                }
            })
        }
    } catch (e) {

    }
})

router.patch('/user/:id', async (req, res) => {
    try {
        let data = req.body
        if (data.pwd) {
            data.pwd = await hash(data.pwd, 12)
        }
        const strQry = `
        UPDATE Users SET ? WHERE UserID = ${req.params.id}
        `

        db.query(strQry, [data], (err) => {
            if (err) throw new Error('Unable to update user')
            res.json({
                status: res.statusCode,
                msg: 'User record was updated'
            })
        })

    } catch (e) {
        res.json({
            status: 400,
            msg: e.message
        })
    }
})


router.get('*', (req, res) => {
    res.json({
        status: 404,
        msg: 'resouce not found'
    })
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})