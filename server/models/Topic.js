
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
            Topic.belongsTo(models.Course, {foreignKey: 'ramo_id'});
            Topic.hasMany(models.Material, {foreignKey: 'topico_id'});
        },
        tableName: 'Topico',
        timestamps: false
    });

    return Topic;

};