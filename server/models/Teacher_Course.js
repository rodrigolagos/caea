module.exports = function (sequelize, DataTypes) {
    var Teacher_Course = sequelize.define('Teacher_Course', {
    },{
        associate: function(models) {
            Teacher_Course.belongsTo(models.Teacher, {foreignKey: 'profesor_id'});
            Teacher_Course.belongsTo(models.Course, {foreignKey: 'ramo_id'});
        },
        tableName: 'Profesor_Ramo',
        timestamps: false
    });

    return Teacher_Course;

};