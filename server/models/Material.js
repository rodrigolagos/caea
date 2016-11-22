
module.exports = function (sequelize, DataTypes) {
    var Material = sequelize.define('Material', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: { type: DataTypes.STRING },
        descripcion: { type: DataTypes.STRING },
        tipo: { type: DataTypes.STRING },
        archivo: { type: DataTypes.STRING },
        valoracion: { type: DataTypes.INTEGER },
        posicionA: { type: DataTypes.INTEGER },
        posicionB: { type: DataTypes.INTEGER },
        posicionC: { type: DataTypes.INTEGER },
        posicionD: { type: DataTypes.INTEGER }
    },{
        associate: function(models) {
            Material.belongsTo(models.Topic, {foreignKey: 'topic_id'});
        },
        tableName: 'Material',
        timestamps: false
    });

    return Material;

};