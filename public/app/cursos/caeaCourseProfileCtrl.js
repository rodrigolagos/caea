angular.module('app').controller('caeaCourseProfileCtrl', function ($scope, $routeParams, caeaCourse, $location, caeaCourseService, caeaIdentity, $http, caeaNotifier) {
    $scope.identity = caeaIdentity;
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

    $scope.deleteTopic = function (topicId) {
        UIkit.modal.confirm("Al eliminar el tópico se borarán todos los materiales asociados a este. ¿Estas seguro?", function(){
            var topicRemove = {};
            topicRemove.id = topicId;
            $http.delete('/api/topics/'+topicId).then(function (response) {
                if(response.data.success) {
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
                    caeaNotifier.success('Curso eliminado correctamente');
                }
            });
        }, {labels: {'Ok': 'Eliminar', 'Cancel': 'Cancelar'}});
    }
});