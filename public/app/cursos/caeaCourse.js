angular.module('app').factory('caeaCourse', function ($resource) {
    var CourseResource = $resource('/api/courses/:id', {id:"@id"}, {
        update: {method:'PUT', isArray:false}
    });

    return CourseResource;
});