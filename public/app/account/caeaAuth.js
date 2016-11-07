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
            newUser.$save().then(function () {
                caeaIdentity.currentUser = newUser;
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
                return $q.reject('not authorized');
            }
        },
        authorizeForRoute: function () {
            if(caeaIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        authorizeForNotLoggedUser: function () {
            if(caeaIdentity.isAuthenticated()) {
                return $q.reject('is logged');
            } else {
                return true;
            }
        }
    }
})