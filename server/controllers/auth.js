var passport = require('passport');

exports.authenticate = function (req, res, next) {
    if(req.body.username == '' || req.body.password == '' || req.body.username == undefined || req.body.password == undefined){
        res.send({ success:false, msg: 'Debe completar todos los campos' });
    } else {
        req.body.username = req.body.username.toLowerCase();
        var auth = passport.authenticate('local', function (err, user) {
            if (err) { return next(err); }
            if (!user) { res.send({ success:false, msg: 'Usuario o password incorrecto' }) }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                res.send({ success:true, user: user, msg: 'Sesión iniciada correctamente' });
            })
        })
        auth(req, res, next);
    }
};

exports.logout = function (req, res) {
    req.logout();
    res.send({msg: 'Su sesión ha sido cerrada correctamente'});
};

exports.requireAuthentication = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.status(403);
        res.send({
            error: {
                status:403,
                message:"No tienes autorización"
            }
        });
    } else {
        next();
    }
};


exports.requiresApiLogin = function (req, res, next) {
    if(!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};

exports.hasAuthorization = function(req, res, next) {
    if (req.body.id !== req.user.id && req.user.rol_id != 1) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

exports.requiresRole = function (role) {
    return function (req, res, next) {
        if(!req.isAuthenticated() || req.user.rol_id != role) {
            res.status(403);
            res.send({
                error: {
                    status:403,
                    message:"No tienes autorización"
                }
            });
        } else {
            next();
        }
    }
};