var path = require('path');

var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
    development: {
        rootPath: rootPath,
        db: {
            host: '',
            name: '',
            user: '',
            password: '',
            dialect: 'mysql'
        },
        port: process.env.PORT || 3030,
        modelsDir: rootPath + '/server/models'
    },
    production: {
        rootPath: rootPath,
        db: {
            host: '',
            name: '',
            user: '',
            password: '',
            dialect: ''
        },
        port: process.env.PORT || 80,
        modelsDir: rootPath + '/server/models'
    }
}