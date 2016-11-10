var db = require('../config/sequelize');

exports.getAlternativas = function (req, res) {
    db.Alternativa.findAll({}).then(function (alternativas) {
        res.send(alternativas);
    })
};