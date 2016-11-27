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
            Teacher.belongsTo(models.User, {foreignKey: {name: 'user_id'}, onDelete: 'CASCADE'});
            Teacher.hasOne(models.Validation_Request, {foreignKey: {name: 'profesor_id'}, onDelete: 'CASCADE'});
            Teacher.hasMany(models.Teacher_Validation, {foreignKey: {name: 'id_solicitante'}, onDelete: 'CASCADE'});
            Teacher.hasMany(models.Teacher_Validation, {foreignKey: {name: 'id_validador'}, onDelete: 'CASCADE'});
            Teacher.hasMany(models.Teacher_Course, {foreignKey: {name: 'profesor_id'}, onDelete: 'CASCADE'});
        },
        tableName: 'Profesor',
        timestamps: false
    });

    return Teacher;

};