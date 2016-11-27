var db = require('../config/sequelize');

exports.createTeacherCourse = function (req, res) {
    var teacherCourseData = req.body;
    db.Teacher_Course.create(teacherCourseData).then(function (teacherCourse) {
        res.send(teacherCourse);

    }).catch(function (err) {
        if(err.toString() == 'SequelizeUniqueConstraintError: Validation error') {
            err = new Error('Duplicate');
        }
        res.status(400);
        return res.send({reason:err.toString()});
    })
};

exports.getStudentCourseByTeacherId = function (req, res) {
    db.Teacher_Course.findAll({where: {profesor_id:req.params.teacherId}}).then(function (teacher_courses) {
        if(!teacher_courses) {
            res.send({error:{status:404, message: "No tienes cursos inscritos"}});
        }
        res.send(teacher_courses);
    })
};