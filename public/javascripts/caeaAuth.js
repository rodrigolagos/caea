var caeaAuth = angular.module('caeaAuth', ['ngRoute', 'ngResource']);

caeaAuth.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/partials/auth/login.html',
      controller: 'AuthController'
    })
    .when('/register', {
      templateUrl: '/partials/auth/register.html',
      controller: 'AuthController'
    })
    .otherwise({
      templateUrl: '/partials/auth/login.html',
      controller: 'AuthController'
    });
});

caeaAuth.controller('AuthController', function($scope, $http){

  $scope.formData = {};

  $scope.Login = function(){
    $http.post('/api/login', $scope.formData)
      .success(function(data){
        if(data=='OK') {
          location.reload();
        }
        else {
          $scope.message = data;
        }

      })
      .error(function(data){
        console.log('Error: ' + data)
      });
  };

});
