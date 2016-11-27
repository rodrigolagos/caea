module.exports = function (sequelize, DataTypes) {
    var Teacher_Validation = sequelize.define('Teacher_Validation', {
    },{
        associate: function(models) {
            Teacher_Validation.belongsTo(models.Teacher, {foreignKey: {name: 'id_solicitante'}, onDelete: 'CASCADE'});
            Teacher_Validation.belongsTo(models.Teacher, {foreignKey: {name: 'id_validador'}, onDelete: 'CASCADE'});
        },
        tableName: 'Validacion_Profesor',
        timestamps: false
    });

    return Teacher_Validation;

};