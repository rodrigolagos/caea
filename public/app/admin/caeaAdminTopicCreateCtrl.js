angular.module('app').controller('caeaAdminTopicCreateCtrl', function ($scope, caeaCourse, caeaTopic, $routeParams, caeaAuth, caeaNotifier, $location) {
    $scope.course = caeaCourse.get({id:$routeParams.courseId});
    $scope.createTopic = function () {
        var newTopicData = {
            titulo: $scope.titulo,
            ramo_id: $routeParams.courseId
        };
        var newTopic = new caeaTopic(newTopicData);
        newTopic.$save().then(function (topic) {
            caeaNotifier.success('Tópico creado correctamente');
            $location.path('/admin/course/'+$routeParams.courseId);
        }, function () {
            caeaNotifier.error('Error al crear tópico');
        });
    };
});