try {
    const userFunction = require("./test.js");

    const tests = [
        [[1, 2], 3],
        [[2, 3], 5],
        [[3, 4], 7],
        [[-1, 2], 1],

    ]
    const testSolved = [];
    if (userFunction.start) {
        for (let i = 0; i < tests.length; i++) {
            const [input, expected] = tests[i];
            const output = userFunction?.start(...input);
            const isSolved = output === expected;
            testSolved.push({
                input,
                output,
                expected,
                isSolved
            })
        }
    }

    console.log(JSON.stringify({ testSolved }));
}
catch {
    console.log("Function not found");
}