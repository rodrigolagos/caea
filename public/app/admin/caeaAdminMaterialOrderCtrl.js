angular.module('app').controller('caeaAdminMaterialOrderCtrl', function ($scope, $routeParams, caeaCourse, caeaTopic, caeaMaterial, $location, caeaIdentity, $http, caeaTopicService, caeaNotifier) {
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
        caeaTopicService.get(topic.course_id, $routeParams.topicId).then(function (topic) {
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
            if($routeParams.learningId==1) {
                $scope.tipoAprendizaje = 'posicionA';
            }
            if($routeParams.learningId==2) {
                $scope.tipoAprendizaje = 'posicionB';
            }
            if($routeParams.learningId==3) {
                $scope.tipoAprendizaje = 'posicionC';
            }
            if($routeParams.learningId==4) {
                $scope.tipoAprendizaje = 'posicionD';
            }
        }).catch(function (err) {
            console.log(err);
        });
    }, function (err) {
        console.log(err);
    });

    var sortable = $('[data-uk-sortable]'),
        button = $('button');

    button.prop('disabled', true);
    button.click(function () {
        saveOrdering(sortable, button);
    });
    sortable.on('stop.uk.sortable', function (e, el, type) {
        button.prop('disabled', false);
        setOrdering(sortable, el);
    });

    function setOrdering(sortable, activeEl) {
        var ordering = 1;
        sortable.find('>li').each(function () {
            var $ele = $(this);
            $ele.data('ordering', ordering);
            $ele.find('div.uk-badge').text(ordering);
            ordering++;
        });
        if (activeEl) {
            activeEl.find('div.uk-badge').addClass('uk-animation-scale-down');
        }
    }
    function saveOrdering (sortable, button) {
        var url = 'index.php',
            data = {
                task: 'saveOrdering',
                ordering: {}
            };
        sortable.find('>li').each(function () {
            data.ordering[$(this).data('id')] = $(this).data('ordering');
        });
        button.prop('disabled', true);
        console.log(data); //data going to server

        for(material in data.ordering) {
            var id = material;
            var order = data.ordering[material];

            var materialUpdates = {};
            if($routeParams.learningId==1) {
                materialUpdates.posicionA = order;
            }
            if($routeParams.learningId==2) {
                materialUpdates.posicionB = order;
            }
            if($routeParams.learningId==3) {
                materialUpdates.posicionC = order;
            }
            if($routeParams.learningId==4) {
                materialUpdates.posicionD = order;
            }

            $http.put('/api/materials/'+id, materialUpdates).then(function (material) {

            });
        }
        caeaNotifier.success('Orden actualizado correctamente');
        $location.path('/admin/topic/'+$routeParams.topicId);
        setTimeout(function(){button.prop('disabled', false);},1000);//for testing only!
    }
});