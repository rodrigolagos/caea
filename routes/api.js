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

router.post('/register', function(req, res, next) {

    connection.query("INSERT INTO Estudiante(tipo_id, nombre, username, password, mail) VALUES("+ req.body.tipo_id +", '"+ req.body.name +"', '"+ req.body.username +"', '"+ req.body.password +"', '"+ req.body.mail +"')", function(err, rows, fields) {
        if (err) throw err;
        else{
            connection.query('SELECT * FROM Estudiante WHERE username = "'+ req.body.username +'"', function(err, rows, fields) {
                if (err) throw err;
                else{
                    var id_estudiante = rows[0].id;
                    connection.query('INSERT INTO Estudiante_Ramo(estudiante_id, ramo_id) VALUES('+ id_estudiante +',1)', function(err, rows, fields) {
                        if (err) throw err;
                        else{
                            res.json('OK');
                        }
                    });
                }

            });
        }
    });
});

router.get('/preguntas', function(req, res, next) {
    connection.query('SELECT * FROM Pregunta', function(err, rows, fields) {
        res.json(rows);
    });
});

router.get('/preguntas/alternativas', function(req, res, next) {
    connection.query('SELECT * FROM Alternativa', function(err, rows, fields) {
        res.json(rows);
    });
});

router.get('/preguntas/alternativas/modalidades', function(req, res, next) {
    connection.query('SELECT * FROM Modalidad', function(err, rows, fields) {
        res.json(rows);
    });
});

router.get('/preguntas/:id_pregunta/alternativas', function(req, res, next) {
    connection.query('SELECT * FROM Alternativa WHERE pregunta_id = "'+ req.params.id_pregunta +'"', function(err, rows, fields) {
        res.json(rows);
    });
});

router.get('/preguntas/alternativas/modalidades', function(req, res, next) {
    connection.query('SELECT * FROM Modalidad', function(err, rows, fields) {
        res.json(rows);
    });
});

router.get('/preguntas/alternativas/:id_alternativa/modalidad', function(req, res, next) {
    connection.query('SELECT Modalidad.nombre FROM Modalidad, Alternativa WHERE modalidad_id = Modalidad.id AND Alternativa.id = "'+ req.params.id_alternativa +'"', function(err, rows, fields) {
        res.json(rows);
    });
});

router.get('/preguntas/alternativas/:id_alternativa/modalidad', function(req, res, next) {
    connection.query('SELECT Modalidad.nombre FROM Modalidad, Alternativa WHERE modalidad_id = Modalidad.id AND Alternativa.id = "'+ req.params.id_alternativa +'"', function(err, rows, fields) {
        res.json(rows);
    });
});

router.get('/ramos', function(req, res, next) {
    connection.query('SELECT * FROM Ramo', function(err, rows, fields) {
        res.json(rows);
    });
});

// router.get('/estudiante/:id_estudiante/ramos', function(req, res, next) {
//     connection.query('SELECT * From Ramo Where Ramo.id = (SELECT ramo_id from Estudiante_Ramo WHERE estudiante_id = '+ req.params.id_estudiante +')', function(err, rows, fields) {
//         res.json(rows);
//     });
// });

router.get('/estudiante/:username_estudiante/ramos', function(req, res, next) {
    connection.query('SELECT * From Estudiante Where username = "'+ req.params.username_estudiante +'"', function(err, rows, fields) {
        var estudiante_id = rows[0].id;
        connection.query('SELECT * From Ramo Where Ramo.id = (SELECT ramo_id from Estudiante_Ramo WHERE estudiante_id = '+ estudiante_id +')', function(err, rows, fields) {
            res.json(rows);
        });
    });
});

module.exports = router;
