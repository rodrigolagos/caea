angular.module('app').factory('caeaTopic', function ($resource) {
    var CourseResource = $resource('/api/topics/:id', {id:"@id"}, {
        update: {method:'PUT', isArray:false}
    });

    return CourseResource;
});