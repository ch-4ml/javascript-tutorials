var fs = require('fs');
var express = require('express');
var router = express.Router();

// RESTful -> 자원(uri) / 행위(http method)

// router.route('경로').[Method](function())
router.get('/', function(req, res) {
    var html = fs.readFileSync('./public/html/main.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
    res.write(html)
    res.end();
});

// 상품 페이지
router.get('/products', function(req, res) {
    if(req.session.user) {
        var html = fs.readFileSync('./public/html/220512.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
        res.end(html);
    } else {
        res.redirect('/');
    }
});

// 쿠키 정보 조회하기
router.get('/users/:id/cookie', function(req, res) {
    var id = req.params.id;

    res.cookie('user', { id, age: 99, authorized: true });
    res.redirect(`/users/${id}`);
});

// 로그인
router.post('/users/auth', function(req, res) {
    var paramID = req.body.id;
    var paramPW = req.body.pw;

    if(req.session.user) {
        console.log('이미 로그인되어 상품 페이지로 이동합니다.');
        res.redirect('/products');
    } else {
        req.session.user = {
            id: paramID,
            name: "chpark",
            authorized: true
        };

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
        res.write('<h1>로그인 성공</h1>');
        res.write(`<div><p>Param ID: ${paramID}</p></div>`);
        res.write(`<div><p>Param PW: ${paramPW}</p></div>`);
        res.write('<br><br><a href="/products">상품 페이지로 돌아가기</a>');
        res.end();
    }
});

// 로그아웃
router.get('/users/auth', function(req, res) {
    if(req.session.user) {
        req.session.destroy(function(err) {
            if(err) throw err;
            console.log("로그아웃 처리됨.");
            res.redirect('/');
        });
    } else {
        console.log("로그인 안됐음.");
        res.redirect('/');
    }
});

module.exports = router;