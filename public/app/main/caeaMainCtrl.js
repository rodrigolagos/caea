angular.module('app').controller('caeaMainCtrl', function ($scope, caeaCourse, caeaIdentity, $location) {
    if(caeaIdentity.isAuthenticated()) {
        $location.path('/cursos');
    }
});