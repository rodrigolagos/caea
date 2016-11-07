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