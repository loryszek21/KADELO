const pool = require('../../db');
const bcrypt = require('bcrypt');

const getUser = (req, res) => { //logging in
    let { email, password } = req.body;
    try {
        pool.query(`SELECT * FROM "users" WHERE "users_email" = '${email}'`, (error, results) => {
            if (results.rows.length == 0) {
                return res.status(404).json({ message: "User not found" });
            }
            bcrypt.compare(password, results.rows[0].users_password, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal error' });
                }
                if (result) {
                    return res.status(200).json(results.rows[0]) // password match
                } else {
                    return res.status(401).json({ message: 'Password not match' }) // password not match
                }
            });
        })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal error" });
    }
}

module.exports = {
    getUser,
}