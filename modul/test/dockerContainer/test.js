
function start(){
    return function stringLength(str) { 
	return str.length
}
}
const test_input = [["hello"],["OpenAI"],["JavaScript"]]
const test_output = [["5"],["6"],["10"]];
const testSolved = [];

const isNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

test_input.forEach((input) => {
    input.forEach((element, index) => {
        if (isNumber(element)) {
            input[index] = parseInt(element);
        }
        else{
            input[index] = String(element);
        }
    });
});

// test_output.forEach((output) => {
//     output.forEach((element, index) => {
//         if (isNumber(element)) {
//             output[index] = parseInt(element);
//         }
//         else{
//             output[index] = String(element);
//         }
//     });
// });

try{
    for (let i = 0; i < test_input.length; i++) {
        const output = start()(...test_input[i]).toString();
        const isSolved = output === test_output[i][0];
        testSolved.push({ input: [...test_input[i]], output, correctOutput: [...test_output[i]], isSolved });
    }
}
catch(e){
    throw (e);
    }

console.log(JSON.stringify(testSolved));

