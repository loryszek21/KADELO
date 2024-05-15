const pool = require("../../db");
const fs = require("fs");
const exec = require("child_process").exec;

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
} catch {
    console.log("Function not found");
}
`;

const getTest = async (req, res) => {
    console.log(req.params.id);
    pool.query(
        `SELECT * FROM "tests" WHERE tasks_id = ${req.params.id};`,
        (error, results) => {
            if (results.rows.length == 0) {
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
        }
    );

    try {
        await fs.writeFileSync(
            "modul/test/test.js",
            JSON.parse(req.body.code) + `\n module.exports = {start};`
        );
    } catch (error) {
        console.error("Error writing to file:", error);
        res.status(500).send("Error writing to file");
        return;
    }

    try {
    } catch (error) {
        console.error("Error writing to file:", error);
        res.status(500).send("Error writing to file");
        return;
    }

    try {
        const buildCommand = "docker build -t sandboxtest .";
        await exec(buildCommand, (buildError, buildStdout, buildStderr) => {
            if (buildError) {
                res.status(500).send("Error building Docker image");
                return;
            }
            const dockerCommand =
                "docker run --name sandboxtest -v /modul/test/testcontroller.js:/sandboxtest/code sandboxtest";
            exec(dockerCommand, (error, stdout, stderr) => {
                if (error) {
                    res.status(500).send("Error executing Docker command");
                    return;
                }
                exec(
                    "docker logs -f sandboxtest > modul/test/output.txt | docker rm sandboxtest",
                    (rmError, rmStdout, rmStderr) => {
                        if (rmError) {
                            console.error(
                                `Error removing Docker container: ${rmError}`
                            );
                            res.status(500).send(
                                "Error removing Docker container"
                            );
                            return;
                        }
                        const data = fs.readFileSync(
                            "modul/test/output.txt",
                            "utf-8"
                        );
                        console.log(data);
                        res.status(200).json(data);
                    }
                );
            });
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("e");
        return;
    }
};

module.exports = {
    getTest,
};
