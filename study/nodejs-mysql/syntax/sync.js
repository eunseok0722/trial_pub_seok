var fs = require('fs');

// readFileSync
// console.log('A');
// var result = fs.readFileSync('syntax/sample.txt', `utf8`);
// console.log(result);
// console.log('C');
/* A, B, C가 순차적으로 실행됨 */

// 비동기적으로 처리하는 방법
console.log('A');
var result = fs.readFile('syntax/sample.txt', 'utf8', function (err, result) {
    console.log(result);
});
console.log('C');
/* A, C 실행 후 B가 실행됨  */
