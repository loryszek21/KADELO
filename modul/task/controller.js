const pool = require("../../db");

const getTaskById = (req, res) => {
    pool.query(
        `SELECT * FROM tasks WHERE tasks_id = ${req.params.id}`,
        (error, results) => {
            if (results.rows.length == 0) {
                return res.status(404).json({ message: "Lesson not found" });
            }
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows[0]);
        }
    );
};

module.exports = {
    getTaskById,
};
