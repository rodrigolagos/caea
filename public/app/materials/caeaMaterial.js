angular.module('app').factory('caeaMaterial', function ($resource) {
    var MaterialResource = $resource('/api/materials/:id', {id:"@id"}, {
        update: {method:'PUT', isArray:false}
    });

    return MaterialResource;
});