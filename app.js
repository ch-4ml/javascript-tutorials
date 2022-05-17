// Express 기본 모듈
var express = require('express')
var app = express();
var http = require('http');
var path = require('path');
var router = require('./routes');

// 미들웨어 모듈 추가
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/html/404.html'
    }
});

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// 미들웨어 사용
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 사용
app.use('/', router);

// 등록되지 않은 경로에 대한 에러 처리
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스 서버를 시작했습니다. Port:', app.get('port'));
});