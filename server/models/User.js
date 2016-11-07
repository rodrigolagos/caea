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
        salt: { type: DataTypes.STRING },
        hashed_pwd: { type: DataTypes.STRING },
        rol: { type: DataTypes.ENUM('admin', 'user') }
    },{
        instanceMethods:{
            authenticate: function(passwordToMatch) {
                return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
            },
            hasRole: function (role) {
                return this.rol == role;
            }
        }
    });

    return User;

}