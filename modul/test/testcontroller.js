try {
    const userFunction = require("./test.js");

    const test_input = [
        ["mom"],
        ["test"],
        ["peep"],
        ["racecar"],
        ["rotator"],
        ["sure"],
        ["check"],
    ];
    test_input.forEach((input) => {
        input[0] = parseInt(input[0]);
        input[1] = parseInt(input[1]);
    });
    const test_output = [
        ["true"],
        ["false"],
        ["true"],
        ["true"],
        ["true"],
        ["false"],
        ["false"],
    ];
    const testSolved = [];
    if (userFunction.start) {
        for (let i = 0; i < test_input.length; i++) {
            const output = userFunction?.start(...test_input[i]);
            const isSolved = output === parseInt(test_output[i][0]);
            testSolved.push({
                input: test_input[i][0] + " " + test_input[i][1],
                output,
                isSolved,
            });
        }
    }

    console.log({ testSolved });
} catch {
    console.log("Function not found");
}
