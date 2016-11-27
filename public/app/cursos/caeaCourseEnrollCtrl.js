angular.module('app').controller('caeaCourseEnrollCtrl', function ($scope, caeaCourse, $http, caeaNotifier, caeaIdentity) {
    $scope.identity = caeaIdentity;
    $scope.courses = caeaCourse.query();

    $scope.sortOptions = [{ value: "title", text: "Ordenar por titulo" },
        { value: "published", text: "Ordenar por fecha"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.enrollCourse = function (courseId) {
        if(caeaIdentity.currentUser.rol_id==3) {
            $http.get('/api/users/'+caeaIdentity.currentUser.id+'/students').then(function (student) {
                newStudentCourseData = {
                    ramo_id: courseId,
                    estudiante_id: student.data.id
                };
                $http.post('/api/student-courses', newStudentCourseData).then(function (student_course) {
                    caeaNotifier.success('Curso inscrito correctamente');
                }, function (err) {
                    if(err.data.reason=='Error: Duplicate') {
                        caeaNotifier.error('Ya tienes inscrito este curso');
                    }
                })
            });
        }
        if(caeaIdentity.currentUser.rol_id==2) {
            $http.get('/api/users/'+caeaIdentity.currentUser.id+'/teachers').then(function (teacher) {
                newTeacherCourseData = {
                    ramo_id: courseId,
                    profesor_id: teacher.data.id
                };
                $http.post('/api/teacher-courses', newTeacherCourseData).then(function (teacher_course) {
                    caeaNotifier.success('Curso inscrito correctamente');
                }, function (err) {
                    if(err.data.reason=='Error: Duplicate') {
                        caeaNotifier.error('Ya tienes inscrito este curso');
                    }
                })
            });
        }
    }
});