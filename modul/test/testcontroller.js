
try {
    const userFunction = require("./test.js");

    const test_input = [["3","4"],["1","5"],["-2","5"],["5","7"],["200","100"],["-89","55"]]
    const test_output = [["7"],["6"],["3"],["12"],["300"],["-34"]];
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

    if (userFunction.start) {
        for (let i = 0; i < test_input.length; i++) {
            const output = userFunction?.start(...test_input[i]);
            const isSolved = output === test_output[i][0];
            testSolved.push({ input: [...test_input[i]], output, correctOutput: [...test_output[i]], isSolved });
        }
    }

    console.log(JSON.stringify(testSolved));
} catch {
    console.log("Function not found");
}
