angular.module('app').controller('caeaCourseListCtrl', function ($scope, caeaCourse) {
    $scope.courses = caeaCourse.query();

    $scope.sortOptions = [{ value: "title", text: "Ordenar por titulo" },
        { value: "published", text: "Ordenar por fecha"}];

    $scope.sortOrder = $scope.sortOptions[0].value;
});