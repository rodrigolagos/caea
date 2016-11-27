
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
            Course.hasMany(models.Topic, {foreignKey: {name: 'ramo_id'}, onDelete: 'CASCADE'});
            Course.hasMany(models.Teacher_Course, {foreignKey: {name: 'ramo_id', primaryKey:true}, onDelete: 'CASCADE'});
            Course.hasMany(models.Student_Course, {foreignKey: {name: 'ramo_id', primaryKey:true}, onDelete: 'CASCADE'});
        },
        tableName: 'Ramo',
        timestamps: false
    });

    return Course;

};