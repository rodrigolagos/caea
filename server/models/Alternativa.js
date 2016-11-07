module.exports = function (sequelize, DataTypes) {
    var Alternativa = sequelize.define('Alternativa', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        alternativa: { type: DataTypes.STRING },
    },{
        associate: function(models) {
            Alternativa.belongsTo(models.Pregunta, {foreignKey: 'pregunta_id'});
            Alternativa.belongsTo(models.Modalidad, {foreignKey: 'modalidad_id'});
        }
    });

    return Alternativa;

};