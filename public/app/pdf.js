angular.module('pdf', ['ngResource','ngRoute','pdfjsViewer']);

angular.module('pdf').controller('AppCtrl', function($scope) {
    $scope.pdf = {
        src: '/pdf.pdf',
    };

    $scope.$watch('scale', function() {
    });

    $scope.onInit = function() {
    };

    $scope.onPageLoad = function(page) {
    };
});