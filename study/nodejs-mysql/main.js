var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring'); // 서버에서 호출된 정보 수신하는 node.js 모듈
var sanitizeHtml = require('sanitize-html'); // XSS 방지를 위한 의존성

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    // 중복코드 함수화 -> 객체화 => 객체 지향 프로그래밍
    var template = require('./lib/template');
    var path = require('path');

    // 각 페이지 정의
    if (pathname === '/') {
        // Query String이 없는 경우, 즉, 홈화면인 경우
        if (title === undefined) {
            fs.readdir('./data', function (error, fileList) {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = template.List(fileList);
                var HTML = template.HTML(title, list, `
                    <h2>${title}</h2>
                    ${description}
                    `, '<a href="/create">Create</a>');
                response.writeHead(200);
                response.end(HTML);
            })
        // Query String이 정해진 경우
        } else {
            // delete의 경우 get방식의 link로 수행할 경우 크롤링에 의해서 자동 삭제가 되기 때문에 반드시 form 태그를 이용해서 요청을 post 방식으로 보내야한다.
            fs.readdir('./data', function (error, fileList) {
                // 보안을 위해 외부에서 들어오는 값을 한번 필터링 할 수 있도록 수정함
                // 경로정보를 path.parse()에 넣어주고, 그 결과값 중 base(파일명)에 해당하는 값만 경로정보로 보내주는 원리
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
                    var title = queryData.id;

                    // 코드 중 script 태그와 같이 XSS 문제를 일으킬 수 있는 테그를 삭제
                    var sanitizedTitle = sanitizeHtml(title, {
                        allowedTages: ['h1'] // 여기에 Allow 하고싶은 태그를 추가하면 됨, 양식과 관련된 기본적인 태그들은 Default로 이미 허용이 된 상태임
                    });
                    var sanitizedDescription = sanitizeHtml(description);
                    var list = template.List(fileList);
                    var HTML = template.HTML(title, list, `
                    <h2>${sanitizedTitle}</h2>
                    ${sanitizedDescription}
                    `,
                        `<a href="/create">Create</a> <a href="/update?id=${sanitizedTitle}">update</a> 
<form action="delete_process" method="post" style="display: inline;">
<input type="hidden" name="id" value="${sanitizedTitle}">
<input type="submit" value="delete">
</form>`);
                    response.writeHead(200);
                    response.end(HTML);
                });
            })
        }
    // create 페이지 정의
    } else if (pathname === '/create') {
        fs.readdir('./data', function (error, fileList) {
            var title = 'WEB - Create';
            var list = template.List(fileList);
            var HTML = template.HTML(title, list, `
                    <form action="/create_process" method="post">
  <p><input type="text" name="title" placeholder="Title" style="width: 400px;"></p>
  <p>
    <textarea name="description" placeholder="description"  style="width: 400px; height: 200px;"></textarea>
  </p>
  <p>
    <input type="submit">
  </p>
</form>
                    `, '<a href="/create">Create</a>');
            response.writeHead(200);
            response.end(HTML);
        })
    } else if (pathname === '/create_process') {
        fs.readdir('./data', function (error, fileList) {
            var body = '';
            // 사용자가 요청한 데이터
            // Post 방식으로 들어오는 Data가 많을 경우를 대비해서 아래와 같이 Post 데이터를 받아 옴
            request.on('data', function (data) {
                // 서버에서 데이터를 수신할 때마다 위의 콜백함수의 인자로 데이터를 받게 되어있음
                body = body + data; // body에 들어오는 데이터를 계속 추가하는 방식

                // 데이터의 크기가 너무 클 경우 연결을 끊어버리는 내용s
                if (body.length > 1e6) request.connection.destroy();
            });
            // 정보 수신이 끝났을 때 호출되는 콜백
            request.on('end', function () {
                var post = qs.parse(body); // parse()에 입력값을 집어넣으면  post 값을 불러올 수 있음
                // post 방식으로 데이터를 받는 방법 받는 방법
                var title = post.title;
                var description = post.description;
                // 파일을 만드는 방법
                fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
                    // 200은 성공했다는 뜻
                    // response.writeHead(200);

                    // 생성한 파일의 페이지로 갈 수 있게 리다이렉트 하는 방법
                    // 301 코드는 영원히 바뀌는 코드, 302 일시적으로 이동
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                })
                // 수정하는 기능 만들기
            });

        })
    } else if (pathname === '/update') {
        fs.readdir('./data', function (error, fileList) {
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
                var title = queryData.id;
                var list = template.List(fileList);
                // 사용자가 제목을 수정하면 파일명이 변경되어야 하기 때문에 아래와 같이 hidden태그로 수정한다.
                var HTML = template.HTML(title, list, `
<form action="/update_process" method="post">
  <input type="hidden" name="id" value="${title}" style="width: 400px;">
  <p><input type="text" name="title" placeholder="Title" value="${title}" style="width: 400px;"></p>
  <p>
    <textarea name="description" placeholder="description" style="width: 400px; height: 200px;">${description}</textarea>
  </p>
  <p>
    <input type="submit">
  </p>
</form>
                    `,
                    `<a href="/create">Create</a> <a href="/update?id=${title}">update</a>`);
                response.writeHead(200);
                response.end(HTML);
            });
        })
        // 페이지 데이터 수정, 파일 이름 바꾸기
    } else if (pathname === '/update_process') {
        fs.readdir('./data', function (error, fileList) {
            var body = '';
            // 사용자가 요청한 데이터
            // Post 방식으로 들어오는 Data가 많을 경우를 대비해서 아래와 같이 Post 데이터를 받아 옴
            request.on('data', function (data) {
                // 서버에서 데이터를 수신할 때마다 위의 콜백함수의 인자로 데이터를 받게 되어있음
                body = body + data; // body에 들어오는 데이터를 계속 추가하는 방식

                // 데이터의 크기가 너무 클 경우 연결을 끊어버리는 내용
                if (body.length > 1e6) request.connection.destroy();
            });
            // 정보 수신이 끝났을 때 호출되는 콜백
            request.on('end', function () {
                var post = qs.parse(body); // parse()에 입력값을 집어넣으면  post 값을 불러올 수 있음
                // post 방식으로 데이터를 받는 방법 받는 방법
                var id = post.id;
                var title = post.title;
                var description = post.description;
                // 파일 이름 수정하기
                fs.rename(`data/${id}`, `data/${title}`, function (error) {
                    // 파일 내용 쓰기
                    fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
                        // 생성한 파일의 페이지로 갈 수 있게 리다이렉트 하는 방법
                        // 301 코드는 영원히 바뀌는 코드, 302 일시적으로 이동
                        response.writeHead(302, {Location: `/?id=${title}`});
                        response.end();
                    })
                })
            });
        })
    } else if (pathname === '/delete_process') {
        fs.readdir('./data', function (error, fileList) {
            var body = '';
            // 사용자가 요청한 데이터
            // Post 방식으로 들어오는 Data가 많을 경우를 대비해서 아래와 같이 Post 데이터를 받아 옴
            request.on('data', function (data) {
                // 서버에서 데이터를 수신할 때마다 위의 콜백함수의 인자로 데이터를 받게 되어있음
                body = body + data; // body에 들어오는 데이터를 계속 추가하는 방식

                // 데이터의 크기가 너무 클 경우 연결을 끊어버리는 내용
                if (body.length > 1e6) request.connection.destroy();
            });
            // 정보 수신이 끝났을 때 호출되는 콜백
            request.on('end', function () {
                var post = qs.parse(body); // parse()에 입력값을 집어넣으면  post 값을 불러올 수 있음
                // post 방식으로 데이터를 받는 방법 받는 방법
                var id = post.id;
                // filesystem 이용해서 요청하는 링크의 파일 지우기
                fs.unlink(`data/${id}`, function (error) {
                    // 해당 url의 파일을 삭제하고 사용자를 home으로 redirection
                    response.writeHead(302, {Location: `/`});
                    response.end();
                })
            });
        })
    } else {
        response.writeHead(404);
        response.end('Not found');
    }

    // response.end()안에 어떤 것을 넣느냐에 따라서 사용자에게 보내는 것이 달라지게 된다.
    // response.end('egoing : ' + url);을 할 경우 페이지에 egoing : /index.html이 출력되게 된다.
    // 프로그래밍적으로 사용자에게 전송할 데이터를 생성할 수 있는 것이 Node.js의 힘이다.
    // response.end(fs.readFileSync(__dirname + _url));


});
app.listen(3000);
// 웹서버 기본이 80으로 80을 설정 시 포트번호를 별도로 쓰지 않아도 된다.