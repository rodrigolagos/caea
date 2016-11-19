var db = require('../config/sequelize');

exports.createTeacher = function (req, res, next) {
    var teacherData = req.body;
    db.Teacher.create(teacherData).then(function (teacher) {
        res.send(teacher);
    }).catch(function (err) {
        if(err.toString() == 'SequelizeUniqueConstraintError: Validation error') {
            err = new Error('Duplicate Username');
        }
        res.status(400);
        return res.send({reason:err.toString()});
    })
};