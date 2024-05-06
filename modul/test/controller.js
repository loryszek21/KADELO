const pool = require("../../db");
const fs = require("fs");
const exec = require("child_process").exec;

const getTest = async (req, res) => {

    try {
        fs.writeFileSync("modul/test/test.js", JSON.parse(req.body.code) + `\n module.exports = {start};`);
    } catch (error) {
        console.error('Error writing to file:', error);
        res.status(500).send('Error writing to file');
        return;
    }

    try{
        const buildCommand = 'docker build -t sandboxtest .';
        await exec(buildCommand, (buildError, buildStdout, buildStderr) => {
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
                    const data = fs.readFileSync('modul/test/output.txt', 'utf-8');
                    res.status(200).json(data);
                });
            });
        });
    }   catch (e){
        console.log(e);  
        res.status(500).send("e");
        return;
    }
   

};

module.exports = {
    getTest,
};
