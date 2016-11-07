angular.module('app').controller('caeaAdminMaterialUploadCtrl', function (Upload, $window, caeaNotifier, $scope, caeaTopic, $routeParams, caeaCourse, caeaMaterial, $q) {
    $scope.topic = caeaTopic.get({id:$routeParams.topicId}, function (topic) {
        $scope.course = caeaCourse.get({id:topic.course_id});
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
                var newMaterialData = {
                    title: $scope.name,
                    type: type,
                    filename: resp.data.filename,
                    topic_id: $routeParams.topicId
                };
                vm.createMaterial(newMaterialData).then(function () {
                    caeaNotifier.success('Success ' + resp.config.data.file.name + 'uploaded. Response: ')
                    $('#progress').removeClass('uk-active').addClass('uk-hidden');
                    $scope.name = '';
                    $scope.up.file = '';
                }, function () {

                });

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