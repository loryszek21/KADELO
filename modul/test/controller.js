const pool = require("../../db");
const { exec } = require("child_process");
const path = require("path");
const testcon = require("./testcontroller");
var fs = require("fs");

const getTest = (req, res) => {
  console.log(req.body);
  const filePath = "./modul/test/test";
  const fileExtension = req.body.type;

  fs.writeFileSync(
    `./modul/test/test${fileExtension}`,
    JSON.parse(req.body.code),
    "utf-8"
  );

  var runFile = "";

  if (fileExtension == ".js") runFile = "node";
  else if (fileExtension == ".py") runFile = "py";
  else if (fileExtension == ".cpp") runFile = "";

  exec(`${runFile} ${filePath + fileExtension}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing file: ${error}`);
      return;
    }

    console.log(`File output:\n${stdout}`);
    res.status(200).json({ message: JSON.stringify(stdout) });
    if (stderr) {
      console.error(`File error output:\n${stderr}`);
    }
    // testcon.runTest()
    // fs.unlink(filePath+fileExtension, (err) => {
    //     if (err) {
    //         console.error(`Error deleting file: ${err}`);
    //         return;
    //     }
    //     console.log(`File ${filePath+fileExtension} deleted successfully.`);
    // });
    fs.truncate(filePath + fileExtension, 0, (err) => {
      if (err) {
        console.error(`Błąd czyszczenia pliku: ${err}`);
        return;
      }
      console.log(
        `Zawartość pliku ${filePath} została wyczyszczona pomyślnie.`
      );
    });
  });
};

module.exports = {
  getTest,
};
