const pool = require('../db');


const getCustomer = (req, res) => {
    pool.query("SELECT * FROM customer", (error, results) => {
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getCustomer,
}