module.exports = function (sequelize, DataTypes) {
    var Teacher_Course = sequelize.define('Teacher_Course', {
    },{
        associate: function(models) {
            Teacher_Course.belongsTo(models.Teacher, {foreignKey: {name: 'profesor_id'}, onDelete: 'CASCADE'});
            Teacher_Course.belongsTo(models.Course, {foreignKey: {name: 'ramo_id'}, onDelete: 'CASCADE'});
        },
        tableName: 'Profesor_Ramo',
        timestamps: false
    });

    return Teacher_Course;

};