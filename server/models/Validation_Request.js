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
            Validation_Request.belongsTo(models.Teacher, {foreignKey: 'profesor_id'});
            Validation_Request.belongsTo(models.Request_Status, {foreignKey: 'estado_id'});
        },
        tableName: 'Solicitud_Validacion',
        timestamps: false
    });

    return Validation_Request;

};