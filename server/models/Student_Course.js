module.exports = function (sequelize, DataTypes) {
    var Student_Course = sequelize.define('Student_Course', {
    },{
        associate: function(models) {
            Student_Course.belongsTo(models.Student, {foreignKey: 'estudiante_id'});
            Student_Course.belongsTo(models.Course, {foreignKey: 'ramo_id'});
        },
        tableName: 'Estudiante_Ramo',
        timestamps: false
    });

    return Student_Course;

};