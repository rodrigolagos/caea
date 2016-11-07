var db = require('../config/sequelize');

exports.getMaterials = function (req, res) {
    db.Material.findAll({}).then(function (materials) {
        res.send(materials);
    })
};
exports.createMaterial = function (req, res, next) {
    var materialData = req.body;
    db.Material.create(materialData).then(function (material) {
        res.send(material);
    }).catch(function (err) {
        res.status(400);
        return res.send({reason:err.toString()});
    })
};
exports.getMaterial = function (req, res) {
    db.Material.findOne({where: {id:req.params.id}}).then(function (material) {
        if(!material) {
            res.send({error:{status:404, message: "El material no existe"}});
        }
        res.send(material);
    })
};
exports.getMaterialsByTopicId = function (req, res) {
    db.Material.findAll({where: {topic_id:req.params.topicId}, include: [{model:db.Topic, where: {course_id:req.params.courseId}, include: [db.Course]}]}).then(function (materials) {
        if(materials.length < 1) {
            res.send({error:{status:404, message: "No se encontraron materiales."}});
        }
        res.send(materials);
    })
};