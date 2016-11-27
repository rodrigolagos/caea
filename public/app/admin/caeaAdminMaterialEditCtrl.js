angular.module('app').controller('caeaAdminMaterialEditCtrl', function ($scope, caeaCourse, $routeParams, caeaAuth, caeaNotifier, caeaTopic, caeaMaterial) {
    var materialObject;
    $scope.material = caeaMaterial.get({id:$routeParams.materialId}, function (material) {
        $scope.topic = caeaTopic.get({id:material.topico_id}, function (topic) {
            $scope.topic = topic;
            $scope.course = caeaCourse.get({id:topic.ramo_id});
        });
        $scope.titulo = material.titulo;
        $scope.descripcion = material.descripcion;
        $scope.archivo = material.archivo;
        $scope.material = material;
        materialObject = material;
    });

    $scope.updateMaterial = function () {
        var newMaterialData = {
            titulo: $scope.titulo,
            descripcion: $scope.descripcion
        };

        var clone = angular.copy(materialObject);
        angular.extend(clone, newMaterialData);
        clone.$update().then(function (material) {
            $scope.material = material;
            caeaNotifier.success('Material actualizado correctamente');
        }, function (response) {
            console.log(response.data);
        });
    }
});