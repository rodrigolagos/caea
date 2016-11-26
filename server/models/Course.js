
module.exports = function (sequelize, DataTypes) {
    var Course = sequelize.define('Course', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sigla: { type: DataTypes.STRING },
        nombre: { type: DataTypes.STRING }
    },{
        associate: function(models) {
            Course.hasMany(models.Topic, {foreignKey: 'ramo_id'});
            Course.hasMany(models.Teacher_Course, {foreignKey: 'ramo_id'});
            Course.hasMany(models.Student_Course, {foreignKey: 'ramo_id'});
        },
        tableName: 'Ramo',
        timestamps: false
    });

    return Course;

};