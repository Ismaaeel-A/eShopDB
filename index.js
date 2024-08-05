const {
    createPool
} = require("mysql2");

let ConnectionList = createPool({
    host: process.env.hstDb,
    password: process.env.pswrdDb,
    user: process.env.userDb,
    database: process.env.dbName,
    multipleStatements: true,
    connectionLimit: 30
})

ConnectionList.on('connection', (err) => {
    if (err) throw new Error('couldnt connect to the database, please try again later')
})


export {
    connection
}

















ConnectionList.