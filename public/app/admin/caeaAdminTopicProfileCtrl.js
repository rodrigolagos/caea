angular.module('app').controller('caeaAdminTopicProfileCtrl', function ($scope, $routeParams, caeaCourse, caeaTopic, caeaMaterial, $location, caeaIdentity, $http, caeaNotifier) {
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
        $scope.course = caeaCourse.get({id:topic.ramo_id});
        $scope.materials = $http.get('/api/topics/'+topic.id+'/materials').then(function (materials) {
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
    };

    $(".learning-button").click(function () {
        $("#order-button > span").text($(this).text());
        $("#order-button").attr('href', '/admin/topic/'+$(this).attr('topic-id')+'/materials/learning/'+$(this).attr('learning-id')+'/ordenar');
        console.log($(this).attr('topic-id'));
    });

    $scope.deleteMaterial = function (materialId) {
        UIkit.modal.confirm("¿Estas seguro?", function(){
            var materialRemove = {};
            materialRemove.id = materialId;
            $http.delete('/api/materials/'+materialId).then(function (response) {
                if(response.data.success) {
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
                        $scope.course = caeaCourse.get({id:topic.ramo_id});
                        $scope.materials = $http.get('/api/topics/'+topic.id+'/materials').then(function (materials) {
                            if(!!materials.data.error) {
                                $scope.materials = undefined;
                            }
                            $scope.materials = materials.data;
                        }, function (err) { console.log(err) })
                    }, function (err) {
                        console.log(err);
                    });
                    caeaNotifier.success('Material eliminado correctamente');
                }
            });
        }, {labels: {'Ok': 'Eliminar', 'Cancel': 'Cancelar'}});
    }
});