
// 중복코드 함수화 -> 객체화 => 객체 지향 프로그래밍
// -> 다시 모듈화
module.exports = {
    HTML : function (title, list, body, control) {
        return `
<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>WEB2 - ${title}</title>
</head>
<body>
<h1><a href="/">WEB</a></h1>
<section class="grid">
    ${list}
    ${control}
    ${body}
</section>
</body>
</html>
`;
    },
    List : function (fileList) {
        var list = `<ul>`;
        var i = 0;
        while (i < fileList.length) {
            list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
            i++;
        }
        list = list + '</ul>';
        return list;
    },
}