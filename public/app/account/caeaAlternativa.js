angular.module('app').factory('caeaAlternativa', function ($resource) {
    var AlternativaResource = $resource('/api/alternativas/:id', {id: "@id"}, {
        update: { method:'PUT', isArray:false }
    });

    return AlternativaResource;
});