var auth = require('../controllers/auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses'),
    topics = require('../controllers/topics'),
    materials = require('../controllers/materials'),
    preguntas = require('../controllers/preguntas'),
    alternativas = require('../controllers/alternativas'),
    students = require('../controllers/students'),
    teachers = require('../controllers/teachers'),
    validation_requests = require('../controllers/validation_requests'),
    student_courses = require('../controllers/student_courses'),
    teacher_courses = require('../controllers/teacher_courses'),
    material_comments = require('../controllers/material_comments'),
    multer = require('./multer');

module.exports = function (app) {

    app.get('/api/users', auth.requiresRole(1), users.getUsers);
    app.post('/api/users', users.createUser);
    app.get('/api/users/:id', users.getUser);
    app.put('/api/users/:id', auth.hasAuthorization, users.updateUser);
    app.delete('/api/users/:id', auth.requiresRole(1), users.deleteUser);

    app.get('/api/courses', auth.requireAuthentication, courses.getCourses);
    app.post('/api/courses', auth.requiresRole(1), courses.createCourse);
    app.get('/api/courses/:id', auth.requireAuthentication, courses.getCourse);
    app.put('/api/courses/:id', auth.requireAuthentication, courses.updateCourse);
    app.delete('/api/courses/:id', auth.requiresRole(1), courses.deleteCourse);

    app.get('/api/students/:studentId/student-courses', student_courses.getStudentCourseByStudentId);
    app.post('/api/student-courses', student_courses.createStudentCourse);

    app.get('/api/teachers/:teacherId/teacher-courses', teacher_courses.getStudentCourseByTeacherId);
    app.post('/api/teacher-courses', teacher_courses.createTeacherCourse);

    app.get('/api/topics', auth.requireAuthentication, topics.getTopics);
    app.post('/api/topics', auth.requireAuthentication, topics.createTopic);
    app.get('/api/topics/:id', auth.requireAuthentication, topics.getTopic);
    app.get('/api/courses/:courseId/topics', auth.requireAuthentication, topics.getTopicsByCourseId);
    app.put('/api/topics/:id', auth.requiresRole(1), topics.updateTopic);
    app.delete('/api/topics/:id', auth.requireAuthentication, topics.deleteTopic);

    app.get('/api/materials', auth.requireAuthentication, materials.getMaterials);
    app.post('/api/materials', auth.requireAuthentication, materials.createMaterial);
    app.get('/api/topics/:topicId/materials', auth.requireAuthentication, materials.getMaterialsByTopicId);
    app.get('/api/materials/:id', auth.requireAuthentication, materials.getMaterial);
    app.put('/api/materials/:id', auth.requireAuthentication, materials.updateMaterial);
    app.delete('/api/materials/:id', auth.requireAuthentication, materials.deleteMaterial);

    app.get('/api/materials/:materialId/comments', auth.requireAuthentication, material_comments.getMaterialCommentsByMaterialId);
    app.post('/api/material-comments', auth.requireAuthentication, material_comments.createMaterialComment);

    app.get('/api/preguntas', preguntas.getPreguntas);
    app.get('/api/alternativas', alternativas.getAlternativas);

    app.get('/api/students/:id', students.getStudent);
    app.post('/api/students', students.createStudent);
    app.get('/api/users/:userId/students', students.getStudentByUserId);

    app.get('/api/teachers', teachers.getTeachers);
    app.post('/api/teachers', teachers.createTeacher);
    app.get('/api/teachers/:id', teachers.getTeacher);
    app.get('/api/users/:userId/teachers', teachers.getTeacherByUserId);

    app.get('/api/validation-requests', validation_requests.getValidationRequests);
    app.post('/api/validation-requests', validation_requests.createValidationRequest);

    app.post('/login', auth.authenticate);

    app.post('/logout', auth.logout);
    
    app.all('/api/*', function (req, res) {
        res.send(404);
    });

    app.post('/upload', function(req, res) {
        multer.upload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json({error_code:0,err_desc:null, filename: req.file.filename});
        })
    });

    app.get('/files/*', auth.requireAuthentication);

    app.get('/pdf/:fileName', function(req, res) {
        res.render('pdf', { layout: 'layout-pdf', fileName: req.params.fileName });
    });

    app.get('*', function(req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}