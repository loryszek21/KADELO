const pool = require("../../db");
const testcon = require("./testcontroller");
const fs = require("fs");
const exec = require("child_process").exec;

const prepareTest = (text) => {
    return text + `\n module.exports = {start};`
}

const getTest = (req, res) => {

    try {
        fs.writeFileSync("modul/test/test.js", JSON.parse(req.body.code) + `\n module.exports = {start};`);
        res.status(200).send("File written successfully");
    } catch (error) {
        console.error('Error writing to file:', error);
        res.status(500).send('Error writing to file');
        return;
    }

    const buildCommand = 'docker build -t sandboxtest .';
    exec(buildCommand, (buildError, buildStdout, buildStderr) => {
        if (buildError) {
            res.status(500).send('Error building Docker image');
            return;
        }
        const dockerCommand = 'docker run --name sandboxtest -v /modul/test/testcontroller.js:/sandboxtest/code sandboxtest';
        exec(dockerCommand, (error, stdout, stderr) => {
            if (error) {
                res.status(500).send('Error executing Docker command');
                return;
            }
            exec('docker logs -f sandboxtest > modul/test/output.txt | docker rm sandboxtest', (rmError, rmStdout, rmStderr) => {
                if (rmError) {
                    console.error(`Error removing Docker container: ${rmError}`);
                    res.status(500).send('Error removing Docker container');
                    return;
                }
                console.log('Docker container removed successfully');
                const data = fs.readFileSync('modul/test/output.txt', 'utf-8');
                console.log("Data: ", data);
                res.status(200).json(data);
            });
        });
    });

};

module.exports = {
    getTest,
};
