angular.module('app').controller('caeaCourseListCtrl', function ($scope, caeaCourse) {
    $scope.courses = caeaCourse.query();

    $scope.sortOptions = [{ value: "title", text: "Sort by title" },
        { value: "published", text: "Sort by Publish Date"}];

    $scope.sortOrder = $scope.sortOptions[0].value;
});