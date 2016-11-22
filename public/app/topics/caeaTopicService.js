angular.module('app').factory( 'caeaTopicService', function ( $http, $q, caeaTopic ) {
    return {
        get: function getTopic(courseId, topicId) {
            var deferred = $q.defer();
            caeaTopic.get({id:topicId}, function (topic) {
                $http.get('/api/topics/' + topicId + '/materials').then(function (materials) {
                    topic.materials = materials.data;
                    deferred.resolve(topic);
                }, function (err) { deferred.reject(err); })
            }, function (err) { deferred.reject(err); });

            return deferred.promise;
        }
    };
});