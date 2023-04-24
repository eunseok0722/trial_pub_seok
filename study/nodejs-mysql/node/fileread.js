
// node js 의 file system 모듈 불러오기
var fs = require('fs');

// fs.readFile(불러올 파일, 인코딩, 콜백함수)
fs.readFile('node/sample.txt', 'utf8', function(err, data) {
    console.log(data);
});