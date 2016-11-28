var db = require('../config/sequelize');

exports.createMaterialComment = function (req, res) {
    var materialCommentData = req.body;
    db.Material_Comment.create(materialCommentData).then(function (materialComment) {
        res.send(materialComment);

    }).catch(function (err) {
        res.status(400);
        return res.send({reason:err.toString()});
    })
};

exports.getMaterialCommentsByMaterialId = function (req, res) {
    db.Material_Comment.findAll({where: {material_id:req.params.materialId}}).then(function (material_comment) {
        if(!material_comment) {
            res.send({error:{status:404, message: "No hay comentarios."}});
        }
        res.send(material_comment);
    })
};
