module.exports = function (sequelize, DataTypes) {
    var Validation_Request = sequelize.define('Validation_Request', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        contenido: { type: DataTypes.STRING }
    },{
        associate: function(models) {
            Validation_Request.belongsTo(models.Teacher, {foreignKey: {name: 'profesor_id'}, onDelete: 'CASCADE'});
            Validation_Request.belongsTo(models.Request_Status, {foreignKey: {name: 'estado_id'}, onDelete: 'CASCADE'});
        },
        tableName: 'Solicitud_Validacion',
        timestamps: false
    });

    return Validation_Request;

};