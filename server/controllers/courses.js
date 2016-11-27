var db = require('../config/sequelize');

exports.getCourses = function (req, res) {
    db.Course.findAll().then(function (courses) {
        res.send(courses);
    })
};

exports.getCourse = function (req, res) {
    db.Course.findOne({where: {id:req.params.id}}).then(function (course) {
        if(!course) {
            res.send({error:{status:404, message: "El curso no existe"}});
        }
        res.send(course);
    })
};

exports.createCourse = function (req, res) {
    var courseData = req.body;
    db.Course.create(courseData).then(function (course) {
        res.send(course);

    }).catch(function (err) {
        if(err.toString() == 'SequelizeUniqueConstraintError: Validation error') {
            err = new Error('Duplicate Course');
        }
        res.status(400);
        return res.send({reason:err.toString()});
    })
};

exports.updateCourse = function (req, res) {
    var courseUpdates = req.body;

    db.Course.findOne({where: {id:req.params.id}}).then(function (course) {
        if(!course) {
            res.send({error:{status:404, message: "El curso no existe"}});
        }
        course.nombre = courseUpdates.nombre;
        course.sigla = courseUpdates.sigla;
        course.save().then(function () {
            res.send(course);
        }).catch(function (err) {
            res.status(400);
            return res.send({reason:err.toString()});
        });
    });
};

exports.deleteCourse = function (req, res) {
    db.Course.findOne({where: {id:req.params.id}}).then(function (course) {
        if(!course) {
            res.send({error:{status:404, message: "El usuario no existe"}});
        }
        course.destroy().then(function () {
            res.send({success:true});
        });
        /*db.Student.findOne({where: {user_id:user.id}}).then(function (student) {
            if(!student) {
                db.Teacher.findOne({where: {user_id:user.id}}).then(function (teacher) {
                    if(!teacher) {
                        user.destroy().then(function () {
                            res.send({success:true});
                        })
                    }
                    teacher.destroy().then(function () {
                        user.destroy().then(function () {
                            res.send({success:true});
                        })
                    })
                });
                user.destroy().then(function () {
                    res.send({success:true});
                })
            }
            student.destroy().then(function () {
                user.destroy().then(function () {
                    res.send({success:true});
                })
            })

        });*/
    })
};