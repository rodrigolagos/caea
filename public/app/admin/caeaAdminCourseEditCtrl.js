angular.module('app').controller('caeaAdminCourseEditCtrl', function ($scope, caeaCourse, $routeParams, caeaAuth, caeaNotifier, caeaIdentity) {
    $scope.identity = caeaIdentity;
    var courseObject;
    $scope.course = caeaCourse.get({id:$routeParams.courseId}, function (course) {
        $scope.nombre = course.nombre;
        $scope.sigla = course.sigla;
        $scope.course = course;
        courseObject = course;
    });

    $scope.updateCourse = function () {
        var newCourseData = {
            nombre: $scope.nombre,
            sigla: $scope.sigla
        };

        var clone = angular.copy(courseObject);
        angular.extend(clone, newCourseData);
        clone.$update().then(function (course) {
            $scope.course = course;
            caeaNotifier.success('Curso actualizado correctamente');
        }, function (response) {
            console.log(response.data);
        });
    }
});