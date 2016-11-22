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
            controller: 'caeaCourseListCtrl', resolve: auth.isAdminOrStudentOrValidatedTeacher
        })
        .when('/course/:courseId', {
            templateUrl: 'views/cursos/course-profile.html',
            controller: 'caeaCourseProfileCtrl', resolve: auth.isAuthenticated
        })
        .when('/course/:courseId/topic/:topicId', {
            templateUrl: 'views/topics/topic-profile.html',
            controller: 'caeaTopicProfileCtrl', resolve: auth.isAuthenticated
        })
        .when('/admin', {
            templateUrl: 'views/admin/main.html',
            controller: 'caeaAdminMainCtrl', resolve: auth.isAdmin,
            parent: 'admin'
        })
        .when('/admin/users', {
            templateUrl: 'views/admin/user-list.html',
            controller: 'caeaUserListCtrl', resolve: auth.isAdmin,
            parent: 'admin', subparent: 'admin/users'
        })
        .when('/admin/user/crear', {
            templateUrl: 'views/admin/user-create.html',
            controller: 'caeaAdminUserCreateCtrl', resolve: auth.isAdmin,
            parent: 'admin', subparent: 'admin/users'
        })
        .when('/admin/user/:userId', {
            templateUrl: 'views/admin/user-profile.html',
            controller: 'caeaUserProfileCtrl', resolve: auth.isAdmin,
            parent: 'admin', subparent: 'admin/users'
        })
        .when('/admin/user/:userId/editar', {
            templateUrl: 'views/admin/user-edit.html',
            controller: 'caeaUserEditCtrl', resolve: auth.isAdmin,
            parent: 'admin', subparent: 'admin/users'
        })
        .when('/admin/courses', {
            templateUrl: 'views/admin/course-list.html',
            controller: 'caeaCourseListCtrl', resolve: auth.isAdmin,
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/course/:courseId', {
            templateUrl: 'views/admin/course-profile.html',
            controller: 'caeaCourseProfileCtrl', resolve: auth.isAdmin,
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/topic/:topicId', {
            templateUrl: 'views/admin/topic-profile.html',
            controller: 'caeaAdminTopicProfileCtrl', resolve: auth.isAdmin,
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/topic/:topicId/materials/learning/:learningId/ordenar', {
            templateUrl: 'views/admin/material-order.html',
            controller: 'caeaAdminMaterialOrderCtrl', resolve: auth.isAdmin,
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/admin/topic/:topicId/materials/crear', {
            templateUrl: 'views/admin/material-upload.html',
            controller: 'caeaAdminMaterialUploadCtrl', resolve: auth.isAdmin,
            parent: 'admin', subparent: 'admin/courses'
        })
        .when('/login', {
            templateUrl: 'views/account/login.html',
            controller: 'caeaLoginCtrl', resolve: auth.isNotAuthenticated
        })
        .when('/signup', {
            templateUrl: 'views/account/signup.html',
            controller: 'caeaSignupCtrl', resolve: auth.isNotAuthenticated
        })
        .when('/profile', {
            templateUrl: 'views/account/profile.html',
            controller: 'caeaProfileCtrl', resolve: auth.isAuthenticated
        })
        .when('/404', {
            templateUrl: 'views/404.html'
        })
        .otherwise({
            redirectTo: '/404'
        });
});

angular.module('app').run(function ($rootScope, $location, caeaIdentity, $http) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
        if(!!caeaIdentity.currentUser) {
            if(caeaIdentity.currentUser.rol_id==2){
                $http.get('/api/users/'+caeaIdentity.currentUser.id+'/teachers').then(function (teacher) {
                    if(teacher.data.validado) {
                        console.log('profesor validado');
                    } else{
                        console.log('profesor no validado');
                    }
                })
            }
        }
    });
    $rootScope.$on('$routeChangeError', function (evt, current, previuos, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/login');
        }
        if(rejection === 'is logged') {
            $location.path('/');
        }
    })
});