angular.module('app').controller('caeaAdminCourseCreateCtrl', function ($scope, caeaCourse, $routeParams, caeaAuth, caeaNotifier, $location) {
    $scope.createCourse = function () {
        var newCourseData = {
            nombre: $scope.nombre,
            sigla: $scope.sigla
        };
        var newCourse = new caeaCourse(newCourseData);
        newCourse.$save().then(function (course) {
            caeaNotifier.success('Curso creado correctamente');
            $location.path('/admin/courses');
        }, function () {
            caeaNotifier.error('Error al crear curso');
        });
    };
});