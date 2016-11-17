angular.module('app').controller('caeaUserEditCtrl', function ($scope, caeaUser, $routeParams, caeaAuth, caeaNotifier) {
    var userObject;
    $scope.user = caeaUser.get({id:$routeParams.userId}, function (user) {
        $scope.email = user.email;
        $scope.fname = user.firstName;
        $scope.lname = user.lastName;
        userObject = user;
    });

    $scope.update = function () {
        var newUserData = {
            email: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        }
        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        caeaAuth.updateUser(newUserData, userObject).then(function (user) {
            $scope.user = user;
            caeaNotifier.success('Usuario actualizado');
        }, function (reason) {
            caeaNotifier.error(reason);
        })
    }
});