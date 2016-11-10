var db = require('../config/sequelize');

exports.getPreguntas = function (req, res) {
    db.Pregunta.findAll({}).then(function (preguntas) {
        res.send(preguntas);
    })
};
