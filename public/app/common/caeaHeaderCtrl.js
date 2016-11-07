angular.module('app').controller('caeaHeaderCtrl', function ($scope, $location, caeaIdentity, $route) {
    $scope.identity = caeaIdentity;
    $scope.$route = $route;
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.showOffCanvas = function () {
        UIkit.offcanvas.show('#off-canvas', {mode: 'slide'});
    }

    //Cerrar off-canvas cuando se hace click en el menú
    $('.uk-nav-offcanvas li a').click(function() {
        UIkit.offcanvas.hide();
    });
});