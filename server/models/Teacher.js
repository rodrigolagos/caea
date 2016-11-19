module.exports = function (sequelize, DataTypes) {
    var Teacher = sequelize.define('Teacher', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha_registro: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        validado: { type: DataTypes.BOOLEAN }
    },{
        associate: function(models) {
            Teacher.belongsTo(models.User, {foreignKey: 'user_id'});
            Teacher.hasOne(models.Validation_Request, {foreignKey: 'profesor_id'});
            Teacher.hasMany(models.Teacher_Validation, {foreignKey: 'id_solicitante'});
            Teacher.hasMany(models.Teacher_Validation, {foreignKey: 'id_validador'});
        },
        tableName: 'Profesor',
        timestamps: false
    });

    return Teacher;

};