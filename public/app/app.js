angular.module('app', ['ngResource', 'ngRoute', 'countTo', 'ngFileUpload', 'angularUtils.directives.dirPagination']);

angular.module('app').config(function ($routeProvider, $locationProvider, paginationTemplateProvider) {
    paginationTemplateProvider.setPath('/views/common/includes/dirPagination.html');
    var auth = {
        isAdmin: {auth: function (caeaAuth, $q) {
            if(caeaAuth.authorizeCurrentUserForRoute(1)) {
                return true
            } else {
                return $q.reject('not authorized');
            }
        }},
        isAdminOrStudentOrValidatedTeacher: {auth: function (caeaAuth, $q) {
            if(caeaAuth.authorizeCurrentUserForRoute(1) || caeaAuth.authorizeCurrentUserForRoute(3) || caeaAuth.authorizeCurrentUserForRoute(2)){
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }},
        isUser: {auth: function (caeaAuth, $q) {
            if(caeaAuth.authorizeCurrentUserForRoute(3)) {
                return true
            } else {
                return $q.reject('not authorized');
            }
        }},
        isAuthenticated: {auth: function (caeaAuth, $q) {
            if(caeaAuth.authorizeForRoute()) {
                return true
            } else {
                return $q.reject('not authorized');
            }
        }},
        isNotAuthenticated: {auth: function (caeaAuth, $q) {
            if(caeaAuth.authorizeForNotLoggedUser()) {
                return true
            } else {
                return $q.reject('is logged');
            }
        }}
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'views/cursos/course-list.html',
            controller: 'caeaCourseListCtrl',
            roles: ['admin', 'student', 'validated_teacher']
        })
        .when('/course/inscribir', {
            templateUrl: 'views/cursos/course-enroll.html',
            controller: 'caeaCourseEnrollCtrl',
            roles: ['admin', 'validated_teacher', 'student']
        })
        .when('/course/:courseId', {
            templateUrl: 'views/cursos/course-profile.html',
            controller: 'caeaCourseProfileCtrl',
            roles: ['admin', 'student', 'validated_teacher']
        })
        .when('/course/:courseId/topic/:topicId', {
            templateUrl: 'views/topics/topic-profile.html',
            controller: 'caeaTopicProfileCtrl',
            roles: ['admin', 'student', 'validated_teacher']
        })
        .when('/admin', {
            templateUrl: 'views/admin/main.html',
            controller: 'caeaAdminMainCtrl',
            roles: ['admin'],
            parent: 'admin'
        })
        .when('/admin/users', {
            templateUrl: 'views/admin/user-list.html',
            controller: 'caeaUserListCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/users'
        })
        .when('/admin/user/crear', {
            templateUrl: 'views/admin/user-create.html',
            controller: 'caeaAdminUserCreateCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/users'
        })
        .when('/admin/user/:userId', {
            templateUrl: 'views/admin/user-profile.html',
            controller: 'caeaUserProfileCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/users'
        })
        .when('/admin/user/:userId/editar', {
            templateUrl: 'views/admin/user-edit.html',
            controller: 'caeaUserEditCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/users'
        })
        .when('/admin/courses', {
            templateUrl: 'views/admin/course-list.html',
            controller: 'caeaCourseListCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/course/crear', {
            templateUrl: 'views/admin/course-create.html',
            controller: 'caeaAdminCourseCreateCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/course/:courseId', {
            templateUrl: 'views/admin/course-profile.html',
            controller: 'caeaCourseProfileCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/course/:courseId/editar', {
            templateUrl: 'views/admin/course-edit.html',
            controller: 'caeaAdminCourseEditCtrl',
            roles: ['admin', 'validated_teacher'],
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/course/:courseId/topic/crear', {
            templateUrl: 'views/admin/topic-create.html',
            controller: 'caeaAdminTopicCreateCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/topic/:topicId', {
            templateUrl: 'views/admin/topic-profile.html',
            controller: 'caeaAdminTopicProfileCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/topic/:topicId/editar', {
            templateUrl: 'views/admin/topic-edit.html',
            controller: 'caeaAdminTopicEditCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/topic/:topicId/materials/learning/:learningId/ordenar', {
            templateUrl: 'views/admin/material-order.html',
            controller: 'caeaAdminMaterialOrderCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/material/:materialId/editar', {
            templateUrl: 'views/admin/material-edit.html',
            controller: 'caeaAdminMaterialEditCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/topic/:topicId/materials/crear', {
            templateUrl: 'views/admin/material-upload.html',
            controller: 'caeaAdminMaterialUploadCtrl',
            roles: ['admin'],
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/forum', {
            templateUrl: 'views/forum/forum-home.html',
            controller: 'caeaForumHomeCtrl',
            roles: ['admin', 'validated_teacher', 'not_validated_teacher']
        })
        .when('/login', {
            templateUrl: 'views/account/login.html',
            controller: 'caeaLoginCtrl'
        })
        .when('/signup', {
            templateUrl: 'views/account/signup.html',
            controller: 'caeaSignupCtrl'
        })
        .when('/profile', {
            templateUrl: 'views/account/profile.html',
            controller: 'caeaProfileCtrl',
            roles: ['admin', 'student', 'validated_teacher', 'not_validated_teacher']
        })
        .when('/404', {
            templateUrl: 'views/404.html'
        })
        .otherwise({
            redirectTo: '/404'
        });
});

angular.module('app').run(['$rootScope', '$location', 'caeaIdentity', '$http', '$route', function ($rootScope, $location, caeaIdentity, $http, $route) {
    function getPath(route) {
        if (!!route && typeof(route.originalPath) === "string")
            return "'" + route.originalPath + "'";
        return "[unknown route, using otherwise]";
    }
    $rootScope.$on('$routeChangeStart', function (event, to, from) {
        console.log("Route change start from", getPath(from), "to", getPath(to));
        if(!!to.roles) {
            if(caeaIdentity.isAuthenticated()) {
                var role = '';
                if(caeaIdentity.currentUser.rol_id == 1 || caeaIdentity.currentUser.rol_id == 3 ) {
                    if(caeaIdentity.currentUser.rol_id == 3) {
                        role = 'student';
                    } else {
                        role = 'admin';
                    }
                    console.log(role);
                    if(!to.roles.includes(role)) {
                        location.replace('/login');
                    }

                } else {
                    $http.get('/api/users/'+caeaIdentity.currentUser.id+'/teachers').then(function (teacher) {
                        if(teacher.data.validado) {
                            role = 'validated_teacher';
                        } else{
                            role = 'not_validated_teacher';
                        }
                        console.log(role);
                        if(!to.roles.includes(role)) {
                            console.log(role);
                            if(role=='not_validated_teacher') {
                                location.replace('/forum');
                            } else {
                                location.replace('/login');
                            }
                        }
                    })
                }
            } else {
                $location.path('/login');
            }
            console.log('ruta protegida');
        } else {
            if($location.path() != '/404') {
                if(caeaIdentity.isAuthenticated()) {
                    $location.path('/');
                }
            }
        }
        /*if(!!caeaIdentity.currentUser) {
            if(caeaIdentity.currentUser.rol_id==2){
                $http.get('/api/users/'+caeaIdentity.currentUser.id+'/teachers').then(function (teacher) {
                    if(teacher.data.validado) {
                        console.log('profesor validado');
                    } else{
                        console.log('profesor no validado');
                    }
                })
            }
        }*/
    });
    $rootScope.$on('$routeChangeError', function (evt, current, previuos, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/login');
        }
        if(rejection === 'is logged') {
            $location.path('/');
        }
    })
}]);