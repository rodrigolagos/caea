angular.module('app').controller('caeaUserListCtrl', function ($scope, caeaUser, caeaNotifier, $http) {
    $scope.users = caeaUser.query();
    $scope.sortOptions = [{ value: "firstName", text: "Sort by nombre" },
        { value: "lastName", text: "Sort by apellido"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.deleteUser = function (userId) {
        UIkit.modal.confirm("¿Estas seguro?", function(){
            var userRemove = {};
            userRemove.id = userId;
            $http.delete('/api/users/'+userId).then(function (response) {
                if(response.data.success) {
                    $scope.users = caeaUser.query();
                    caeaNotifier.success('Usuario eliminado correctamente');
                }
            });
        });
    }
});