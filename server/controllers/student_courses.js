var db = require('../config/sequelize');

exports.createStudentCourse = function (req, res) {
    var studentCourseData = req.body;
    db.Student_Course.create(studentCourseData).then(function (studentCourse) {
        res.send(studentCourse);

    }).catch(function (err) {
        if(err.toString() == 'SequelizeUniqueConstraintError: Validation error') {
            err = new Error('Duplicate');
        }
        res.status(400);
        return res.send({reason:err.toString()});
    })
};

exports.getStudentCourseByStudentId = function (req, res) {
    db.Student_Course.findAll({where: {estudiante_id:req.params.studentId}}).then(function (student_courses) {
        if(!student_courses) {
            res.send({error:{status:404, message: "No tienes cursos inscritos"}});
        }
        res.send(student_courses);
    })
};