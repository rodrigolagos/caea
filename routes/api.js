var express = require('express');
var connection = require('../connection');
var router = express.Router();

connection.connect();

router.post('/login', function(req, res, next) {
    var user = req.body.user;
    var pass = req.body.password;

    connection.query('SELECT * FROM Estudiante WHERE username = "'+ user +'" AND password = "'+ pass +'"', function(err, rows, fields) {
        if (err) throw err;
        if(rows.length > 0) {
            req.session.userName = rows[0].username;
            res.json('OK');
        }
        else {
            res.json('Usuario o contraseña incorrectos.')
        }
    });
});

module.exports = router;
