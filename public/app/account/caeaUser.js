angular.module('app').factory('caeaUser', function ($resource) {
    var UserResource = $resource('/api/users/:id', {id: "@id"}, {
        update: { method:'PUT', isArray:false }
    });

    UserResource.prototype.isAdmin = function () {
        return this.rol_id == 1;
    }

    return UserResource;
});