angular.module('app').controller('caeaCourseProfileCtrl', function ($scope, $routeParams, caeaCourse, $location, caeaCourseService) {
    $scope.course = caeaCourseService.get($routeParams.courseId).then(function(course) {
        //Si existe un error
        if(!!course.error) {
            switch(course.error.status) {
                //En caso de que el status del error sea 404(No encontrado)
                case 404:
                    //Redirecciona a la pagina de error 404
                    $location.path('/404');
                    break;
            }
        }
        $scope.course = course;
    }).catch(function (err) {
        console.log(err);
    });
});