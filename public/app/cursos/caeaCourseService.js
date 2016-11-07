angular.module('app').factory( 'caeaCourseService', function ( $http, $q, caeaCourse ) {
    return {
        get: function getCourse(id) {
            var deferred = $q.defer();
            caeaCourse.get({id:id}, function (course) {
                $http.get('/api/courses/' + id + '/topics').then(function (topics) {
                    course.topics = topics.data;
                    deferred.resolve(course);
                }, function (err) { deferred.reject(err); })
            }, function (err) { deferred.reject(err); });

            return deferred.promise;
        }
    };
});