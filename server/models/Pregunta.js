module.exports = function (sequelize, DataTypes) {
    var Pregunta = sequelize.define('Pregunta', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pregunta: { type: DataTypes.STRING }
    },{
        associate: function(models) {
            Pregunta.hasMany(models.Alternativa, {foreignKey: 'pregunta_id'});
        }
    });

    return Pregunta;

};