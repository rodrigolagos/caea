var Sequelize = require('sequelize'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    db = {};

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
        /*db.Course.findAll().then(function(courses) {
            if(courses.length === 0){
                db.Course.create({title: 'C# for Sociopaths', featured: true, published: new Date('10/5/2013')});
                db.Course.create({title: 'C# for Non-Sociopaths', featured: true, published: new Date('10/12/2013')});
                db.Course.create({title: 'Super Duper Expert C#', featured: false, published: new Date('10/1/2013')});
                db.Course.create({title: 'Visual Basic for Visual Basic Developers', featured: false, published: new Date('7/12/2013')});
                db.Course.create({title: 'Pedantic C++', featured: true, published: new Date('1/1/2013')});
                db.Course.create({title: 'JavaScript for People over 20', featured: true, published: new Date('10/13/2013')});
                db.Course.create({title: 'Maintainable Code for Cowards', featured: true, published: new Date('3/1/2013')});
                db.Course.create({title: 'A Survival Guide to Code Reviews', featured: true, published: new Date('2/1/2013')});
                db.Course.create({title: 'How to Job Hunt Without Alerting your Boss', featured: true, published: new Date('10/7/2013')});
                db.Course.create({title: 'How to Keep your Soul and go into Management', featured: false, published: new Date('8/1/2013')});
                db.Course.create({title: 'Telling Recruiters to Leave You Alone', featured: false, published: new Date('11/1/2013')});
                db.Course.create({title: "Writing Code that Doesn't Suck", featured: true, published: new Date('10/13/2013')});
                db.Course.create({title: 'Code Reviews for Jerks', featured: false, published: new Date('10/1/2013')});
                db.Course.create({title: 'How to Deal with Narcissistic Coworkers', featured: true, published: new Date('2/15/2013')});
                db.Course.create({title: 'Death March Coding for Fun and Profit', featured: true, published: new Date('7/1/2013')});
            }
        })*/
        /*db.Topic.findAll().then(function(topics) {
             if(topics.length === 0){
                 db.Topic.create({title: 'Campo Eléctrico', course_id: 1});
                 db.Topic.create({title: 'Campo Magnético', course_id: 1});
                 db.Topic.create({title: 'Corriente', course_id: 1});
                 db.Topic.create({title: 'Potencial Eléctrico', course_id: 1});
                 db.Topic.create({title: 'Densidad de Corriente', course_id: 1});
             }
         })*/
        /*db.Material.findAll().then(function(materials) {
             if(materials.length === 0){
                 db.Material.create({title: 'Material 1', topic_id: 1, type: 'pdf'});
                 db.Material.create({title: 'Material 2', topic_id: 1, type: 'image'});
                 db.Material.create({title: 'Material 3', topic_id: 1, type: 'video'});
                 db.Material.create({title: 'Material 4', topic_id: 1, type: 'image'});
                 db.Material.create({title: 'Material 5', topic_id: 1, type: 'pdf'});
             }
         })*/
        /*db.Pregunta.findAll().then(function(preguntas) {
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
         });*/
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