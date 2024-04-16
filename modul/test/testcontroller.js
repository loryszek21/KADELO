const pool = require('../../db');

function runTest() {
    const userFunction = require('./test')

    var [test1, test2] = [0, 0];
    const result1 = userFunction.start(2, 3);
    test1 = result1 == 6 && 1;
    const result2 = userFunction.start(5, 5);
    test2 = result2 == 25 && 1;
    return [test1, test2]
}

module.exports = {
    runTest: runTest
};