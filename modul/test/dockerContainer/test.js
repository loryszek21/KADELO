
function start(){
    return function palindrome(str) {
    return `${str.split("").reverse().join("") == str}`
}
}
const test_input = [["racecar"],["hello"],["madam"],["noon"],["openai"],["civic"],["level"]]
const test_output = [["true"],["false"],["true"],["true"],["false"],["true"],["true"]];
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
try{
    for (let i = 0; i < test_input.length; i++) {
        const output = start()(...test_input[i]);
        const isSolved = output === test_output[i][0];
        testSolved.push({ input: [...test_input[i]], output, correctOutput: [...test_output[i]], isSolved });
    }
}
catch(e){
    console.error(e);
}

console.log(JSON.stringify(testSolved));

