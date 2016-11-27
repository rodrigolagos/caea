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
            Alternativa.belongsTo(models.Pregunta, {foreignKey: {name: 'pregunta_id'}, onDelete: 'CASCADE'});
            Alternativa.belongsTo(models.Modalidad, {foreignKey: {name: 'modalidad_id'}, onDelete: 'CASCADE'});
        }
    });

    return Alternativa;

};