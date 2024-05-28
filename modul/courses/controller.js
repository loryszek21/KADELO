const pool = require("../../db");
const { getUserId } = require("../users/controller");

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

const getUserSolution = async (req, res) => {
    const userid = await getUserId(req.params.email);
    // console.log(req.params);
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM "user_tasks" WHERE "users_id" = ${userid} AND "tasks_id" = ${req.params.id} ORDER BY "completion_date" DESC, "complited" LIMIT 1;`,
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
