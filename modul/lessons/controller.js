const pool = require('../../db');

const getLessonById = (req, res) => {
    pool.query(`SELECT * FROM lessons WHERE lessons_id = ${req.params.id}`, (error, results) => {
        if (results.rows.length == 0) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        if (error) {
            throw error
        }
        console.log(results.rows[0]);
        res.status(200).json(results.rows[0]);
    })
}


module.exports = {
    getLessonById
}