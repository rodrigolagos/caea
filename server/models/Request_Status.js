module.exports = function (sequelize, DataTypes) {
    var Request_Status = sequelize.define('Request_Status', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        estado: { type: DataTypes.STRING }
    },{
        associate: function(models) {
            Request_Status.hasMany(models.Validation_Request, {foreignKey: 'estado_id'});
        },
        tableName: 'Estado',
        timestamps: false
    });

    return Request_Status;

};