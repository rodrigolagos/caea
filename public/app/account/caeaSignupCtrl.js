angular.module('app').controller('caeaSignupCtrl', function ($scope, caeaUser, caeaNotifier, $location, caeaAuth, caeaPregunta, caeaAlternativa) {
    $scope.preguntas = caeaPregunta.query();
    $scope.alternativas = caeaAlternativa.query();
    $scope.signup = function () {
        var newUserData = {
            firstName: $scope.fname,
            lastName: $scope.lname,
            email: $scope.username + $("#select-mail").val(),
            username: $scope.username,
            rol_id: 3,
            password: $scope.password,
            tipo_id: calcularTipo()
        };

        caeaAuth.createUser(newUserData).then(function () {
            caeaNotifier.success('User account created!');
            $location.path('/');
        }, function (reason) {
            caeaNotifier.error(reason);
        })
    };

    var calcularTipo = function() {
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

        if (EA_OR <= 5){
            if(CA_EC <= 3){
                return 1;
            }else{
                return 2;
            }
        }else{
            if(CA_EC <= 3){
                return 3;
            }else{
                return 4;
            }
        }
    }
});