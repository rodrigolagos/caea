module.exports = function (sequelize, DataTypes) {
    var Modalidad = sequelize.define('Modalidad', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: { type: DataTypes.STRING }
    },{
        associate: function(models) {
            Modalidad.hasMany(models.Alternativa, {foreignKey: {name: 'modalidad_id'}, onDelete: 'CASCADE'});
        }
    });

    return Modalidad;

};