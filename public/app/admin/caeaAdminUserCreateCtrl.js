angular.module('app').controller('caeaAdminUserCreateCtrl', function ($scope, caeaUser, $routeParams, caeaAuth, caeaNotifier, $location) {
    $scope.createStudent = function () {
        var newUserData = {
            firstName: $scope.fname,
            lastName: $scope.lname,
            email: $scope.username + $("#select-mail").val(),
            username: $scope.username,
            rol_id: 3,
            password: $scope.password,
            tipo_id: $("#select-learning").val(),
            byAdmin: true
        };

        caeaAuth.createUser(newUserData).then(function () {
            caeaNotifier.success('Usuario creado correctamente');
            $location.path('/admin/users');
        }, function (reason) {
            caeaNotifier.error(reason);
        })
    };
    $scope.createTeacher = function () {
        var newUserData = {
            firstName: $scope.fname,
            lastName: $scope.lname,
            email: $scope.email,
            username: $scope.username,
            rol_id: 2,
            password: $scope.password,
            byAdmin: true
        };

        caeaAuth.createUser(newUserData).then(function () {
            caeaNotifier.success('Usuario creado correctamente');
            $location.path('/admin/users');
        }, function (reason) {
            caeaNotifier.error(reason);
        })
    };
});