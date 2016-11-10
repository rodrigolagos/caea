var db = require('../config/sequelize');

exports.createStudent = function (req, res, next) {
    var studentData = req.body;
    db.Student.create(studentData).then(function (student) {
        res.send(student);
    }).catch(function (err) {
        if(err.toString() == 'SequelizeUniqueConstraintError: Validation error') {
            err = new Error('Duplicate Username');
        }
        res.status(400);
        return res.send({reason:err.toString()});
    })
};