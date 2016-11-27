angular.module('app').controller('caeaCourseListCtrl', function ($scope, caeaCourse, $http, caeaNotifier, caeaIdentity) {
    $scope.identity = caeaIdentity;
    if(caeaIdentity.currentUser.rol_id==1) {
        $scope.courses = caeaCourse.query();
    }
    if(caeaIdentity.currentUser.rol_id==2) {
        var cursos = [];
        $http.get('/api/users/'+caeaIdentity.currentUser.id+'/teachers').then(function (teacher) {
            $http.get('/api/teachers/'+teacher.data.id+'/teacher-courses').then(function (teacher_courses) {
                for(teacher_course in teacher_courses.data) {
                    var curso = caeaCourse.get({id:teacher_courses.data[teacher_course].ramo_id});
                    cursos.push(curso);
                }
            })
        });
        $scope.courses = cursos;
    }
    if(caeaIdentity.currentUser.rol_id==3) {
        var cursos = [];
        $http.get('/api/users/'+caeaIdentity.currentUser.id+'/students').then(function (student) {
            $http.get('/api/students/'+student.data.id+'/student-courses').then(function (student_courses) {
                for(student_course in student_courses.data) {
                    var curso = caeaCourse.get({id:student_courses.data[student_course].ramo_id});
                    cursos.push(curso);
                }
            })
        });

        $scope.courses = cursos;
    }

    $scope.sortOptions = [{ value: "sigla", text: "Ordenar por sigla"},
        { value: "nombre", text: "Ordenar por nombre" }];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.deleteCourse = function (courseId) {
        UIkit.modal.confirm("Al eliminar el curso se borarán todos los tópicos y materiales asociados a este. ¿Estas seguro?", function(){
            var courseRemove = {};
            courseRemove.id = courseId;
            $http.delete('/api/courses/'+courseId).then(function (response) {
                if(response.data.success) {
                    $scope.courses = caeaCourse.query();
                    caeaNotifier.success('Curso eliminado correctamente');
                }
            });
        }, {labels: {'Ok': 'Eliminar', 'Cancel': 'Cancelar'}});
    }
});