angular.module('app').controller('caeaTopicProfileCtrl', function ($scope, $routeParams, caeaCourse, caeaTopicService, $location, caeaIdentity, $sce, $http, caeaNotifier) {
    $scope.identity = caeaIdentity;
    $http.get('/api/users/'+caeaIdentity.currentUser.id+'/students').then(function (student) {
        switch(student.data.tipo_id){
            case 1:
                $scope.tipoAprendizaje = 'posicionA';
                break;
            case 2:
                $scope.tipoAprendizaje = 'posicionB';
                break;
            case 3:
                $scope.tipoAprendizaje = 'posicionC';
                break;
            case 4:
                $scope.tipoAprendizaje = 'posicionD';
                break;

        }
    });
    $scope.course = caeaCourse.get({id:$routeParams.courseId});
    caeaTopicService.get($routeParams.courseId, $routeParams.topicId).then(function (topic) {
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
    }).catch(function (err) {
        console.log(err);
    });

    var setMaterial;
    $scope.viewMaterial = function (type, file, materialId) {
        setMaterial = materialId;
        $scope.comment = '';
        switch(type) {
            case 'pdf':
                $('#content').html('<iframe class="uk-hidden-small" src="'+ file +'" type="text/html" allowfullscreen="true" height="550" width="100%"></iframe><div class="uk-visible-small"><a href="'+file+'">Descargar archivo</a></div>');
                break;
            case 'image':
                $('#content').html('<img src="'+ file +'" alt="" style="max-width; max-height: 550px;">');
                break;
            case 'video':
                $('#content').html('<video src="'+ file +'" width="100%" style="max-height: 550px" controls></video>');
                break;
            default:
                $('#content').html('<p>Elemento</p>');
        }

        $scope.comments = $http.get('/api/materials/'+setMaterial+'/comments').then(function (material_comments) {
            $scope.comments = material_comments.data;
        });
        UIkit.modal('#modal-id').show();
    };

    $scope.sendComment = function () {
        $http.get('/api/users/'+caeaIdentity.currentUser.id+'/students').then(function (student) {
            newCommentMaterialData = {
                comentario: $scope.comment,
                material_id: setMaterial,
                estudiante_id: student.data.id
            };
            $http.post('/api/material-comments', newCommentMaterialData).then(function (material_comment) {
                caeaNotifier.success('Comentario enviado correctamente');
                $scope.comment = '';
                $scope.comments = $http.get('/api/materials/'+setMaterial+'/comments').then(function (material_comments) {
                    $scope.comments = material_comments.data;
                });
            }, function (err) {
                caeaNotifier.error(err.data.reason);
            })
        });
    };

    $scope.openModalFeedback = function () {
        UIkit.modal('#modal-feedback').show();
    };

    $scope.sendFeedback = function () {
        caeaNotifier.success('Feedback enviado correctamente');
        UIkit.modal('#modal-feedback').hide();
    };

    $scope.cancelFeedback = function () {
        UIkit.modal('#modal-feedback').hide();
    }
});