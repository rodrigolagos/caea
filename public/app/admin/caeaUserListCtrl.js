angular.module('app').controller('caeaUserListCtrl', function ($scope, caeaUser) {
    $scope.users = caeaUser.query();
    $scope.sortOptions = [{ value: "firstName", text: "Sort by nombre" },
        { value: "lastName", text: "Sort by apellido"}];

    $scope.sortOrder = $scope.sortOptions[0].value;
});