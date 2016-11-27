module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define('Student', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    },{
        associate: function(models) {
            Student.belongsTo(models.Student_Type, {foreignKey: {name: 'tipo_id'}, onDelete: 'CASCADE'});
            Student.belongsTo(models.User, {foreignKey: {name: 'user_id'}, onDelete: 'CASCADE'});
            Student.hasMany(models.Student_Course, {foreignKey: {name: 'estudiante_id'}, onDelete: 'CASCADE'});
        },
        tableName: 'Estudiante'
    });

    return Student;

};