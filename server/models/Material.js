
module.exports = function (sequelize, DataTypes) {
    var Material = sequelize.define('Material', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: { type: DataTypes.STRING },
        type: { type: DataTypes.STRING },
        filename: { type: DataTypes.STRING }
    },{
        associate: function(models) {
            Material.belongsTo(models.Topic, {foreignKey: 'topic_id'});
        }
    });

    return Material;

};