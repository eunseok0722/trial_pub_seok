const testFolder = './data';
const fs = require('fs');


// fs.readdir :  특정 디렉토리의 파일 목록을 배열로 만들어서 전달
fs.readdir(testFolder, function (error, fileList) {
    console.log(fileList);
});