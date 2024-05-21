const pool = require("../../db");
const fs = require("fs");
const exec = require("child_process").exec;

const getTest = async (req, res) => {
    console.log("1");
    await getTests(req.params.id);
    console.log("2");
    await WriteCodeToFile(res, req.body.code);
    console.log("3");
    await DockerRun(res);
    console.log("4");
    await ReadOutputFile(res);
    console.log("5");
};

const testsController = (tests_input, tests_output) => `
try {
    const userFunction = require("./test.js");

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

    if (userFunction.start) {
        for (let i = 0; i < test_input.length; i++) {
            const output = userFunction?.start(...test_input[i]);
            const isSolved = output === test_output[i][0];
            testSolved.push({ input: [...test_input[i]], output, correctOutput: [...test_output[i]], isSolved });
        }
    }

    console.log(JSON.stringify(testSolved));
} catch(e) {
    console.error(e);
}
`;

function getTests(id) {
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
                fs.writeFileSync(
                    "modul/test/testcontroller.js",
                    testsController(
                        JSON.stringify(results.rows[0].tests_input),
                        JSON.stringify(results.rows[0].tests_output)
                    )
                );
                resolve();
            }
        );
    });
}

function WriteCodeToFile(res, code) {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            "modul/test/test.js",
            JSON.parse(code) + `\n module.exports = {start};`,
            (err) => {
                if (err) {
                    res.status(500).send("Error writing to file");
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

function DockerRun(res) {
    return new Promise((resolve, reject) => {
        try {
            const buildCommand = "docker build -t sandboxtest .";
            exec(buildCommand, (buildError, buildStdout, buildStderr) => {
                if (buildError) {
                    reject(buildError);
                    res.status(500).send("Error building Docker image");
                    return;
                }
                const dockerCommand =
                    "docker run --name sandboxtest -v /modul/test/testcontroller.js:/sandboxtest/code sandboxtest";
                exec(dockerCommand, (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                        res.status(500).send("Error executing Docker command");
                        return;
                    }
                    exec(
                        "docker logs -f sandboxtest > modul/test/output.txt",
                        async (rmError, rmStdout, rmStderr) => {
                            if (rmError) {
                                reject(rmError);
                                console.error(
                                    `Error removing Docker container: ${rmError}`
                                );
                                res.status(500).send(
                                    "Error removing Docker container"
                                );
                            }
                            exec(
                                "docker rm sandboxtest",
                                (rmError, rmStdout, rmStderr) => {
                                    if (rmError) {
                                        reject(rmError);
                                        console.error(
                                            `Error removing Docker container: ${rmError}`
                                        );
                                        res.status(500).send(
                                            "Error removing Docker container"
                                        );
                                    }
                                    resolve();
                                }
                            );
                        }
                    );
                });
            });
        } catch (e) {
            console.log(e);
            res.status(500).send("e");
            return;
        }
    });
}

function ReadOutputFile(res) {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync("modul/test/output.txt", "utf-8");
        console.log(data);
        res.status(200).json(data);
        resolve();
    });
}

module.exports = {
    getTest,
};
