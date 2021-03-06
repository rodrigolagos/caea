angular.module('app').factory('caeaAuth', function ($http, caeaIdentity, $q, caeaUser) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username:username, password:password}).then(function (response) {
                if (response.data.success) {
                    var user = new caeaUser();
                    angular.extend(user, response.data.user);
                    caeaIdentity.currentUser = user;
                    dfd.resolve({success:true, msg:response.data.msg, user:response.data.user});
                } else {
                    dfd.resolve({success:false, msg:response.data.msg});
                }
            });
            return dfd.promise;
        },
        createUser: function (newUserData) {
            var newUser = new caeaUser(newUserData);
            var dfd = $q.defer();
            newUser.$save().then(function (user) {
                if(newUser.rol_id==3) {
                    var newStudent = {
                        user_id: user.id,
                        tipo_id: newUserData.tipo_id
                    };
                    $http.post('/api/students', newStudent).then(function () {
                        console.log('Estudiante creado');
                    }, function () {
                        console.log('Error al crear estudiante');
                    });
                }
                if(newUser.rol_id==2) {
                    var teacher_validation;
                    if(newUserData.byAdmin) {
                        teacher_validation = 1;
                    } else {
                        teacher_validation = 0;
                    }
                    var newTeacher = {
                        user_id: user.id,
                        validado: teacher_validation
                    };
                    $http.post('/api/teachers', newTeacher).then(function (teacher) {
                        console.log('Profesor creado');
                        if(newUserData.solicitud!=undefined) {
                            if(newUserData.byAdmin) {
                                estado_validacion = 1
                            } else {
                                estado_validacion = 2
                            }
                            var newValidationRequest = {
                                contenido: newUserData.solicitud,
                                estado_id: estado_validacion,
                                profesor_id: teacher.data.id
                            };
                            $http.post('/api/validation-requests', newValidationRequest).then(function () {
                                console.log('Solicitud de validacion creada');
                            }, function () {
                                console.log('Error al crear solicitud de validacion')
                            })
                        }
                    }, function () {
                        console.log('Error al crear profesor');
                    });
                }
                if(!newUserData.byAdmin){
                    caeaIdentity.currentUser = newUser;
                }
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        updateCurrentUser: function (newUserData) {
            var dfd = $q.defer();
            var clone = angular.copy(caeaIdentity.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function () {
                caeaIdentity.currentUser = clone;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        updateUser: function (newUserData, userObject) {
            var dfd = $q.defer();
            var clone = angular.copy(userObject);
            angular.extend(clone, newUserData);
            console.log(clone);
            clone.$update().then(function (user) {
                if(caeaIdentity.currentUser.id == clone.id){
                    caeaIdentity.currentUser = clone;
                }
                dfd.resolve(user);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function (response) {
                caeaIdentity.currentUser = undefined;
                dfd.resolve({success:true, msg:response.data.msg});
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function (role) {
            if(caeaIdentity.isAuthorized(role)) {
                return true;
            } else {
                return false;
            }
        },
        authorizeCurrentUserForRouteByValidation: function () {
            if(caeaIdentity.isTeacherValidated()) {
                return true;
            } else {
                return false;
            }
        },
        authorizeForRoute: function () {
            if(caeaIdentity.isAuthenticated()) {
                return true;
            } else {
                return false;
            }
        },
        authorizeForNotLoggedUser: function () {
            if(caeaIdentity.isAuthenticated()) {
                return false;
            } else {
                return true;
            }
        }
    }
})