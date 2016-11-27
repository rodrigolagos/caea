
module.exports = function (sequelize, DataTypes) {
    var Topic = sequelize.define('Topic', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: { type: DataTypes.STRING },
        indice: { type: DataTypes.INTEGER }
    },{
        associate: function(models) {
            Topic.belongsTo(models.Course, {foreignKey: {name: 'ramo_id'}, onDelete: 'CASCADE'});
            Topic.hasMany(models.Material, {foreignKey: {name: 'topico_id'}, onDelete: 'CASCADE'});
        },
        tableName: 'Topico',
        timestamps: false
    });

    return Topic;

};