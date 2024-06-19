const pool = require("../../db");
const { getUserId } = require("../users/controller");

const getCourses = async (req, res) => {
    const limit = req.query.limit || 10;
    const email = req.query.email;
    const user_id = await getUserId(email);
    console.log(user_id);
    pool.query(
        `SELECT c.* FROM course as c RIGHT JOIN user_purchased_course as pc ON c.course_id = pc.course_id WHERE pc.user_id = ${user_id} UNION ALL SELECT * FROM course WHERE course_price = 0 LIMIT ${limit}`,
        (error, results) => {
            if (results.rows.length == 0) {
                return res.status(404).json({ message: "Course not found" });
            }
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
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
            if (error) {
                throw error;
            }
            if (results.rows.length == 0) {
                return res.status(404).json({ message: "Lesson not found" });
            }
            res.status(200).json(results.rows);
        }
    );
};

const getUserSolution = async (req, res) => {
    const userid = await getUserId(req.params.email);
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM user_tasks WHERE tasks_id = ${req.params.id} AND "users_id" = ${userid} ORDER BY complited DESC, user_tasks_id DESC LIMIT 1`,
            (error, results) => {
                if (results.rows.length == 0) {
                    return res
                        .status(404)
                        .json({ message: "Solution not found" });
                }
                if (error) {
                    throw error;
                }
                resolve();
                res.status(200).json(results.rows[0]);
            }
        );
    });
};

module.exports = {
    getCourses,
    getCoursesById,
    getTasksByCourseId,
    getUserSolution,
};
