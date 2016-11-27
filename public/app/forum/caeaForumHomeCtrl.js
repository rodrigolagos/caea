angular.module('app').controller('caeaForumHomeCtrl', function ($scope, $http) {
    var lista = [];
    $http.get('/api/validation-requests').then(function (validation_requests) {
        for(validation_request in validation_requests.data) {
            var validation = {};
            var nombre;
            var datos_tmp = validation_requests.data[validation_request];
            var contenido_tmp = datos_tmp.contenido.split("\n");
            datos_tmp.contenido = contenido_tmp;

            $http.get('/api/teachers/'+datos_tmp.profesor_id).then(function (teacher) {
                $http.get('/api/users/'+teacher.data.user_id).then(function (user) {
                    nombre = user.data.firstName + ' ' + user.data.lastName;
                    validation.nombre = nombre;
                });
            });
            validation.datos = datos_tmp;
            lista.push(validation);
        }
        $scope.validation_requests = lista;
        console.log(lista);
    });
});