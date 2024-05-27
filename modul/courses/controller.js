const pool = require("../../db");

const getCourses = (req, res) => {
    pool.query(`SELECT * FROM course`, (error, results) => {
        if (results.rows.length == 0) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getCoursesById = (req, res) => {
    pool.query(
        `SELECT * FROM course WHERE course_id = ${req.params.id}`,
        (error, results) => {
            if (results.rows.length == 0) {
                return res.status(404).json({ message: "Course not found" });
            }
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows[0]);
        }
    );
};

const getTasksByCourseId = (req, res) => {
    pool.query(
        `SELECT * FROM tasks WHERE course_id = ${req.params.id}`,
        (error, results) => {
            if (results.rows.length == 0) {
                return res.status(404).json({ message: "Lesson not found" });
            }
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
};

module.exports = {
    getCourses,
    getCoursesById,
    getTasksByCourseId,
};
