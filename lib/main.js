'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mysql = require('mysql2');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var upload = (0, _multer2.default)();
var conn = _mysql2.default.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'sksks',
    database: 'build_vj'
});

app.set('trust proxy', 1);

app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist')));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _expressSession2.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

app.post('/upload', upload.array(), function (req, res, next) {
    console.log(req.body);
    res.json(req.body);
});

app.get('/data/:lasttime', function (req, resp) {
    var lasttime = parseInt(req.params.lasttime);
    conn.query('select distinct Record.user,Users.json from Record left join Users on Record.user=Users.user where Record.result=\'Accepted\' and Record.contest=1 and Record.time>=' + lasttime, function (err, res) {
        if (err) {
            resp.end('[]');
            return;
        }
        resp.end(JSON.stringify(res));
    });
});

app.listen(5000);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(app, 'app', 'src/server/main.js');

    __REACT_HOT_LOADER__.register(upload, 'upload', 'src/server/main.js');

    __REACT_HOT_LOADER__.register(conn, 'conn', 'src/server/main.js');
}();

;