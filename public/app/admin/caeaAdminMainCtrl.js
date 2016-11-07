angular.module('app').controller('caeaAdminMainCtrl', function ($scope, caeaCourse, caeaUser, caeaMaterial) {
    $scope.courses = caeaCourse.query();
    $scope.users = caeaUser.query();
    $scope.materials = caeaMaterial.query();
});