var encrypt = require('../utilities/encryption');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: { type: DataTypes.STRING },
        lastName: { type: DataTypes.STRING },
        username: { type: DataTypes.STRING, unique: true },
        email: { type: DataTypes.STRING },
        salt: { type: DataTypes.STRING },
        hashed_pwd: { type: DataTypes.STRING },
        imagen_perfil: { type: DataTypes.STRING }
    },{
        instanceMethods:{
            authenticate: function(passwordToMatch) {
                return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
            },
            hasRole: function (role) {
                return this.rol_id == role;
            }
        }
    },{
        associate: function(models) {
            User.hasMany(models.Student, {foreignKey: {name: 'user_id'}, onDelete: 'CASCADE'});
            User.hasMany(models.Teacher, {foreignKey: {name: 'user_id'}, onDelete: 'CASCADE'});
            User.belongsTo(models.User_Role, {foreignKey: {name: 'rol_id'}, onDelete: 'CASCADE'});
        }
    });

    return User;

}