angular.module('app').controller('caeaSignupCtrl', function ($scope, caeaUser, caeaNotifier, $location, caeaAuth) {

    modal = UIkit.modal('#signupModal');

    $scope.closeModal = function () {
        modal.hide();
        $scope.clearForm();
    }
    
    $scope.signup = function () {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        caeaAuth.createUser(newUserData).then(function () {
            modal.hide();
            caeaNotifier.success('User account created!');
            $location.path('/');
        }, function (reason) {
            caeaNotifier.error(reason);
        })
    }

    $scope.clearForm = function () {
        $scope.email = ''; $scope.password = ''; $scope.fname = ''; $scope.lname = '';
    }
})