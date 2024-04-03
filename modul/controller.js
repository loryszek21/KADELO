const pool = require('../db');
const bcrypt = require('bcrypt');

const getCourses = (req, res) => {
    pool.query(`SELECT * FROM course`, (error, results) => {
        if (results.rows.length == 0) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}

const getCoursesById = (req, res) => {
    pool.query(`SELECT * FROM course  WHERE course_id = ${req.params.id}`, (error, results) => {
        if (results.rows.length == 0) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}

const getUser = (req, res) => { //logging in
    let { email, password } = req.body;
    pool.query(`SELECT * FROM "users" WHERE "users_email" = '${email}'`, (error, results) => {
        if (error) {
            res.status(404).json({ message: error });
            return;
        }
        if (results.rows.length == 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        bcrypt.compare(password, results.rows[0].users_password, (err, result) => {
            if (err) {

                res.status(500).json({ message: 'Internal error' });
                return;
            }
            if (result) {
                res.status(200).json(results.rows[0]) // password match
            } else {
                res.status(401).json({ message: 'Password not match' }) // password not match
            }
        });
    })
}

module.exports = {
    getCourses,
    getCoursesById,
    getUser,
}