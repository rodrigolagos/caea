var caeaAuth = angular.module('caeaAuth', ['ngRoute', 'ngResource']);

caeaAuth.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/partials/auth/login.html',
      controller: 'LoginController'
    })
    .when('/register', {
      templateUrl: '/partials/auth/register.html',
      controller: 'RegisterController'
    })
    .otherwise({
      templateUrl: '/partials/auth/login.html',
      controller: 'LoginController'
    });
});

caeaAuth.controller('LoginController', function($scope, $http){

  $scope.formData = {};

  $scope.Login = function(){

      if($scope.formData.user == null || $scope.formData.password == null){
          $scope.message='Debe completar todos los campos';
      }
      else{
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
      }
  };

});

caeaAuth.controller('RegisterController', function($scope, $http){

    $scope.newUser = {};

    $scope.preguntas = [];
    $scope.alternativas = [];

    $http.get('/api/preguntas')
        .success(function(data){
            $scope.preguntas = data;
        })
        .error(function(data){
            console.log('Error: ' + data)
        });

    $http.get('/api/preguntas/alternativas')
        .success(function(data){
            $scope.alternativas = data;
        })
        .error(function(data){
            console.log('Error: ' + data)
        });

    $scope.Register = function(){

        $scope.newUser.mail = $scope.newUser.username + $("#select-mail").val();

        var sumaEC = 0;
        var sumaOR = 0;
        var sumaCA = 0;
        var sumaEA = 0;

        $('.1').each(function(){
            sumaEC += parseFloat($(this).val());
        });

        $('.2').each(function(){
            sumaOR += parseFloat($(this).val());
        });

        $('.3').each(function(){
            sumaCA += parseFloat($(this).val());
        });

        $('.4').each(function(){
            sumaEA += parseFloat($(this).val());
        });

        var CA_EC = sumaCA-sumaEC;
        var EA_OR = sumaEA-sumaOR;

        if (CA_EC <= 5){
            if(EA_OR <= 3){
                $scope.newUser.tipo_id = 1;
            }else{
                $scope.newUser.tipo_id = 2;
            }
        }else{
            if(EA_OR <= 3){
                $scope.newUser.tipo_id = 3;
            }else{
                $scope.newUser.tipo_id = 4;
            }
        }

        if ($scope.newUser.name == null || $scope.newUser.password == null || $scope.newUser.username == null) {
            alert("Debe completar todos los campos");
        }
        else {
            $http.post('/api/register', $scope.newUser)
              .success(function(data){
                if(data=='OK'){
                    alert('Usuario registrado correctamente');
                    window.location.replace("/");
                }
                else {
                    alert('ERROR');
                }
              })
              .error(function(data){
                console.log('Error: ' + data)
              });
        }
    };

});
