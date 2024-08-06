import {
    createPool
} from "mysql2"
import 'dotenv/config'
let connection = createPool({
    host: process.env.hostDb,
    password: process.env.pwdDb,
    user: process.env.userDb,
    database: process.env.dbName,
    multipleStatements: true,
    connectionLimit: 30
})

connection.on('connection', (pool) => {
    if (!pool) throw new Error('couldnt connect to the database, please try again later')
})


export {
    connection
}