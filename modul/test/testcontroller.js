const pool = require('../../db');

function runTest() {
    const userFunction = require('./test')

    var [test1, test2, test3, test4] = [];
    const result1 = userFunction.start(2, 3);
    test1 = result1 == 6 && 1;
    const result2 = userFunction.start(5, 5);
    test2 = result2 == 25 && 1;
    const result3 = userFunction.start(4, 4);
    test3 = result3 == 16 && 1;
    const result4 = userFunction.start(6, 6);
    test4 = result4 == 36 && 1;
    return [test1, test2, test3, test4]
}

module.exports = {
    runTest: runTest
};