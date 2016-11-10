angular.module('app').factory('caeaPregunta', function ($resource) {
    var PreguntaResource = $resource('/api/preguntas/:id', {id: "@id"}, {
        update: { method:'PUT', isArray:false }
    });

    return PreguntaResource;
});