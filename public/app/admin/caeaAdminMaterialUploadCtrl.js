angular.module('app').controller('caeaAdminMaterialUploadCtrl', function (Upload, $window, caeaNotifier, $scope, caeaTopic, $routeParams, caeaCourse, caeaMaterial, $q, $http) {
    $scope.topic = caeaTopic.get({id:$routeParams.topicId}, function (topic) {
        $scope.course = caeaCourse.get({id:topic.ramo_id});
    });
    var vm = this;
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
    }
    vm.createMaterial = function (newMaterialData) {
        var newMaterial = new caeaMaterial(newMaterialData);
        var dfd = $q.defer();
        newMaterial.$save().then(function () {
            dfd.resolve();
        }, function (response) {
            dfd.reject(response.data.reason);
        });
        return dfd.promise;
    }
    vm.upload = function (file) {
        Upload.upload({
            url: '/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            console.log(resp);
            if(resp.data.error_code === 0){ //validate success
                var type = file.type;
                var type_splited = type.split('/');
                switch (type_splited[0])
                {
                    case 'application':
                        type = 'pdf';
                        break;
                    case 'image':
                        type = 'image'
                        break;
                    default:
                        type = 'video'
                }
                $scope.materials = $http.get('/api/topics/'+$routeParams.topicId+'/materials').then(function (materials) {
                    var cantidad_materiales;
                    if(!!materials.data.error) {
                        $scope.materials = undefined;
                        var cantidad_materiales = 0;
                    } else {
                        cantidad_materiales = materials.data.length;
                    }
                    $scope.materials = materials.data;

                    console.log(materials.data.length);

                    var newMaterialData = {
                        titulo: $scope.name,
                        descripcion: $scope.description,
                        tipo: type,
                        archivo: resp.data.filename,
                        topic_id: $routeParams.topicId,
                        posicionA: cantidad_materiales+1,
                        posicionB: cantidad_materiales+1,
                        posicionC: cantidad_materiales+1,
                        posicionD: cantidad_materiales+1
                    };
                    vm.createMaterial(newMaterialData).then(function () {
                        caeaNotifier.success(resp.config.data.file.name + ' subido corectamente')
                        $('#progress').removeClass('uk-active');
                        $scope.name = '';
                        $scope.description = '';
                        $scope.up.file = '';
                    }, function () {

                    });
                }, function (err) { console.log(err) });


            } else {
                console.log(resp.data.err_desc);
                caeaNotifier.error('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            vm.progressPercentage = progressPercentage;
            $('#progress').removeClass('uk-hidden').addClass('uk-active');
            $('#subir-material').removeClass('uk-margin-top');
            $('#subir-material').prop('disabled', true);
        });
    };
});