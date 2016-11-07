var db = require('../config/sequelize');

exports.getTopics = function (req, res) {
    db.Topic.findAll({}).then(function (topics) {
        res.send(topics);
    })
};
exports.getTopic = function (req, res) {
    db.Topic.findOne({where: {id:req.params.id}}).then(function (topic) {
        if(!topic) {
            res.send({error:{status:404, message: "El curso no existe"}});
        }
        res.send(topic);
    })
};
exports.getTopicsByCourseId = function (req, res) {
    db.Topic.findAll({where: {course_id:req.params.courseId}, include: [db.Course] }).then(function (topics) {
        res.send(topics);
    })
};