angular.module('app').controller('caeaAdminTopicProfileCtrl', function ($scope, $routeParams, caeaCourse, caeaTopic, caeaMaterial, $location, caeaIdentity, $http) {
    $scope.identity = caeaIdentity;
    caeaTopic.get({id:$routeParams.topicId}, function (topic) {
        //Si existe un error
        if(!!topic.error) {
            switch(topic.error.status) {
                //En caso de que el status del error sea 404(No encontrado)
                case 404:
                    //Redirecciona a la pagina de error 404
                    $location.path('/404');
                    break;
            }
        }
        $scope.topic = topic;
        $scope.course = caeaCourse.get({id:topic.course_id});
        $scope.materials = $http.get('/api/courses/1/topics/'+topic.id+'/materials').then(function (materials) {
            if(!!materials.data.error) {
                $scope.materials = undefined;
            }
            $scope.materials = materials.data;
        }, function (err) { console.log(err) })
    }, function (err) {
        console.log(err);
    });

    $scope.viewMaterial = function (type, file) {
        switch(type) {
            case 'pdf':
                $('#content').html('<iframe class="uk-hidden-small" src="'+ file +'" type="text/html" allowfullscreen="true" height="500" width="100%"></iframe><div class="uk-visible-small"><a href="'+file+'">Descargar archivo</a></div>');
                break;
            case 'image':
                $('#content').html('<img src="'+ file +'" width="100%" alt="">');
                break;
            case 'video':
                $('#content').html('<video src="'+ file +'" width="100%" controls></video>');
                break;
            default:
                $('#content').html('<p>Elemento</p>');
        }

        UIkit.modal('#modal-id').show();
    }
});