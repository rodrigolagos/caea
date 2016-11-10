module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define('Student', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    },{
        associate: function(models) {
            Student.belongsTo(models.Student_Type, {foreignKey: 'tipo_id'});
            Student.belongsTo(models.User, {foreignKey: 'user_id'});
        },
        tableName: 'Estudiante'
    });

    return Student;

};