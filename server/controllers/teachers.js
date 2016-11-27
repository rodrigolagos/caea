var db = require('../config/sequelize');

exports.getTeachers = function (req, res) {
    db.Teacher.findAll({}).then(function (teachers) {
        res.send(teachers);
    })
};
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

exports.getTeacher = function (req, res) {
    db.Teacher.findOne({where: {id:req.params.id}}).then(function (teacher) {
        if(!teacher) {
            res.send({error:{status:404, message: "El profesor no existe"}});
        }
        res.send(teacher);
    })
};

exports.getTeacherByUserId = function (req, res) {
    db.Teacher.findOne({where: {user_id:req.params.userId}}).then(function (teacher) {
        if(!teacher) {
            res.send({error:{status:404, message: "El profesor no existe"}});
        }
        res.send(teacher);
    })
};