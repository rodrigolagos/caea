var db = require('../config/sequelize'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function (req, res) {
    db.User.findAll({}).then(function (users) {
        res.send(users);
    })
};

exports.getUser = function (req, res) {
    db.User.findOne({where: {id:req.params.id}}).then(function (user) {
        if(!user) {
            res.send({error:{status:404, message: "El usuario no existe"}});
        }
        res.send(user);
    })
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.rol_id = 3;
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    db.User.create(userData).then(function (user) {
        req.logIn(user, function (err) {
            if(err) { return next(err); }
            res.send(user);
        })
    }).catch(function (err) {
        if(err.toString() == 'SequelizeUniqueConstraintError: Validation error') {
            err = new Error('Duplicate Username');
        }
        res.status(400);
        return res.send({reason:err.toString()});
    })
};

exports.updateUser = function (req, res) {
    var userUpdates = req.body;
    if(req.user.id != userUpdates.id && !req.user.hasRole(1)) {
        res.status(403);
        return res.end();
    }
    db.User.findOne({where: {id:req.params.id}}).then(function (user) {
        if(!user) {
            res.send({error:{status:404, message: "El usuario no existe"}});
        }
        user.firstName = userUpdates.firstName;
        user.lastName = userUpdates.lastName;
        user.email = userUpdates.email;
        if(userUpdates.password && userUpdates.password.length > 0) {
            user.salt = encrypt.createSalt();
            user.hashed_pwd = encrypt.hashPwd(user.salt, userUpdates.password)
        }
        user.save().then(function () {
            res.send(user);
        }).catch(function (err) {
            res.status(400);
            return res.send({reason:err.toString()});
        });
    });
}