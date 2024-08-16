import {
    connection as db
} from "../config/index.js";
import {
    createToken
} from "../middleware/AuthenticateUser.js";
import {
    compare,
    hash
} from "bcrypt";

class Users {
    fetchUsers(req, res) {
        try {
            const strQry = `
                select firstName, lastName, age, emailAdd, userRole, profileURL
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
        }
    }

    fetchUser(req, res) {
        try {
            const strQry = `
                select userID, firstName, lastName, age, emailAdd, userRole, profileURL
                from Users WHERE userID = ${req.params.id};
                `

            db.query(strQry, (err, result) => {
                if (err) throw new Error(`Unable to fetch user`);
                res.json({
                    status: res.statusCode,
                    result: result[0]
                })
            })

        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    async registerUser(req, res) {
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
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    async updateUser(req, res) {
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
    }

    deleteUser(req, res) {
        try {
            const strQry = `
            DELETE FROM Users WHERE userID = ${req.params.id}
            `

            db.query(strQry, (err) => {
                if (err) throw new Error('To delete a user, please review your delete query.')
                res.json({
                    status: res.statusCode,
                    msg: "A user's information has been deleted"
                })
            })

        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    async login(req, res) {
        try {
            const {
                emailAdd,
                pwd
            } = req.body
            const strQry = `
            SELECT userID, firstName, lastName, age, emailAdd, pwd, userRole, profileURL FROM Users WHERE emailAdd = '${emailAdd}'
            `

            db.query(strQry, async (err, result) => {
                if (err) throw new Error('To login please review your query')
                if (!result ? .length) {
                    res.json({
                        status: 401,
                        msg: 'You provided a wrong email.'
                    })
                } else {
                    const isValidPass = await compare(pwd, result[0].pwd)
                    if (isValidPass) {
                        const token = createToken({
                            emailAdd,
                            pwd
                        })

                        res.json({
                            status: res.statusCode,
                            token,
                            result: result[0]
                        })
                    } else {
                        res.json({
                            status: 401,
                            msg: 'Invalid password. Please input correct password.'
                        })
                    }
                }
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
}

export {
    Users
}