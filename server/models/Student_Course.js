module.exports = function (sequelize, DataTypes) {
    var Student_Course = sequelize.define('Student_Course', {
    },{
        associate: function(models) {
            Student_Course.belongsTo(models.Student, {foreignKey: {name: 'estudiante_id', primaryKey:true}, onDelete: 'CASCADE'});
            Student_Course.belongsTo(models.Course, {foreignKey: {name: 'ramo_id', primaryKey:true}, onDelete: 'CASCADE'});
        },
        tableName: 'Estudiante_Ramo',
        timestamps: false
    });

    Student_Course.removeAttribute('id');
    return Student_Course;

};