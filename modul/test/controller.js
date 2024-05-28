const { resolve } = require("path");
const pool = require("../../db");
const fs = require("fs");
const { getUserId } = require("../users/controller");
const exec = require("child_process").exec;

const getTest = async (req, res) => {
    const userId = await getUserId(req.body.email);
    await getTests(req.body.code, req.params.id);
    const stdout = await DockerRun(res);
    await insertTest(userId, req.params.id, stdout, res);
};

const testsController = (tests_input, tests_output) => `
try {

    const test_input = ${tests_input}
    const test_output = ${tests_output};
    const testSolved = [];

    const isNumber = (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    };
    
    test_input.forEach((input) => {
        input.forEach((element, index) => {
            if (isNumber(element)) {
                input[index] = parseInt(element);
            }
        });
    });

    test_output.forEach((output) => {
        output.forEach((element, index) => {
            if (isNumber(element)) {
                output[index] = parseInt(element);
            }
        });
    });

    if (start) {
        for (let i = 0; i < test_input.length; i++) {
            const output = start(...test_input[i]);
            const isSolved = output === test_output[i][0];
            testSolved.push({ input: [...test_input[i]], output, correctOutput: [...test_output[i]], isSolved });
        }
    }
    else{
        throw new Error('Function start not found');
    }

    console.log(JSON.stringify(testSolved));
} catch(e) {
    console.error(e);
}
`;

function getTests(code, id) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM "tests" WHERE tasks_id = ${id};`,
            (error, results) => {
                if (results.rows.length == 0) {
                    reject();
                    return res.status(404).json({ message: "Test not found" });
                }
                if (error) {
                    throw error;
                }
                fs.writeFile(
                    "modul/test/dockerContainer/test.js",
                    JSON.parse(code).concat(
                        testsController(
                            JSON.stringify(results.rows[0].tests_input),
                            JSON.stringify(results.rows[0].tests_output)
                        )
                    ),
                    (err) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        resolve();
                    }
                );
            }
        );
    });
}

function DockerRun(res) {
    return new Promise((resolve, reject) => {
        exec(
            "docker cp ./modul/test/dockerContainer/test.js runCode:/usr/src/test",
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${stderr}`);
                }
                exec(
                    "docker exec runCode node /usr/src/test",
                    (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error: ${stderr}`);
                            res.status(500).send(`Error: ${stderr}`);
                        } else {
                            resolve(stdout);
                        }
                    }
                );
            }
        );
    });
}

function insertTest(userId, tasks_id, stdout, res) {
    let completed = true;
    console.log(stdout);
    JSON.parse(stdout).map((el) => {
        if (el.isSolved === false) {
            completed = false;
            return;
        }
    });
    pool.query(
        `INSERT INTO user_tasks (users_id, tasks_id, complited, completion_date) VALUES ($1, $2, $3, $4)`,
        [userId, tasks_id, completed, new Date()],
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal error" });
            }
            res.status(201).json(stdout);
        }
    );
}

module.exports = {
    getTest,
};
