module.exports = function (sequelize, DataTypes) {
    var Student_Course = sequelize.define('Student_Course', {
    },{
        associate: function(models) {
            Student_Course.belongsTo(models.Student, {foreignKey: {name: 'estudiante_id'}, onDelete: 'CASCADE'});
            Student_Course.belongsTo(models.Course, {foreignKey: {name: 'ramo_id'}, onDelete: 'CASCADE'});
        },
        tableName: 'Estudiante_Ramo',
        timestamps: false
    });

    return Student_Course;

};