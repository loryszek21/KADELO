const pool = require("../../db");
const testcon = require("./testcontroller");
var fs = require("fs");

const getTest = (req, res) => {

    fs.writeFile(
        `./modul/test/test.js`,
        JSON.parse(req.body.code),
        "utf-8",
        (err) => {
            if (err) {
                console.error(`Error writing file: ${err}`);
                return res.status(500).json({ message: "Error writing file" });
            }

            try {
                const tests = testcon.runTest();
                res.status(200).json({ message: JSON.stringify(tests) });
            } catch (error) {
                console.error(`Error executing tests: ${error}`);
                res.status(500).json({ message: "Error executing code" });
            }
        }
    );
};

module.exports = {
    getTest,
};
