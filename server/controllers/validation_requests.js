var db = require('../config/sequelize');

exports.getValidationRequests = function (req, res) {
    db.Validation_Request.findAll().then(function (validation_request) {
        res.send(validation_request);
    })
};

exports.createValidationRequest = function (req, res, next) {
    var validationRequestData = req.body;
    db.Validation_Request.create(validationRequestData).then(function (validation_request) {
        res.send(validation_request);
    }).catch(function (err) {
        if(err.toString() == 'SequelizeUniqueConstraintError: Validation error') {
            err = new Error('Duplicate Username');
        }
        res.status(400);
        return res.send({reason:err.toString()});
    })
};