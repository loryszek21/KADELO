const pool = require("../../db");
const fs = require("fs");
const exec = require("child_process").exec;

const testCodes = ``;

const getTest = async (req, res) => {
    await getTests(req.body.code, req.params.id);
    await DockerRun(res);
    // await ReadOutputFile(res);
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
                        console.log("Tests file created");
                        resolve();
                    }
                );
            }
        );
    });
}

function DockerRun(res) {
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
                        console.log(`Output: ${stdout}`);
                        res.status(200).json(stdout);
                        // res.send(`Output: ${JSON.stringify(stdout)}`);
                    }
                }
            );
        }
    );
}

// function DockerRun(res) {
//     return new Promise((resolve, reject) => {
//         try {
//             const buildCommand = "docker build -t sandboxtest .";
//             exec(buildCommand, (buildError, buildStdout, buildStderr) => {
//                 if (buildError) {
//                     reject(buildError);
//                     res.status(500).send("Error building Docker image");
//                     return;
//                 }
//                 const dockerCommand =
//                     "docker run --name sandboxtest -v /modul/test/testcontroller.js:/sandboxtest/code sandboxtest";
//                 exec(dockerCommand, (error, stdout, stderr) => {
//                     if (error) {
//                         reject(error);
//                         res.status(500).send("Error executing Docker command");
//                         return;
//                     }
//                     exec(
//                         "docker logs -f sandboxtest > modul/test/output.txt",
//                         async (rmError, rmStdout, rmStderr) => {
//                             if (rmError) {
//                                 reject(rmError);
//                                 console.error(
//                                     `Error removing Docker container: ${rmError}`
//                                 );
//                                 res.status(500).send(
//                                     "Error removing Docker container"
//                                 );
//                             }
//                             exec(
//                                 "docker rm sandboxtest",
//                                 (rmError, rmStdout, rmStderr) => {
//                                     if (rmError) {
//                                         reject(rmError);
//                                         console.error(
//                                             `Error removing Docker container: ${rmError}`
//                                         );
//                                         res.status(500).send(
//                                             "Error removing Docker container"
//                                         );
//                                     }
//                                     resolve();
//                                 }
//                             );
//                         }
//                     );
//                 });
//             });
//         } catch (e) {
//             console.log(e);
//             res.status(500).send("e");
//             return;
//         }
//     });
// }

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
