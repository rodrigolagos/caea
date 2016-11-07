angular.module('app').controller('caeaNavBarLoginCtrl', function ($scope, $http, caeaIdentity, caeaNotifier, caeaAuth, $location) {
    $scope.identity = caeaIdentity;

    $scope.signout = function () {
        caeaAuth.logoutUser().then(function (response) {
            $scope.username = "";
            $scope.password = "";
            caeaNotifier.success(response.msg);
            $location.path('/login');
        })
    }
});