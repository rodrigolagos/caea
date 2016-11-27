module.exports = function (sequelize, DataTypes) {
    var Student_Type = sequelize.define('Student_Type', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tipo_aprendizaje: { type: DataTypes.STRING },
        imagen_fondo: { type: DataTypes.STRING }
    },{
        associate: function(models) {
            Student_Type.hasMany(models.Student, {foreignKey: {name: 'tipo_id'}, onDelete: 'CASCADE'});
        },
        tableName: 'Tipo'
    });

    return Student_Type;

};