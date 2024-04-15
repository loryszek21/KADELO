const pool = require('../../db');

const userFunction = require('./test')

function runTest(){
    const result1 = userFunction.start(2,3);
    console.log("Test 1:", result1 === 6 ? "Passed": "Failed");

    const result2 = userFunction.start(5,5);
    console.log(result2, result1)
    console.log("Test 2:", result2 === 25 ? "Passed": "Failed");
}

module.exports = {
    runTest: runTest
};