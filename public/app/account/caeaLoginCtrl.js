angular.module('app').controller('caeaLoginCtrl', function ($scope, $http, caeaIdentity, caeaNotifier, caeaAuth, $location, $route) {
    $scope.identity = caeaIdentity;
    $scope.signin = function (username, password) {
        caeaAuth.authenticateUser(username, password).then(function (response) {
            if(response.success) {
                caeaNotifier.success(response.msg);
                if(caeaIdentity.currentUser.rol_id == 1) {
                    $location.path('/admin');
                } else {
                    $location.path('/')
                }
            } else {
                caeaNotifier.error(response.msg);
            }
        });
    }
});