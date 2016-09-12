var caeaMain = angular.module('caeaMain', ['ngRoute', 'ngResource']);

caeaMain.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html',
      controller: 'MainController'
    })
    .otherwise({
      templateUrl: '/partials/home.html',
      controller: 'MainController'
    });
});

caeaMain.controller('MainController', function($scope, $http){

    $scope.ramos = [];

    var session_username = $("#session-username").html();

    $http.get('/api/estudiante/'+ session_username +'/ramos')
        .success(function(data){
            $scope.ramos = data;
        })
        .error(function(data){
            console.log('Error: ' + data)
        });

});
