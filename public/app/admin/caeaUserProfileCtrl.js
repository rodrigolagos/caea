angular.module('app').controller('caeaUserProfileCtrl', function ($scope, caeaUser, $routeParams, $location) {
    $scope.user = caeaUser.get({id:$routeParams.userId}, function (user) {
        //Si existe un error
        if(!!user.error) {
            switch(user.error.status) {
                //En caso de que el status del error sea 404(No encontrado)
                case 404:
                    //Redirecciona a la pagina de error 404
                    $location.path('/404');
                    break;
            }
        }
        $scope.user = user;
    }, function (err) {
        console.log(err);
    });
});