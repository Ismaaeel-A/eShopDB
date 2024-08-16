import {
    connection as db
} from "../config/index.js";

class Products {
    fetchProducts(req, res) {
        try {
            const strQry = `
            select productID, prodName, category, prodDescription, prodURL, amount 
            from Products;
            `

            db.query(strQry, (err, results) => {
                `Unable to fetch products`
                if (err) throw new Error('Unable to retrieve products at this time');
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

    recentProducts(req, res) {
        try {
            const strQry = `
            select productID, prodName, category, prodDescription, prodURL, amount 
            from Products ORDER BY productID DESC LIMIT 5;
            `

            db.query(strQry, (err, results) => {
                if (err) throw new Error('Unable to retrieve latest products')
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

    fetchProduct(req, res) {
        try {
            const strQry = `
                select productID, prodName, category, prodDescription, amount 
            from Products WHERE productID = ${req.params.id};
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

    addProduct(req, res) {
        try {
            let strQry = `
            INSERT INTO Products SET ?;
            `
            db.query(strQry, [req.body], (err) => {
                if (err) throw new Error('Unable to add product at this time.')
                res.json({
                    status: res.statusCode,
                    msg: 'Product added successfully.'
                })
            })

        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    editProducts(req, res) {
        try {
            let data = req.body

            const strQry = `
            UPDATE Products SET ? WHERE productID = ${req.params.id};
            `
            db.query(strQry, [req.body], (err) => {
                if (err) throw new Error('Product update failed.')
                res.json({
                    status: res.statusCode,
                    msg: 'Product successfully updated'
                })
            })

        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    deleteProducts(req, res) {
        try {
            const strQry = `
            DELETE FROM Products WHERE productID = ${req.params.id};
            `

            db.query(strQry, (err) => {
                if (err) throw new Error('To delete a product, please review your delete query.')
                res.json({
                    status: res.statusCode,
                    msg: "The product has been deleted"
                })
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
    Products
}