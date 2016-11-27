angular.module('app').controller('caeaCourseListCtrl', function ($scope, caeaCourse, $http, caeaNotifier) {
    $scope.courses = caeaCourse.query();

    $scope.sortOptions = [{ value: "title", text: "Ordenar por titulo" },
        { value: "published", text: "Ordenar por fecha"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.deleteCourse = function (courseId) {
        UIkit.modal.confirm("Al eliminar el curso se borarán todos los tópicos y materiales asociados a este. ¿Estas seguro?", function(){
            var courseRemove = {};
            courseRemove.id = courseId;
            $http.delete('/api/courses/'+courseId).then(function (response) {
                if(response.data.success) {
                    $scope.courses = caeaCourse.query();
                    caeaNotifier.success('Curso eliminado correctamente');
                }
            });
        }, {labels: {'Ok': 'Eliminar', 'Cancel': 'Cancelar'}});
    }
});