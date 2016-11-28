angular.module('app').controller('caeaSignupCtrl', function ($scope, caeaUser, caeaNotifier, $location, caeaAuth, caeaPregunta, caeaAlternativa) {
    $scope.preguntas = caeaPregunta.query();
    $scope.alternativas = caeaAlternativa.query();
    $scope.solicitud = "Nombre Completo:\nSoy profesor de\nTrabajo en\nMi motivación para unirme a esta plataforma es"
    $scope.studentSignup = function () {
        if(validacionEncuesta()) {
            var newUserData = {
                firstName: $scope.fname,
                lastName: $scope.lname,
                email: $scope.username + $("#select-mail").val(),
                username: $scope.username,
                rol_id: 3,
                password: $scope.password,
                tipo_id: calcularTipo(),
                byAdmin: false
            };

            caeaAuth.createUser(newUserData).then(function () {
                caeaNotifier.success('Usuario creado correctamente!');
                $location.path('/');
            }, function (reason) {
                caeaNotifier.error(reason);
            })
        } else {
            caeaNotifier.error('Debe responder la encuesta');
        }
    };
    $scope.teacherSignup = function () {
        var newUserData = {
            firstName: $scope.fname,
            lastName: $scope.lname,
            email: $scope.email,
            username: $scope.username,
            rol_id: 2,
            password: $scope.password,
            solicitud: $scope.solicitud,
            byAdmin: false
        };

        caeaAuth.createUser(newUserData).then(function () {
            caeaNotifier.success('Usuario creado correctamente!');
            $location.path('/');
        }, function (reason) {
            caeaNotifier.error(reason);
        })
    };

    var validacionEncuesta = function () {
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

        if( sumaEC == 12 && sumaOR == 12 && sumaCA == 12 && sumaEA == 12 ) {
            return false;
        } else {
            return true;
        }
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