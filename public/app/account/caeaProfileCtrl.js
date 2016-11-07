angular.module('app').controller('caeaProfileCtrl', function ($scope, caeaAuth, caeaIdentity, caeaNotifier) {
    $scope.email = caeaIdentity.currentUser.username;
    $scope.fname = caeaIdentity.currentUser.firstName;
    $scope.lname = caeaIdentity.currentUser.lastName;

    $scope.update = function () {
        var newUserData = {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        }
        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        caeaAuth.updateCurrentUser(newUserData).then(function () {
            caeaNotifier.success('Your user account has been updated');
        }, function (reason) {
            caeaNotifier.error(reason);
        })
    }
})