var db = require('../config/sequelize');

exports.getStudent = function (req, res) {
    db.Student.findOne({where: {id:req.params.id}}).then(function (student) {
        if(!student) {
            res.send({error:{status:404, message: "El estudiante no existe"}});
        }
        res.send(student);
    })
};
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
exports.getStudentByUserId = function (req, res) {
    db.Student.findOne({where: {user_id:req.params.userId}}).then(function (student) {
        if(!student) {
            res.send({error:{status:404, message: "El estudiante no existe"}});
        }
        res.send(student);
    })
};