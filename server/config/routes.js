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
    multer = require('./multer');

module.exports = function (app) {

    app.get('/api/users', auth.requiresRole(1), users.getUsers);
    app.post('/api/users', users.createUser);
    app.get('/api/users/:id', auth.requiresRole(1), users.getUser);
    app.put('/api/users/:id', auth.hasAuthorization, users.updateUser);

    app.get('/api/courses', auth.requireAuthentication, courses.getCourses);
    app.get('/api/courses/:id', auth.requireAuthentication, courses.getCourse);

    app.get('/api/topics', auth.requireAuthentication, topics.getTopics);
    app.get('/api/topics/:id', auth.requireAuthentication, topics.getTopic);
    app.get('/api/courses/:courseId/topics', auth.requireAuthentication, topics.getTopicsByCourseId);

    app.get('/api/materials', auth.requireAuthentication, materials.getMaterials);
    app.post('/api/materials', auth.requiresRole(1), materials.createMaterial);
    app.get('/api/courses/:courseId/topics/:topicId/materials', auth.requireAuthentication, materials.getMaterialsByTopicId);
    app.get('/api/materials/:id', auth.requireAuthentication, materials.getMaterial);

    app.get('/api/preguntas', preguntas.getPreguntas);
    app.get('/api/alternativas', alternativas.getAlternativas);

    app.post('/api/students', students.createStudent);

    app.post('/api/teachers', teachers.createTeacher);

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