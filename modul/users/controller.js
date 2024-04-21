const pool = require("../../db");
const bcrypt = require("bcrypt");

const getUser = (req, res) => {
    //logging in
    let { email, password } = req.body;
    try {
        pool.query(
            `SELECT * FROM "users" WHERE "users_email" = $1`,
            [email],
            (error, results) => {
                if (results.rows.length == 0) {
                    return res.status(404).json({ message: "User not found" });
                }
                bcrypt.compare(
                    password,
                    results.rows[0].users_password,
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: "Internal error" });
                        }
                        if (result) {
                            return res.status(200).json(results.rows[0]); // password match
                        } else {
                            return res.status(401).json({ message: "Password not match" }); // password not match
                        }
                    }
                );
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Internal error" });
    }
};
const insertUser = (req, res) => {
    let { name, email, password } = req.body;
    try {
        pool.query(
            `SELECT * FROM users WHERE "users_email" = $1 OR "users_name" = $2 `,
            [email, name],
            (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: "Internal error" });
                }
                if (results.rows.length !== 0) {
                    //   return res.status(409).json({ message: "User with this email already exists" });
                    const existingUser = results.rows.find(
                        (user) => user.users_email === email || user.users_name === name
                    );
                    console.log(results.rows);

                    if (existingUser.users_email === email) {
                        return res
                            .status(409)
                            .json({ message: "User with this email already exists" });
                    } else if (existingUser.users_name === name) {
                        return res
                            .status(409)
                            .json({ message: "User with this name already exists" });
                    }
                } else if (results.rows.length === 0) {
                    pool.query(
                        `INSERT INTO users (users_name, users_password, users_email, ranks_id)
                VALUES ($1, crypt($2, gen_salt('bf', 8)), $3, 1)`,
                        [name, password, email]
                    );

                    if (error) {
                        console.error(error);
                        return res.status(500).json({ message: "Internal error" });
                    }
                    console.log("Create account success");
                    return res.status(200).json({ message: "Create account success" });
                } else {
                    return res.status(500).json({ message: "Unknown error" });
                }
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Internal error" });
    }
};
module.exports = {
    getUser,
    insertUser,
};
