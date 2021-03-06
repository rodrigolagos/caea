module.exports = function (sequelize, DataTypes) {
    var User_Role = sequelize.define('User_Role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rol: { type: DataTypes.STRING }
    },{
        associate: function(models) {
            User_Role.hasMany(models.User, {foreignKey: {name: 'rol_id'}, onDelete: 'CASCADE'});
        },
        tableName: 'Rol'
    });

    return User_Role;

};