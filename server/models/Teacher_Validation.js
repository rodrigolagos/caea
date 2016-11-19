module.exports = function (sequelize, DataTypes) {
    var Teacher_Validation = sequelize.define('Teacher_Validation', {
    },{
        associate: function(models) {
            Teacher_Validation.belongsTo(models.Teacher, {foreignKey: 'id_solicitante'});
            Teacher_Validation.belongsTo(models.Teacher, {foreignKey: 'id_validador'});
        },
        tableName: 'Validacion_Profesor',
        timestamps: false
    });

    return Teacher_Validation;

};