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
    db.Topic.findAll({where: {ramo_id:req.params.courseId}, include: [db.Course] }).then(function (topics) {
        res.send(topics);
    })
};

exports.createTopic = function (req, res) {
    var topicData = req.body;
    db.Topic.create(topicData).then(function (topic) {
        res.send(topic);

    }).catch(function (err) {
        if(err.toString() == 'SequelizeUniqueConstraintError: Validation error') {
            err = new Error('Duplicate Topic');
        }
        res.status(400);
        return res.send({reason:err.toString()});
    })
};

exports.updateTopic = function (req, res) {
    var topicUpdates = req.body;

    db.Topic.findOne({where: {id:req.params.id}}).then(function (topic) {
        if(!topic) {
            res.send({error:{status:404, message: "El tópico no existe"}});
        }
        topic.titulo = topicUpdates.titulo;
        topic.save().then(function () {
            res.send(topic);
        }).catch(function (err) {
            res.status(400);
            return res.send({reason:err.toString()});
        });
    });
};

exports.deleteTopic = function (req, res) {
    db.Topic.findOne({where: {id:req.params.id}}).then(function (topic) {
        if(!topic) {
            res.send({error:{status:404, message: "El topic no existe"}});
        }
        topic.destroy().then(function () {
            res.send({success:true});
        });
    })
};