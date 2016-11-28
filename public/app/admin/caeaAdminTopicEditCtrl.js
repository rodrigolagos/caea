angular.module('app').controller('caeaAdminTopicEditCtrl', function ($scope, caeaCourse, $routeParams, caeaAuth, caeaNotifier, caeaTopic, caeaIdentity) {
    $scope.identity = caeaIdentity;
    var topicObject;
    $scope.topic = caeaTopic.get({id:$routeParams.topicId}, function (topic) {
        $scope.course = caeaCourse.get({id:topic.ramo_id});
        $scope.titulo = topic.titulo;
        $scope.topic = topic;
        topicObject = topic;
    });

    $scope.updateTopic = function () {
        var newTopicData = {
            titulo: $scope.titulo
        };

        var clone = angular.copy(topicObject);
        angular.extend(clone, newTopicData);
        clone.$update().then(function (topic) {
            $scope.topic = topic;
            caeaNotifier.success('Tópico actualizado correctamente');
        }, function (response) {
            console.log(response.data);
        });
    }
});