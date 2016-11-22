angular.module('app').factory('caeaIdentity', function ($window, caeaUser, $http) {
    var currentUser;
    if(!!$window.bootstrappedUserObject) {
        currentUser = new caeaUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        getTeacherByUserId: function () {
            var promise = $http.get('/api/users/'+this.currentUser.id+'/teachers').then(function (response) {
                // The then function here is an opportunity to modify the response
                // The return value gets picked up by the then in the controller.
                return response.data.validado;
            });
            return promise;
        },
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.rol_id == role;
        }
    }
})