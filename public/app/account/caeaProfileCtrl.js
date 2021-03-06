angular.module('app').controller('caeaProfileCtrl', function ($scope, caeaAuth, caeaIdentity, caeaNotifier) {
    $scope.email = caeaIdentity.currentUser.email;
    $scope.fname = caeaIdentity.currentUser.firstName;
    $scope.lname = caeaIdentity.currentUser.lastName;

    $scope.update = function () {
        var newUserData = {
            email: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        }
        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        caeaAuth.updateCurrentUser(newUserData).then(function () {
            caeaNotifier.success('Tus datos han sido actualizados correctamente');
        }, function (reason) {
            caeaNotifier.error(reason);
        })
    }
})