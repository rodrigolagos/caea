var Sequelize = require('sequelize'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    db = {};
    encrypt = require('../utilities/encryption');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(config.modelsDir)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    // import model files and save model names
    .forEach(function (file) {
        var model = sequelize.import(path.join(config.modelsDir, file));
        db[model.name] = model;
    });

// invoke associations on each of the models
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
});

sequelize
    .sync({ force: false })
    .then(function() {
        db.Course.findAll().then(function(courses) {
            if(courses.length === 0){
                db.Course.create({nombre: 'Introducción a la Física', sigla: 'FIS100'});
                db.Course.create({nombre: 'Física General I', sigla: 'FIS110'});
                db.Course.create({nombre: 'Física General II', sigla: 'FIS120'});
                db.Course.create({nombre: 'Matemática I', sigla: 'MAT021'});
                db.Course.create({nombre: 'Matemática II', sigla: 'MAT022'});
                db.Course.create({nombre: 'Matemática III', sigla: 'MAT023'});
                db.Course.create({nombre: 'Matemática IV', sigla: 'MAT024'});
            }
        })
        db.Topic.findAll().then(function(topics) {
             if(topics.length === 0){
                 db.Topic.create({titulo: 'Campo Eléctrico', ramo_id: 1});
                 db.Topic.create({titulo: 'Campo Magnético', ramo_id: 1});
                 db.Topic.create({titulo: 'Corriente', ramo_id: 1});
                 db.Topic.create({titulo: 'Potencial Eléctrico', ramo_id: 1});
                 db.Topic.create({titulo: 'Densidad de Corriente', ramo_id: 1});
             }
         })
        /*db.Material.findAll().then(function(materials) {
             if(materials.length === 0){
                 db.Material.create({title: 'Material 1', topic_id: 1, type: 'pdf'});
                 db.Material.create({title: 'Material 2', topic_id: 1, type: 'image'});
                 db.Material.create({title: 'Material 3', topic_id: 1, type: 'video'});
                 db.Material.create({title: 'Material 4', topic_id: 1, type: 'image'});
                 db.Material.create({title: 'Material 5', topic_id: 1, type: 'pdf'});
             }
         })*/
        db.Pregunta.findAll().then(function(preguntas) {
         if(preguntas.length === 0){
             db.Pregunta.create({pregunta: 'Cuando aprendo...'});
             db.Pregunta.create({pregunta: 'Aprendo mejor cuando...'});
             db.Pregunta.create({pregunta: 'Cuando estoy aprendiendo...'});
             db.Pregunta.create({pregunta: 'Yo aprendo...'});
             db.Pregunta.create({pregunta: 'Cuando aprendo...'});
             db.Pregunta.create({pregunta: 'Cuando estoy aprendiendo...'});
             db.Pregunta.create({pregunta: 'Yo aprendo mejor de...'});
             db.Pregunta.create({pregunta: 'Cuando aprendo...'});
             db.Pregunta.create({pregunta: 'Aprendo mejor cuando...'});
             db.Pregunta.create({pregunta: 'Cuando estoy aprendiendo...'});
             db.Pregunta.create({pregunta: 'Cuando aprendo...'});
             db.Pregunta.create({pregunta: 'Aprendo mejor cuando...'});
         }
         });
        db.Modalidad.findAll().then(function(modalidades) {
         if(modalidades.length === 0){
             db.Modalidad.create({nombre: 'EC'});
             db.Modalidad.create({nombre: 'OR'});
             db.Modalidad.create({nombre: 'CA'});
             db.Modalidad.create({nombre: 'EA'});
         }
        });
        db.Alternativa.findAll().then(function(alternativas) {
            if(alternativas.length === 0){
                db.Alternativa.create({alternativa: 'me gusta vivir sensaciones', pregunta_id: 1, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'me gusta pensar sobre ideas', pregunta_id: 1, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'me gusta estar haciendo cosas', pregunta_id: 1, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'me gusta observar y escuchar', pregunta_id: 1, modalidad_id: 4});
                db.Alternativa.create({alternativa: 'escucho y observo cuidadosamente', pregunta_id: 2, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'confío en el pensamiento lógico', pregunta_id: 2, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'confío en mi intuición y sentimientos', pregunta_id: 2, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'trabajo duro para lograr hacer las cosas', pregunta_id: 2, modalidad_id: 4});
                db.Alternativa.create({alternativa: 'tiendo a usar el razonamiento', pregunta_id: 3, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'soy responsable con lo que hago', pregunta_id: 3, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'soy callado y reservado', pregunta_id: 3, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'tengo fuertes sensaciones y reacciones', pregunta_id: 3, modalidad_id: 4});
                db.Alternativa.create({alternativa: 'sintiendo', pregunta_id: 4, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'haciendo', pregunta_id: 4, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'observando', pregunta_id: 4, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'pensando', pregunta_id: 4, modalidad_id: 4});
                db.Alternativa.create({alternativa: 'estoy abierto a nuevas experiencias', pregunta_id: 5, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'observo todos los aspectos del asunto', pregunta_id: 5, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'me gusta analizar las cosas, descomponerlas en sus partes', pregunta_id: 5, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'me gusta probar e intentar hacer las cosas', pregunta_id: 5, modalidad_id: 4});
                db.Alternativa.create({alternativa: 'soy una persona observadora', pregunta_id: 6, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'soy una persona activa', pregunta_id: 6, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'soy una persona intuitiva', pregunta_id: 6, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'soy una persona lógica', pregunta_id: 6, modalidad_id: 4});
                db.Alternativa.create({alternativa: 'la observación', pregunta_id: 7, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'la relación con otras personas', pregunta_id: 7, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'las teorías racionales', pregunta_id: 7, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'la oportunidad de probar y practicar', pregunta_id: 7, modalidad_id: 4});
                db.Alternativa.create({alternativa: 'me gusta ver los resultados de mi trabajo', pregunta_id: 8, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'me gustan las ideas y las teorías', pregunta_id: 8, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'me tomo mi tiempo antes de actuar', pregunta_id: 8, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'me siento personalmente involucrado en las cosas', pregunta_id: 8, modalidad_id: 4});
                db.Alternativa.create({alternativa: 'confío en mis observaciones', pregunta_id: 9, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'confío en mis sentimientos', pregunta_id: 9, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'puedo probar por mi cuenta', pregunta_id: 9, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'confío en mis ideas', pregunta_id: 9, modalidad_id: 4});
                db.Alternativa.create({alternativa: 'soy una persona reservada', pregunta_id: 10, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'soy una persona receptiva', pregunta_id: 10, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'soy una persona responsable', pregunta_id: 10, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'soy una persona racional', pregunta_id: 10, modalidad_id: 4});
                db.Alternativa.create({alternativa: 'me involucro', pregunta_id: 11, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'me gusta observar', pregunta_id: 11, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'evalúo las cosas', pregunta_id: 11, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'me gusta ser activo', pregunta_id: 11, modalidad_id: 4});
                db.Alternativa.create({alternativa: 'analizo ideas', pregunta_id: 12, modalidad_id: 1});
                db.Alternativa.create({alternativa: 'soy receptivo y abierto', pregunta_id: 12, modalidad_id: 2});
                db.Alternativa.create({alternativa: 'soy cuidadoso', pregunta_id: 12, modalidad_id: 3});
                db.Alternativa.create({alternativa: 'soy práctico', pregunta_id: 12, modalidad_id: 4});
            }
        });
        db.Student_Type.findAll().then(function(student_types) {
             if(student_types.length === 0){
                 db.Student_Type.create({id: 1, tipo_aprendizaje: 'Divergente'});
                 db.Student_Type.create({id: 2, tipo_aprendizaje: 'Asimilador'});
                 db.Student_Type.create({id: 3, tipo_aprendizaje: 'Adaptador'});
                 db.Student_Type.create({id: 4, tipo_aprendizaje: 'Convergente'});
             }
         });
        db.User_Role.findAll().then(function(user_roles) {
            if(user_roles.length === 0){
                db.User_Role.create({id: 1, rol: 'Coordinador'});
                db.User_Role.create({id: 2, rol: 'Profesor'});
                db.User_Role.create({id: 3, rol: 'Estudiante'});
            }
        });
        db.Request_Status.findAll().then(function(request_statuses) {
            if(request_statuses.length === 0){
                db.Request_Status.create({id: 1, estado: 'Validada'});
                db.Request_Status.create({id: 2, estado: 'No Validada'});
            }
        });
        db.User.findAll().then(function(users) {
            if(users.length === 0){
                var password = '123456';
                var salt = encrypt.createSalt();
                var hashed_pwd = encrypt.hashPwd(salt, password);
                db.User.create({firstName: 'Rodrigo', lastName: 'Lagos', username: 'admin', email: 'admin@admin.com', salt: salt, hashed_pwd: hashed_pwd, rol_id: 1});
            }
        });

        console.log("Base de datos sincronizada correctamente");
    })
    .catch(function (err) {
        console.log('Error al conectarse a la Base de datos:', err);
    });

module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);

/*User.findAll().then(function(users) {
    if(users.length === 0){
        User.create({firstName: 'Joe', lastName: 'Eames', userName: 'joe'});
        User.create({firstName: 'John', lastName: 'Papa', userName: 'john'});
        User.create({firstName: 'Dan', lastName: 'Wahlin', userName: 'dan'});
    }
})*/