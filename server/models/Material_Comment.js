module.exports = function (sequelize, DataTypes) {
    var Material_Comment = sequelize.define('Material_Comment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comentario: { type: DataTypes.STRING },
        fecha_hora: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },{
        associate: function(models) {
            Material_Comment.belongsTo(models.Material, {foreignKey: {name: 'material_id'}, onDelete: 'CASCADE'});
            Material_Comment.belongsTo(models.Student, {foreignKey: {name: 'estudiante_id'}, onDelete: 'CASCADE'});
        },
        tableName: 'Comentario_Material',
        timestamps: false
    });

    return Material_Comment;

};