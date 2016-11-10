angular.module('app').factory('caeaIdentity', function ($window, caeaUser) {
    var currentUser;
    if(!!$window.bootstrappedUserObject) {
        currentUser = new caeaUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.rol_id == role;
        }
    }
})